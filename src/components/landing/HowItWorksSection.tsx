import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, UserPlus, Building2, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Ücretsiz Kayıt Olun",
    desc: "Sadece ad-soyad ve telefon numaranızla hemen kayıt olun.",
    accent: "#A78BFA",
  },
  {
    num: "02",
    icon: Building2,
    title: "İşletmenizi Tanımlayın",
    desc: "Sektörünüzü ve ihtiyaçlarınızı belirleyin, size özel çözümler sunalım.",
    accent: "#8B5CF6",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Dijitalleşmeye Başlayın",
    desc: "Yol haritanızı takip edin, partnerlerimizle büyümeye başlayın.",
    accent: "#7C3AED",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
};

// Animated SVG connector that draws left-to-right on scroll
const ConnectorSVG = () => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <svg
      ref={ref}
      className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+3.5rem)] w-[calc(66.66%-7rem)] h-[2px] overflow-visible"
      viewBox="0 0 400 2"
      preserveAspectRatio="none"
      style={{ zIndex: 0 }}
    >
      {/* Background line */}
      <line x1="0" y1="1" x2="400" y2="1" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      {/* Animated fill line */}
      <motion.line
        x1="0" y1="1" x2="400" y2="1"
        stroke="url(#lineGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const HowItWorksSection = () => (
  <section id="how" className="py-24 md:py-36">
    <div className="max-w-5xl mx-auto px-6">
      {/* Header — white text on dark navy */}
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
              {/* Step circle */}
              <div className="relative mb-8">
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: `radial-gradient(circle, ${s.accent}33 0%, transparent 70%)`, transform: "scale(2.5)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                />
                <motion.div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${s.accent}55`,
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.05) inset, 0 8px 32px -4px ${s.accent}44`,
                  }}
                  whileHover={{
                    scale: 1.12,
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.08) inset, 0 16px 48px -4px ${s.accent}66`,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  }}
                >
                  <s.icon className="w-8 h-8" style={{ color: s.accent }} strokeWidth={1.5} />
                  {/* Step number tag */}
                  <span
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center"
                    style={{ background: s.accent, color: "white" }}
                  >
                    {i + 1}
                  </span>
                </motion.div>
              </div>

              {/* Card — glass on dark */}
              <motion.div
                className="w-full"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "2rem",
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
