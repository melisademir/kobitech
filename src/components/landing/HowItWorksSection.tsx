import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Target, BarChart3, TrendingUp, Search, FileText, Zap, Globe, Sparkles } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Target,
    subIcons: [TrendingUp, BarChart3],
    title: "Büyüme Hedefinizi Belirleyin",
    desc: "Satışlarınızı artırmak, maliyetleri düşürmek ya da yeni pazarlara açılmak mı istiyorsunuz? Hedefinizi belirleyin.",
    accent: "#A78BFA",
    accentDark: "#7C3AED",
    label: "Hedef Belirleme",
  },
  {
    num: "02",
    icon: Search,
    subIcons: [FileText, Sparkles],
    title: "Çözümleri Karşılaştırın ve Teklif Alın",
    desc: "İşletmenize özel çözümleri inceleyin ve teklif alın.",
    accent: "#818CF8",
    accentDark: "#6366F1",
    label: "Teklif Al",
  },
  {
    num: "03",
    icon: Zap,
    subIcons: [Globe, TrendingUp],
    title: "Dijitalde Büyümenizi Başlatın",
    desc: "Size özel çözümleri seçin ve büyümeye başlayın.",
    accent: "#C084FC",
    accentDark: "#A855F7",
    label: "Büyümeye Başla",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } },
};

// Animated SVG connector
const ConnectorSVG = () => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <svg
      ref={ref}
      className="hidden md:block absolute top-[5.5rem] left-[calc(16.67%+5rem)] w-[calc(66.66%-10rem)] h-[2px] overflow-visible"
      viewBox="0 0 400 2"
      preserveAspectRatio="none"
      style={{ zIndex: 0 }}
    >
      <line x1="0" y1="1" x2="400" y2="1" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="6 4" />
      <motion.line
        x1="0" y1="1" x2="400" y2="1"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Rich icon illustration for each step
const StepIcon = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const [Sub1, Sub2] = step.subIcons;
  const Icon = step.icon;

  return (
    <div className="relative w-28 h-28 mx-auto mb-8">
      {/* Outer ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${step.accent}30 0%, transparent 70%)`,
          transform: "scale(2.8)",
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [2.6, 3.0, 2.6] }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.9, ease: "easeInOut" }}
      />

      {/* Outer dashed ring */}
      <motion.div
        className="absolute inset-[-10px] rounded-full"
        style={{ border: `1px dashed ${step.accent}30` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Mid ring */}
      <div
        className="absolute inset-[-4px] rounded-full"
        style={{ border: `1px solid ${step.accent}20` }}
      />

      {/* Main icon container */}
      <motion.div
        className="relative w-28 h-28 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)`,
          backdropFilter: "blur(24px)",
          border: `1.5px solid ${step.accent}50`,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 16px 48px -8px ${step.accent}55, 0 4px 16px -4px rgba(0,0,0,0.4)`,
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.10) inset, 0 24px 64px -8px ${step.accent}77, 0 4px 16px -4px rgba(0,0,0,0.4)`,
          transition: { type: "spring", stiffness: 280, damping: 16 },
        }}
      >
        {/* Center gradient background */}
        <div
          className="absolute inset-3 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${step.accent}22 0%, transparent 65%)`,
          }}
        />

        {/* Main icon */}
        <Icon
          className="relative w-10 h-10"
          style={{ color: step.accent, filter: `drop-shadow(0 0 8px ${step.accent}88)` }}
          strokeWidth={1.4}
        />

        {/* Step number badge */}
        <div
          className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${step.accent}, ${step.accentDark})`,
            boxShadow: `0 4px 12px -2px ${step.accent}66`,
          }}
        >
          {index + 1}
        </div>
      </motion.div>

      {/* Floating sub-icon 1 — top-left */}
      <motion.div
        className="absolute -top-1 -left-2 w-8 h-8 rounded-xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${step.accent}30`,
          backdropFilter: "blur(12px)",
        }}
        animate={{ y: [0, -5, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
      >
        <Sub1 className="w-3.5 h-3.5" style={{ color: step.accent }} strokeWidth={1.5} />
      </motion.div>

      {/* Floating sub-icon 2 — bottom-right */}
      <motion.div
        className="absolute -bottom-1 -right-2 w-8 h-8 rounded-xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${step.accent}30`,
          backdropFilter: "blur(12px)",
        }}
        animate={{ y: [0, 5, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.7 + 0.5, ease: "easeInOut" }}
      >
        <Sub2 className="w-3.5 h-3.5" style={{ color: step.accent }} strokeWidth={1.5} />
      </motion.div>
    </div>
  );
};

const HowItWorksSection = () => (
  <section id="how" className="py-24 md:py-36">
    <div className="max-w-5xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
          style={{
            background: "rgba(109,40,217,0.25)",
            border: "1px solid rgba(139,92,246,0.35)",
            color: "#C4B5FD",
          }}
        >
          Nasıl Çalışır?
        </motion.span>
        <h2
          className="text-4xl md:text-5xl font-bold text-white"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
        >
          Dijitalde Büyümeye Başlayın
        </h2>
        <p className="text-sm mt-4 max-w-sm mx-auto" style={{ color: "rgba(196,181,253,0.6)", lineHeight: "1.7" }}>
          Hedeflerinizi belirleyin, çözümleri keşfedin ve dijital büyümenizi başlatın.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative">
        <ConnectorSVG />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={stepVariants}
              className="flex flex-col items-center text-center relative z-10 group"
            >
              <StepIcon step={s} index={i} />

              {/* Card */}
              <motion.div
                className="w-full"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.09)",
                  padding: "1.75rem",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
                }}
                whileHover={{
                  y: -8,
                  background: "rgba(255,255,255,0.08)",
                  border: `1px solid ${s.accent}44`,
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 24px 48px -8px ${s.accent}33`,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                {/* Label chip */}
                <div className="flex justify-center mb-3">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase"
                    style={{ background: `${s.accent}18`, color: s.accent, border: `1px solid ${s.accent}30` }}
                  >
                    {s.label}
                  </span>
                </div>
                <h3
                  className="text-base font-semibold text-white mb-3 leading-snug"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm" style={{ color: "rgba(196,181,253,0.6)", lineHeight: "1.7" }}>
                  {s.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-16"
      >
        <Link to="/kobi/step-1">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px -4px rgba(124,58,237,0.7)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl font-bold text-sm text-white"
            style={{
              background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
              boxShadow: "0 4px 20px -4px rgba(124,58,237,0.5)",
            }}
          >
            Hemen Başla <ArrowRight className="h-4 w-4" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
