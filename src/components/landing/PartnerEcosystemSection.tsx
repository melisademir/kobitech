import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ShoppingCart, CreditCard, Globe, BarChart3, Package,
  Building2, Users, FileText, ArrowRight, Check, Layers
} from "lucide-react";

// ─── Partner data ───────────────────────────────────────────────────────────
const partners = [
  { name: "T-SOFT", category: "E-ticaret Platformu", color: "#7D1F3E", short: "TS" },
  { name: "QNB", category: "Finansal Çözümler", color: "#0891B2", short: "QNB" },
  { name: "ikas", category: "E-ticaret Altyapısı", color: "#3B82F6", short: "İ" },
  { name: "Param", category: "Ödeme Sistemleri", color: "#FF6B35", short: "P" },
  { name: "Kredim", category: "Finansman Çözümleri", color: "#F97316", short: "K" },
  { name: "QF", category: "Dijital Finans", color: "#7C3AED", short: "QF" },
  { name: "Azalt", category: "Maliyet Yönetimi", color: "#EF4444", short: "AZ" },
  { name: "QeS", category: "E-fatura Sistemi", color: "#6B21A8", short: "QeS" },
  { name: "Aras", category: "Kargo & Lojistik", color: "#10B981", short: "AR" },
  { name: "Google", category: "Bulut & İşbirliği", color: "#4285F4", short: "G" },
  { name: "Univera", category: "ERP Yazılımı", color: "#2563EB", short: "UV" },
  { name: "Nebim", category: "Perakende ERP", color: "#1E3A8A", short: "NB" },
  { name: "Kariyer.net", category: "İK & İstihdam", color: "#F97316", short: "KR" },
  { name: "Mükellef", category: "Muhasebe & Vergi", color: "#1E40AF", short: "MK" },
  { name: "Ticimax", category: "E-ticaret Çözümleri", color: "#0EA5E9", short: "TC" },
  { name: "KolayBi", category: "Ön Muhasebe", color: "#14B8A6", short: "KB" },
  { name: "Web Plus", category: "Web Çözümleri", color: "#9333EA", short: "WP" },
  { name: "Stokbar", category: "Stok Yönetimi", color: "#059669", short: "SB" },
  { name: "Varuna", category: "Lojistik Yazılımı", color: "#DC2626", short: "VR" },
  { name: "Enroute", category: "Dağıtım Optimizasyonu", color: "#7C3AED", short: "EN" },
  { name: "Finrota", category: "Finansal Yönetim", color: "#D946EF", short: "FR" },
  { name: "UniDOX", category: "Dijital Dönüşüm", color: "#0F766E", short: "UD" },
  { name: "Quest", category: "Teknoloji Çözümleri", color: "#B45309", short: "QT" },
];

// ─── Orbital positions — angle + radius variations for organic feel ──────────
function getOrbitalPositions(count: number, baseRadius: number) {
  const positions = [];
  const angleStep = (2 * Math.PI) / count;
  // Predefined offsets for organic feel
  const radiusOffsets = [0, 20, -15, 25, -10, 18, -20, 10, -25, 15, -5, 22, -18, 8, 20, -12, 15, -20, 10, -15, 22, -8, 16];
  const angleOffsets = [0, 0.08, -0.06, 0.1, -0.05, 0.07, -0.09, 0.04, -0.08, 0.06, 0.03, -0.07, 0.09, -0.04, 0.06, -0.1, 0.05, -0.03, 0.08, -0.06, 0.04, 0.09, -0.05];

  for (let i = 0; i < count; i++) {
    const angle = i * angleStep + (angleOffsets[i % angleOffsets.length] || 0);
    const radius = baseRadius + (radiusOffsets[i % radiusOffsets.length] || 0);
    positions.push({
      x: Math.cos(angle - Math.PI / 2) * radius,
      y: Math.sin(angle - Math.PI / 2) * radius,
    });
  }
  return positions;
}

// ─── Categories list ─────────────────────────────────────────────────────────
const categories = [
  "E-ticaret", "Ödeme Sistemleri", "Muhasebe",
  "Stok Yönetimi", "Global Açılım", "Finansman",
  "İK Çözümleri", "ERP",
];

const centerIcons = [
  { icon: ShoppingCart, color: "#8B5CF6" },
  { icon: CreditCard, color: "#6D28D9" },
  { icon: Globe, color: "#A78BFA" },
  { icon: BarChart3, color: "#7C3AED" },
  { icon: Package, color: "#9333EA" },
];

// ─── Connecting line partners (subset) ───────────────────────────────────────
const connectedIndices = [0, 2, 4, 6, 9, 12, 15, 18, 20];

// ─── Floating animation params ───────────────────────────────────────────────
const floatParams = [
  { duration: 3.8, delay: 0 }, { duration: 4.2, delay: 0.4 },
  { duration: 3.5, delay: 0.8 }, { duration: 4.6, delay: 0.2 },
  { duration: 3.9, delay: 1.1 }, { duration: 4.1, delay: 0.6 },
  { duration: 3.7, delay: 1.5 }, { duration: 4.4, delay: 0.3 },
  { duration: 3.6, delay: 0.9 }, { duration: 4.3, delay: 1.3 },
  { duration: 3.8, delay: 0.5 }, { duration: 4.0, delay: 1.7 },
  { duration: 3.4, delay: 0.7 }, { duration: 4.5, delay: 1.0 },
  { duration: 3.9, delay: 1.4 }, { duration: 4.2, delay: 0.1 },
  { duration: 3.7, delay: 1.6 }, { duration: 4.1, delay: 0.8 },
  { duration: 3.5, delay: 1.2 }, { duration: 4.3, delay: 0.4 },
  { duration: 3.8, delay: 1.8 }, { duration: 4.0, delay: 0.6 },
  { duration: 3.6, delay: 1.0 },
];

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats = [
  { value: "50+", label: "Çözüm Ortağı", icon: Building2 },
  { value: "21", label: "Param Ürünü", icon: Layers },
  { value: "10", label: "Kategori", icon: Package },
];

// ─── SVG Connecting Lines Component ──────────────────────────────────────────
const ConnectingLines = ({
  positions,
  centerSize,
}: {
  positions: { x: number; y: number }[];
  centerSize: number;
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const svgSize = 700;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const cr = centerSize / 2; // center circle radius

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
          <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="connGradR" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
      </defs>
      {connectedIndices.map((idx) => {
        if (!positions[idx]) return null;
        const px = cx + positions[idx].x;
        const py = cy + positions[idx].y;

        // Direction vector from partner to center
        const dx = cx - px;
        const dy = cy - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Endpoint just at edge of center circle
        const ex = px + (dx / dist) * (dist - cr - 4);
        const ey = py + (dy / dist) * (dist - cr - 4);

        // Slight quadratic curve midpoint offset
        const mx = (px + ex) / 2 + dy * 0.1;
        const my = (py + ey) / 2 - dx * 0.1;

        return (
          <motion.path
            key={idx}
            d={`M ${px} ${py} Q ${mx} ${my} ${ex} ${ey}`}
            stroke="url(#connGrad)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 + (idx % 5) * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </svg>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const PartnerEcosystemSection = () => {
  const [tooltip, setTooltip] = useState<{ idx: number; name: string; category: string } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const ORBIT_SIZE = 620; // SVG viewport size
  const CENTER_PX = 220;   // center circle px (visual)
  const BASE_RADIUS = 268; // orbit radius from center

  const positions = getOrbitalPositions(partners.length, BASE_RADIUS);

  return (
    <section id="partners" className="py-24 md:py-36 overflow-hidden" style={{ background: "#F9FAFB" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-5 tracking-widest uppercase border border-primary/15">
            Ekosistem
          </span>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── LEFT: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-xl"
          >
            <h2
              className="font-black text-foreground mb-6"
              style={{
                fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
              }}
            >
              Dijital Dönüşüm Ekosistemi:{" "}
              <span className="text-gradient-primary">Tek Platformda</span>{" "}
              Tüm Çözümler
            </h2>

            <p
              className="text-slate-500 mb-10"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", lineHeight: 1.75, maxWidth: "560px" }}
            >
              E-ticaretten ödeme sistemlerine, muhasebeden global açılıma, stok yönetiminden
              finansmana — işletmenizin tüm dijital ihtiyaçlarını karşılayan{" "}
              <strong className="text-foreground font-semibold">50+ çözüm ortağıyla</strong>{" "}
              çalışıyoruz. Hepsi tek platformda, size özel!
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col"
                >
                  <span
                    className="font-black text-primary"
                    style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 font-medium">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA button */}
            <Link to="/kobi/signup">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 12px 40px -6px rgba(109,40,217,0.55)",
                  transition: { type: "spring", stiffness: 300, damping: 18 },
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, hsl(268,72%,38%), hsl(268,72%,52%))",
                  boxShadow: "0 6px 24px -4px rgba(109,40,217,0.4)",
                }}
              >
                Çözüm Ortaklarını Keşfet <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* ── RIGHT: Orbital visual ── */}
          <div
            ref={sectionRef}
            className="flex-1 flex items-center justify-center relative"
            style={{
              width: "100%",
              maxWidth: "620px",
              minHeight: "620px",
            }}
          >
            {/* SVG overlay for connecting lines */}
            <div
              className="absolute"
              style={{ width: `${ORBIT_SIZE}px`, height: `${ORBIT_SIZE}px`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            >
              <ConnectingLines positions={positions} centerSize={CENTER_PX} />
            </div>

            {/* ── Center circle ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center justify-center text-center rounded-full"
              style={{
                width: `${CENTER_PX}px`,
                height: `${CENTER_PX}px`,
                background: "radial-gradient(circle at 40% 35%, hsl(268,72%,97%), hsl(252,60%,94%))",
                border: "6px solid hsl(268,72%,38%)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.9) inset, 0 0 60px -10px rgba(109,40,217,0.25), 0 24px 80px -20px rgba(109,40,217,0.18)",
                backdropFilter: "blur(8px)",
                flexShrink: 0,
              }}
            >
              {/* Mini icon grid */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {centerIcons.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${i === 2 ? "col-start-2" : ""}`}
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.8} />
                  </motion.div>
                ))}
              </div>

              <h3
                className="font-black"
                style={{ fontSize: "1.25rem", letterSpacing: "-0.025em", color: "hsl(268,72%,30%)", lineHeight: 1.1 }}
              >
                Dijital
                <br />
                Ekosistem
              </h3>

              <p className="text-slate-500 mt-1.5 px-4" style={{ fontSize: "11px", lineHeight: 1.5 }}>
                E-ticaret, Ödeme, Muhasebe,<br />Lojistik, İK, ERP — Burada!
              </p>

              {/* 2-col category checklist */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-3 px-4">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center gap-1">
                    <Check className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "hsl(268,72%,38%)" }} strokeWidth={3} />
                    <span style={{ fontSize: "9.5px", color: "hsl(260,15%,45%)", fontWeight: 600 }}>{cat}</span>
                  </div>
                ))}
              </div>

              {/* Inner keşfet button */}
              <Link to="/kobi/signup" className="mt-3">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full font-bold"
                  style={{
                    background: "hsl(268,72%,38%)",
                    color: "white",
                    fontSize: "10px",
                    boxShadow: "0 2px 8px rgba(109,40,217,0.3)",
                  }}
                >
                  Keşfet <ArrowRight className="w-2.5 h-2.5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* ── Orbiting partner logos ── */}
            {partners.map((partner, i) => {
              const pos = positions[i];
              if (!pos) return null;
              const fp = floatParams[i] || { duration: 4, delay: 0 };

              return (
                <motion.div
                  key={partner.name}
                  className="absolute z-20 cursor-pointer"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: "64px",
                    height: "64px",
                    marginLeft: "-32px",
                    marginTop: "-32px",
                    x: pos.x,
                    y: pos.y,
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.3 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onHoverStart={() => setTooltip({ idx: i, name: partner.name, category: partner.category })}
                  onHoverEnd={() => setTooltip(null)}
                >
                  {/* Floating animation wrapper */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: fp.duration,
                      delay: fp.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-full h-full"
                  >
                    {/* Logo circle */}
                    <motion.div
                      className="w-full h-full rounded-2xl flex items-center justify-center select-none"
                      style={{
                        background: partner.color,
                        boxShadow: `0 4px 16px -4px ${partner.color}66, 0 1px 4px rgba(0,0,0,0.12)`,
                        border: "2px solid rgba(255,255,255,0.9)",
                      }}
                      whileHover={{
                        scale: 1.22,
                        boxShadow: `0 8px 28px -4px ${partner.color}99`,
                        transition: { type: "spring", stiffness: 320, damping: 18 },
                      }}
                    >
                      <span
                        className="font-black text-white select-none"
                        style={{ fontSize: partner.short.length > 2 ? "9px" : partner.short.length > 1 ? "11px" : "14px", letterSpacing: "-0.02em" }}
                      >
                        {partner.short}
                      </span>
                    </motion.div>

                    {/* Tooltip */}
                    {tooltip?.idx === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute z-30 pointer-events-none"
                        style={{
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          whiteSpace: "nowrap",
                          background: "white",
                          borderRadius: "10px",
                          padding: "6px 12px",
                          boxShadow: "0 4px 20px -4px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
                        }}
                      >
                        <p className="text-xs font-bold text-foreground">{partner.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{partner.category}</p>
                        {/* Arrow */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2"
                          style={{
                            bottom: "-5px",
                            width: 0,
                            height: 0,
                            borderLeft: "5px solid transparent",
                            borderRight: "5px solid transparent",
                            borderTop: "5px solid white",
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerEcosystemSection;
