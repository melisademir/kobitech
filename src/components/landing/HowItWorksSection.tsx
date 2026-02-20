import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "1",
    title: "Ücretsiz Kayıt Olun",
    desc: "Sadece ad-soyad ve telefon numaranızla hemen kayıt olun.",
    gradient: "linear-gradient(135deg, #6D28D9, #7C3AED)",
    bgGlow: "rgba(109,40,217,0.10)",
    shadowColor: "rgba(109,40,217,0.28)",
  },
  {
    num: "2",
    title: "İşletmenizi Tanımlayın",
    desc: "Sektörünüzü ve ihtiyaçlarınızı belirleyin, size özel çözümler sunalım.",
    gradient: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
    bgGlow: "rgba(124,58,237,0.10)",
    shadowColor: "rgba(124,58,237,0.28)",
  },
  {
    num: "3",
    title: "Dijitalleşmeye Başlayın",
    desc: "Yol haritanızı takip edin, partnerlerimizle büyümeye başlayın.",
    gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
    bgGlow: "rgba(139,92,246,0.10)",
    shadowColor: "rgba(139,92,246,0.28)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
};

// Animated connector line — fills left-to-right on scroll into view
const ConnectorLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="hidden md:block absolute top-[2.85rem] left-[calc(16.67%+3rem)] right-[calc(16.67%+3rem)] h-[1.5px] z-0 overflow-hidden rounded-full"
      style={{ background: "hsl(252,20%,92%)" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)",
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.3, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

const HowItWorksSection = () => (
  <section id="how" className="py-24 md:py-32">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-widest uppercase border border-primary/15"
        >
          Nasıl Çalışır?
        </motion.span>
        <h2
          className="text-4xl md:text-5xl font-bold text-foreground"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
        >
          Dijitalleşmeye 3 Adımda Başlayın
        </h2>
        <p className="text-slate-500 text-sm mt-4 max-w-sm mx-auto" style={{ lineHeight: "1.7" }}>
          Kurulum yok, teknik bilgi yok. Sadece 3 kısa adım.
        </p>
      </motion.div>

      {/* 3-col layout */}
      <div className="relative">
        <ConnectorLine />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={stepVariants}
              className="flex flex-col items-center text-center relative z-10 group"
            >
              {/* Step circle with pulse rings */}
              <div className="relative mb-10">
                <div
                  className="absolute inset-0 rounded-full blur-2xl scale-[2.2]"
                  style={{ background: s.bgGlow }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: s.gradient, opacity: 0.14 }}
                  animate={{ scale: [1, 1.9, 1], opacity: [0.14, 0, 0.14] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.7 }}
                />
                {/* Main circle */}
                <motion.div
                  className="relative w-24 h-24 rounded-full text-white font-black text-3xl flex items-center justify-center"
                  style={{
                    background: s.gradient,
                    boxShadow: `0 8px 28px -4px ${s.shadowColor}`,
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 16px 48px -4px ${s.shadowColor}`,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  }}
                >
                  {s.num}
                </motion.div>
              </div>

              {/* Card — double border */}
              <motion.div
                className="w-full"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.95)",
                  outline: "1px solid hsl(252,20%,91%)",
                  outlineOffset: "0px",
                  padding: "2.5rem",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.85) inset, 0 2px 20px -4px rgba(109,40,217,0.06)",
                }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.85) inset, 0 20px 48px -8px ${s.shadowColor}`,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <motion.h3
                  className="text-sm font-semibold text-foreground mb-3 leading-snug"
                  style={{ letterSpacing: "-0.01em" }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  {s.title}
                </motion.h3>
                <p className="text-slate-500 text-sm" style={{ lineHeight: "1.7" }}>
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
        <Button asChild variant="hero" size="lg">
          <Link to="/kobi/signup">
            Hemen Başla <ArrowRight className="h-5 w-5 ml-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
