import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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

// --- Partner Detail Panel ---
function PartnerDetailPanel({
  partner,
  detail,
  onClose,
}: {
  partner: PartnerInfo;
  detail: PartnerDetail;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute z-30 left-1/2 top-[10%] w-[90%] max-w-md"
      style={{ transform: "translateX(-50%)" }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.96)",
          border: "1px solid hsl(var(--border))",
          boxShadow:
            "0 24px 80px -12px hsl(var(--primary) / 0.18), 0 4px 24px rgba(0,0,0,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 p-4 border-b"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center p-2 flex-shrink-0"
            style={{
              background: "hsl(var(--muted))",
            }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-foreground">{partner.name}</h4>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background: "hsl(var(--primary) / 0.1)",
                color: "hsl(var(--primary))",
              }}
            >
              {detail.category}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <p className="text-xs font-semibold text-foreground leading-snug">
            {detail.headline}
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {detail.description}
          </p>

          {/* Features */}
          <div className="space-y-1.5">
            {detail.features.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "hsl(160 84% 39% / 0.12)",
                    color: "hsl(160 84% 39%)",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[11px] text-foreground/80">{f}</span>
              </div>
            ))}
          </div>

          {/* Badge */}
          {detail.badge && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.08))",
                color: "hsl(var(--primary))",
              }}
            >
              ✦ {detail.badge}
            </div>
          )}
        </div>
      </div>
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

        {/* Arc Active Content (Fades in) */}
        <motion.div
          className="absolute inset-x-0 top-[6%] z-20 flex flex-col items-center text-center pointer-events-none px-4"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <h3 className="text-2xl md:text-4xl font-bold text-foreground">
            Güçlü Partner Ekosistemi
          </h3>
          <p className="mt-3 max-w-lg text-muted-foreground text-sm md:text-base leading-relaxed">
            İşletmenizin ihtiyacına uygun çözüm ortaklarını keşfedin.
            Logolara tıklayarak detaylı bilgi alın.
          </p>
        </motion.div>

        {/* Partner Detail Panel */}
        <AnimatePresence>
          {selected && selectedDetail && (
            <PartnerDetailPanel
              partner={selected}
              detail={selectedDetail}
              onClose={() => setSelectedPartner(null)}
            />
          )}
        </AnimatePresence>

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
                onClick={() =>
                  setSelectedPartner((prev) =>
                    prev === partner.id ? null : partner.id
                  )
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
