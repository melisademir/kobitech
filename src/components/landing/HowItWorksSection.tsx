import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import stepHedef from "@/assets/step-hedef-corp.png";
import stepTeklif from "@/assets/step-teklif-corp.png";
import stepBuyume from "@/assets/step-buyume-corp.png";

const steps = [
  {
    num: "01",
    image: stepHedef,
    label: "HEDEF BELİRLEME",
    title: "Büyüme Hedefinizi Belirleyin",
    desc: "Satışlarınızı artırmak, maliyetleri düşürmek ya da yeni pazarlara açılmak mı istiyorsunuz? Hedefinizi belirleyin.",
    accent: "#7C3AED",
  },
  {
    num: "02",
    image: stepTeklif,
    label: "TEKLİF AL",
    title: "Çözümleri Karşılaştırın ve Teklif Alın",
    desc: "İşletmenize özel çözümleri inceleyin ve teklif alın.",
    accent: "#6D28D9",
  },
  {
    num: "03",
    image: stepBuyume,
    label: "BÜYÜMEYE BAŞLA",
    title: "Dijitalde Büyümenizi Başlatın",
    desc: "Size özel çözümleri seçin ve büyümeye başlayın.",
    accent: "#5B21B6",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
};

const HowItWorksSection = () => (
  <section id="how" className="py-24 md:py-36">
    <div className="max-w-6xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold mb-6 tracking-widest uppercase"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#A78BFA",
          }}
        >
          Nasıl Çalışır?
        </motion.span>
        <h2
          className="text-5xl md:text-6xl font-extrabold text-white"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          Dijitalde Büyümeye Başlayın
        </h2>
        <p
          className="mt-5 max-w-md mx-auto"
          style={{ fontSize: "19px", color: "rgba(156,163,175,0.9)", lineHeight: "1.7" }}
        >
          Hedeflerinizi belirleyin, çözümleri keşfedin ve dijital büyümenizi başlatın.
        </p>
      </motion.div>

      {/* Step Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            variants={stepVariants}
            className="group flex flex-col"
          >
            {/* Image Container — rectangular */}
            <motion.div
              className="relative overflow-hidden w-full"
              style={{
                borderRadius: "16px 16px 0 0",
                aspectRatio: "16/10",
                background: "#0F172A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "none",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              {/* Step number overlay */}
              <div
                className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {s.num}
              </div>
            </motion.div>

            {/* Card body */}
            <motion.div
              className="flex-1 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "0 0 16px 16px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "1px solid rgba(124,58,237,0.2)",
                padding: "1.5rem 1.75rem 1.75rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              whileHover={{
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(124,58,237,0.35)",
                transition: { duration: 0.25 },
              }}
            >
              {/* Label */}
              <span
                className="inline-block self-start mb-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase"
                style={{
                  background: `rgba(124,58,237,0.12)`,
                  color: "#A78BFA",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
              >
                {s.label}
              </span>

              <h3
                className="text-white font-bold mb-3 leading-snug"
                style={{ fontSize: "21px", letterSpacing: "-0.015em" }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: "15px", color: "rgba(156,163,175,0.85)", lineHeight: "1.65" }}>
                {s.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="text-center mt-16"
      >
        <Link to="/kobi/step-1">
          <motion.button
            whileHover={{ y: -2, scale: 1.02, boxShadow: "0 8px 32px rgba(107,33,168,0.45)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
            className="inline-flex items-center gap-3 text-white font-bold"
            style={{
              height: "54px",
              padding: "0 48px",
              borderRadius: "28px",
              fontSize: "17px",
              background: "linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #8B5CF6 100%)",
              boxShadow: "0 4px 16px rgba(107,33,168,0.35)",
            }}
          >
            Hemen Başla <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
