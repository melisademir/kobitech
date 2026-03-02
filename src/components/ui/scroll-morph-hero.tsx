import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";


// Logo imports
import logoAras from "@/assets/logo-aras.png";
import logoGoogle from "@/assets/logo-google.png";
import logoIkas from "@/assets/logo-ikas.png";
import logoKariyer from "@/assets/logo-kariyer.png";
import logoKobitech from "@/assets/logo-kobitech.png";
import logoMukellef from "@/assets/logo-mukellef.png";
import logoParam from "@/assets/logo-param.png";
import logoParamtech from "@/assets/logo-paramtech.png";
import logoTicimax from "@/assets/logo-ticimax.png";
import logoTsoft from "@/assets/logo-tsoft.png";
import logoWorkcube from "@/assets/logo-workcube.png";
import logoFinrota from "@/assets/logo-finrota-new.svg";
import logoKredim from "@/assets/logo-kredim.svg";
import logoNebim from "@/assets/logo-nebim.svg";
import logoUnivera from "@/assets/logo-univera.svg";

// Partner data
import { partnerDetails, type PartnerDetail } from "@/components/landing/partner-ecosystem/partner-data";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface PartnerInfo {
  id: string;
  name: string;
  logo: string;
}

interface FlipCardProps {
  partner: PartnerInfo;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  isSelected: boolean;
  onClick: () => void;
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ partner, index, total, phase, target, isSelected, onClick }: FlipCardProps) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        left: "50%",
        top: "50%",
        marginLeft: -IMG_WIDTH / 2,
        marginTop: -IMG_HEIGHT / 2,
        perspective: 800,
        zIndex: isSelected ? 100 : total - index,
      }}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: isSelected ? target.scale * 1.3 : target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 18,
        mass: 1,
      }}
      onClick={onClick}
      whileHover={{ scale: target.scale * 1.15 }}
      whileTap={{ scale: target.scale * 0.95 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            background: "white",
            border: isSelected
              ? "2px solid hsl(var(--primary))"
              : "1px solid hsl(var(--border))",
            padding: "10px",
            boxShadow: isSelected
              ? "0 0 20px hsl(var(--primary) / 0.3)"
              : "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <img
            src={partner.logo}
            alt={partner.name}
            className="w-full h-full object-contain"
            style={{ mixBlendMode: "multiply" }}
            loading="lazy"
          />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-lg flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "hsl(var(--primary))",
          }}
        >
          <div className="text-center px-1">
            <p className="text-[8px] font-semibold text-primary-foreground">{partner.name}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


// --- Partners Config ---
const PARTNERS: PartnerInfo[] = [
  { id: "paramtech", name: "ParamTech", logo: logoParamtech },
  { id: "param", name: "Param", logo: logoParam },
  { id: "aras", name: "Aras", logo: logoAras },
  { id: "google", name: "Google", logo: logoGoogle },
  { id: "ikas", name: "ikas", logo: logoIkas },
  { id: "kredim", name: "Kredim", logo: logoKredim },
  { id: "mukellef", name: "Mükellef", logo: logoMukellef },
  { id: "ticimax", name: "Ticimax", logo: logoTicimax },
  { id: "tsoft", name: "T-SOFT", logo: logoTsoft },
  { id: "workcube", name: "Workcube", logo: logoWorkcube },
  { id: "finrota", name: "Finrota", logo: logoFinrota },
  { id: "nebim", name: "Nebim", logo: logoNebim },
  { id: "univera", name: "Univera", logo: logoUnivera },
  { id: "kobitech", name: "Kobitech", logo: logoKobitech },
  { id: "kariyer", name: "Kariyer", logo: logoKariyer },
];

const TOTAL_IMAGES = PARTNERS.length;
const MAX_SCROLL = 3000;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Container Size ---
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => observer.disconnect();
  }, []);

  // --- Virtual Scroll Logic ---
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // --- Mouse Parallax ---
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // --- Intro Sequence ---
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // --- Random Scatter Positions ---
  const scatterPositions = useMemo(() => {
    return PARTNERS.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  // --- Render Loop ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  const selected = selectedPartner
    ? PARTNERS.find((p) => p.id === selectedPartner)
    : null;
  const selectedDetail = selectedPartner ? partnerDetails[selectedPartner] : null;

  return (
    <section className="relative w-full" style={{ height: "100vh" }}>
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ background: "hsl(var(--background))" }}
      >
        {/* Intro Text (Fades out) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
          animate={{
            opacity: introPhase === "circle" ? 0 : 1,
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-foreground text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Güçlü Partner Ekosistemi
          </motion.h2>
          <motion.p
            className="mt-4 text-sm text-muted-foreground tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            KAYDIRARAK KEŞFEDİN
          </motion.p>
        </motion.div>

        {/* Arc Active Content (Fades in) — title + inline detail */}
        <motion.div
          className="absolute inset-x-0 top-[6%] z-20 flex flex-col items-center text-center px-4"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <h3 className="text-2xl md:text-4xl font-bold text-foreground">
            Güçlü Partner Ekosistemi
          </h3>
          <p className="mt-3 max-w-lg text-muted-foreground text-sm md:text-base leading-relaxed">
            İşletmenizin ihtiyacına uygun çözüm ortaklarını keşfedin.
            Logolara tıklayarak detaylı bilgi alın.
          </p>

          {/* Inline Partner Detail */}
          <div className="mt-5 min-h-[120px]">
            <AnimatePresence mode="wait">
              {selected && selectedDetail ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="flex flex-col items-center text-center max-w-md mx-auto"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center p-1.5"
                      style={{ background: "hsl(var(--muted))" }}
                    >
                      <img
                        src={selected.logo}
                        alt={selected.name}
                        className="w-full h-full object-contain"
                        style={{ mixBlendMode: "multiply" }}
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-foreground leading-tight">{selected.name}</h4>
                      <span className="text-[10px] text-muted-foreground">{selectedDetail.category}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {selectedDetail.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedDetail.features.slice(0, 4).map((f, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-3 py-1 rounded-full text-foreground/70"
                        style={{
                          background: "hsl(var(--muted))",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-muted-foreground/60 italic"
                >
                  Bir partner seçin
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Cards Container */}
        <div className="absolute inset-0 z-10">
          {PARTNERS.map((partner, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 70;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              const circleRadius = Math.min(minDimension * 0.35, 350);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={partner.id}
                partner={partner}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
                isSelected={selectedPartner === partner.id}
                onClick={() => setSelectedPartner(partner.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
