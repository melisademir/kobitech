import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "1",
    title: "Ücretsiz Kayıt Olun",
    desc: "Sadece ad-soyad ve telefon numaranızla hemen kayıt olun.",
    gradient: "linear-gradient(135deg, #6D28D9, #7C3AED)",
    bgGlow: "rgba(109,40,217,0.14)",
    shadowColor: "rgba(109,40,217,0.35)",
  },
  {
    num: "2",
    title: "İşletmenizi Tanımlayın",
    desc: "Sektörünüzü ve ihtiyaçlarınızı belirleyin, size özel çözümler sunalım.",
    gradient: "linear-gradient(135deg, #7C3AED, #9333EA)",
    bgGlow: "rgba(124,58,237,0.14)",
    shadowColor: "rgba(124,58,237,0.35)",
  },
  {
    num: "3",
    title: "Dijitalleşmeye Başlayın",
    desc: "Yol haritanızı takip edin, partnerlerimizle büyümeye başlayın.",
    gradient: "linear-gradient(135deg, #9333EA, #A855F7)",
    bgGlow: "rgba(147,51,234,0.14)",
    shadowColor: "rgba(147,51,234,0.35)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const HowItWorksSection = () => (
  <section id="how" className="section-gap">
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
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Dijitalleşmeye 3 Adımda Başlayın
        </h2>
        <p className="text-muted-foreground text-lg mt-4 max-w-md mx-auto" style={{ lineHeight: "1.7" }}>
          Kurulum yok, teknik bilgi yok. Sadece 3 kısa adım.
        </p>
      </motion.div>

      {/* 3 Column Layout */}
      <div className="relative">
        {/* Gradient connector line - desktop only */}
        <div
          className="hidden md:block absolute top-[2.4rem] left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-[2px] z-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #6D28D9 0%, #9333EA 50%, #A855F7 100%)",
            opacity: 0.35,
          }}
        />

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
              {/* Pulse circle — bigger, gradient */}
              <div className="relative mb-10">
                {/* Soft ambient glow */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl scale-[2]"
                  style={{ background: s.bgGlow }}
                />
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{ background: s.gradient }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.7 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full opacity-12"
                  style={{ background: s.gradient }}
                  animate={{ scale: [1, 2.4, 1], opacity: [0.12, 0, 0.12] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.7 + 0.5 }}
                />
                {/* Main circle — larger w-24 h-24 */}
                <motion.div
                  className="relative w-24 h-24 rounded-full text-white font-black text-3xl flex items-center justify-center border border-white/25"
                  style={{
                    background: s.gradient,
                    boxShadow: `0 8px 32px -4px ${s.shadowColor}`,
                  }}
                  whileHover={{
                    scale: 1.12,
                    boxShadow: `0 12px 48px -4px ${s.shadowColor}`,
                  }}
                  transition={{ type: "spring", stiffness: 280 }}
                >
                  {s.num}
                </motion.div>
              </div>

              {/* Card — glass, hover text slides right */}
              <motion.div
                className="rounded-2xl p-10 w-full border border-white/25 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 2px 24px -4px rgba(109,40,217,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
                }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 16px 48px -8px ${s.shadowColor}`,
                  transition: { duration: 0.22 },
                }}
              >
                <motion.h3
                  className="text-base font-bold text-foreground mb-3 leading-snug"
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  {s.title}
                </motion.h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-normal" style={{ lineHeight: "1.7" }}>
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
          <Link to="/kobi/signup">Hemen Başla <ArrowRight className="h-5 w-5 ml-1" /></Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
