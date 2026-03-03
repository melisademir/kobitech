import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import {
  CreditCard, ShoppingCart, Wallet, Package, Truck, Users, MapPin,
  ClipboardCheck, BadgePercent, Globe2, type LucideIcon,
} from "lucide-react";

import tabOdeme from "@/assets/tab-odeme-corp.png";
import tabEticaret from "@/assets/tab-eticaret-corp.png";
import tabPara from "@/assets/tab-para-corp.png";
import tabStok from "@/assets/tab-stok-corp.png";
import tabKargo from "@/assets/tab-kargo-ai.png";
import tabEkip from "@/assets/tab-ekip-corp.png";
import tabSaha from "@/assets/tab-saha-ai.png";
import tabAkis from "@/assets/tab-uretim-corp.png";
import tabTesvik from "@/assets/tab-tesvik-corp.png";
import tabGlobal from "@/assets/tab-global-corp.png";

const CARD_IMAGES: Record<string, string> = {
  odeme: tabOdeme,
  eticaret: tabEticaret,
  para: tabPara,
  stok: tabStok,
  kargo: tabKargo,
  ekip: tabEkip,
  saha: tabSaha,
  akis: tabAkis,
  tesvik: tabTesvik,
  global: tabGlobal,
};

// --- Types ---
type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface CategoryInfo {
  id: string;
  label: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  accent: string;
}

interface FlipCardProps {
  category: CategoryInfo;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  isSelected: boolean;
  onClick: () => void;
}

const IMG_WIDTH = 90;
const IMG_HEIGHT = 106;

const CATEGORIES: CategoryInfo[] = [
  { id: "odeme", label: "Ödeme Al", description: "Türkiye'nin lider finansal teknoloji ekosistemi Param ile tanışın; ticaretinize güç katın. İster mağazanızda ister dijital kanallarda; Param Fiziki POS, Param Sanal POS ve Param Cep POS çözümlerimizle tüm tahsilat süreçlerinizi tek platformda birleştirin.", tags: ["Param Fiziki POS", "Param Sanal POS", "Param Cep POS"], icon: CreditCard, accent: "#059669" },
  { id: "eticaret", label: "E-Ticarete Açıl", description: "Online satışın gücüyle dükkanınızın sınırlarını aşın ve satışlarınızı artırın. Türkiye'nin önde gelen e-ticaret altyapı sağlayıcıları T-Soft, Ticimax ve İkas'ın sunduğu en uygun paketleri keşfedin.", tags: ["Ticimax", "İkas", "T-Soft"], icon: ShoppingCart, accent: "#2563EB" },
  { id: "para", label: "Paranı Yönet", description: "Finrota'nın sunduğu Netahsilat, Netekstre, Nap360 ve Posrapor çözümleriyle nakit akışınızı düzenleyin, tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına ulaşın.", tags: ["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"], icon: Wallet, accent: "#D97706" },
  { id: "stok", label: "Stoğunu Kontrol Et", description: "Univera Stokbar ve Nebim V3 çözümleriyle depo yönetiminizi modernleştirin, ürün giriş çıkışlarını anlık verilerle izleyin. Akıllı stok planlama yöntemleriyle depo seviyelerinizi en ideal noktada tutun.", tags: ["Univera Stokbar", "Nebim V3"], icon: Package, accent: "#0891B2" },
  { id: "kargo", label: "Ürünlerini Gönder", description: "Aras Kargo'nun geniş lojistik ağıyla ürünlerinizi Türkiye'nin her yerine hızlıca ulaştırın. E-ticaret entegrasyonu ile siparişlerinizi anında kargoya hazırlayın.", tags: ["Aras Kargo"], icon: Truck, accent: "#10B981" },
  { id: "ekip", label: "Ekibine Yön Ver", description: "Çalışanlarınızın işe başladığı günden emekli olacağı güne kadar tüm süreçlerini tek bir çatı altında toplayın. Workcube HR ile güvenle yönetin.", tags: ["Workcube HR"], icon: Users, accent: "#DB2777" },
  { id: "saha", label: "Sahayı Yönet", description: "Saha satış ekiplerinizin rotalarını optimize edin, ziyaret planlarını oluşturun ve mobil operasyonlarınızı anlık verilerle yönetin.", tags: ["Univera EnRoute"], icon: MapPin, accent: "#F59E0B" },
  { id: "akis", label: "İş Akışını Takip Et", description: "Sipariş girişinden teslimata kadar tüm süreci Univera Uni-Dox'un e-Dönüşüm ekosistemiyle yönetin. Paramtech Flows ile ekibinizin verimliliğini artırın.", tags: ["Uni-Dox", "Paramtech Flows"], icon: ClipboardCheck, accent: "#6366F1" },
  { id: "tesvik", label: "Teşviklerden Yararlan", description: "İşletmenize en uygun hibe ve teşvik programlarını uzman danışmanlarımızla birlikte saptayın. Doğrudan ilgili kurumlarla bir araya getiriyoruz.", tags: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı"], icon: BadgePercent, accent: "#7C3AED" },
  { id: "global", label: "Globale Açıl", description: "Türkiye'nin en güçlü iş dünyası kuruluşlarının vizyonuyla ticaretinizi sınırların ötesine taşıyın. DigitalHub ile doğru pazara, doğru strateji ve tam dijital bir ekosistemle adım atın.", tags: ["TÜSİAD", "MÜSİAD", "TOBB", "Ticimax", "Mükellef"], icon: Globe2, accent: "#7C3AED" },
];

function FlipCard({ category, index, total, phase, target, isSelected, onClick }: FlipCardProps) {
  const bgImage = CARD_IMAGES[category.id];
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
      transition={{ type: "spring", stiffness: 50, damping: 30, mass: 1.2 }}
      onClick={onClick}
      whileHover={{ scale: target.scale * 1.06 }}
      whileTap={{ scale: target.scale * 0.97 }}
    >
      <motion.div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            border: isSelected ? `2px solid ${category.accent}` : "1px solid rgba(0,0,0,0.08)",
            boxShadow: isSelected ? `0 0 20px ${category.accent}40` : "0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          {/* Background image */}
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${category.accent}55 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.88) 100%)`,
            }}
          />
          {/* Label */}
          <div className="absolute inset-0 flex items-end justify-center pb-2 px-1">
            <span
              className="text-[8px] font-extrabold text-white text-center leading-tight drop-shadow-md"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
            >
              {category.label}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
const TOTAL_IMAGES = CATEGORIES.length;
const MAX_SCROLL = 3000;
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function TicaretiniBuyutCember() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>("odeme");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio > 0.5; },
      { threshold: 0.5 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isVisibleRef.current) return;
      if (scrollRef.current >= MAX_SCROLL && e.deltaY > 0) return;
      if (scrollRef.current <= 0 && e.deltaY < 0) return;
      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isVisibleRef.current) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      if (scrollRef.current >= MAX_SCROLL && deltaY > 0) return;
      if (scrollRef.current <= 0 && deltaY < 0) return;
      e.preventDefault();
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
  const smoothMorph = useSpring(morphProgress, { stiffness: 50, damping: 30 });
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 50, damping: 30 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 30 });

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

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const scatterPositions = useMemo(() => {
    return CATEGORIES.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  // Title animation: center → top, small → large
  const titleTop = useTransform(smoothMorph, [0, 0.8], [50, 4]);
  const titleScaleValue = useTransform(smoothMorph, [0, 0.8], [0.7, 1]);
  const subtitleOpacity = useTransform(smoothMorph, [0.6, 0.9], [0, 1]);

  const selected = selectedCategory ? CATEGORIES.find((c) => c.id === selectedCategory) : null;

  return (
    <section className="relative w-full" style={{ height: "100vh" }}>
      <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "hsl(var(--background))" }}>
        {/* Title: starts centered in circle, moves to top on scroll */}
        <motion.div
          className="absolute inset-x-0 z-20 flex flex-col items-center text-center px-4 pointer-events-none"
          style={{ top: useTransform(titleTop, (v) => `${v}%`), transform: "translateY(-50%)", scale: titleScaleValue }}
        >
          <motion.h3
            className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-foreground leading-none"
            style={{ letterSpacing: "-0.04em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introPhase !== "scatter" ? 1 : 0, y: 0 }}
            transition={{ delay: introPhase === "line" ? 0.3 : 0, duration: 0.6 }}
          >
            Ticaretini Büyüt
            <br />
            <span className="text-gradient-primary">Maliyetlerini Düşür</span>
          </motion.h3>

          <motion.p
            className="mt-1 text-sm text-muted-foreground tracking-widest uppercase"
            animate={{ opacity: introPhase === "circle" && morphValue < 0.3 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            KAYDIRARAK KEŞFEDİN
          </motion.p>

          {/* Description + selected category - fades in on scroll */}
          <motion.div style={{ opacity: subtitleOpacity }} className="pointer-events-auto">
            <p className="mt-0 max-w-lg text-muted-foreground text-sm md:text-base leading-relaxed mx-auto">
              İşletmenize özel 50+ dijital çözümü tek platformda keşfedin.
            </p>
            <div className="mt-16 min-h-[140px]">
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="flex flex-col items-center text-center max-w-xl mx-auto"
                  >
                    <h4 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>{selected.label}</h4>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4 max-w-md">{selected.description}</p>
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {selected.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-4 py-1.5 rounded-full text-foreground/70" style={{ background: "hsl(var(--muted))" }}>{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.p key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-base text-muted-foreground/60 italic">
                    Bir çözüm seçin
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="absolute inset-0 z-10">
          {CATEGORIES.map((category, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 58;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);
              const circleRadius = Math.min(minDimension * 0.35, 340);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circleScale = 1.6;
              const circlePos = { x: Math.cos(circleRad) * circleRadius, y: Math.sin(circleRad) * circleRadius + 40, rotation: circleAngle + 90 };

              const baseRadius = Math.min(containerSize.width * 0.6, containerSize.height * 0.9);
              const arcRadius = baseRadius * (isMobile ? 1.0 : 0.85);
              const arcApexY = containerSize.height * (isMobile ? 0.32 : 0.08);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 120 : 140;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 2.4;
              const boundedRotation = (0.5 - scrollProgress) * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue * 0.3,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(circleScale, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={category.id}
                category={category}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
