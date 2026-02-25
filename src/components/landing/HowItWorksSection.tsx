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
    badge: "Adım 1",
    title: "İşletmenize özel çözümleri inceleyin ve karşılaştırın.",
  },
  {
    num: "02",
    image: stepTeklif,
    badge: "Adım 2",
    title: "Size özel çözümleri seçin ve teklif alın.",
  },
  {
    num: "03",
    image: stepBuyume,
    badge: "Adım 3",
    title: "Dijital büyümenizi hemen başlatın.",
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
        <span
          className="inline-block px-5 py-2 rounded-full text-[11px] font-semibold mb-6 tracking-widest uppercase cursor-default"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1.5px solid rgba(124,58,237,0.3)",
            color: "#A78BFA",
          }}
        >
          Nasıl Çalışır?
        </span>
        <h2
          className="text-5xl md:text-6xl font-extrabold text-white"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          Dijitalde Büyümeye Başlayın
        </h2>
        <p
          className="mt-5 mx-auto whitespace-nowrap"
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
        {steps.map((s) => (
          <motion.div
            key={s.num}
            variants={stepVariants}
            className="group flex flex-col"
          >
            {/* Image Container */}
            <div
              className="relative overflow-hidden w-full"
              style={{
                borderRadius: "20px 20px 0 0",
                aspectRatio: "16/10",
                background: "#0F172A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "none",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card body */}
            <div
              className="flex-1 flex flex-col transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "0 0 20px 20px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "1px solid rgba(124,58,237,0.2)",
                padding: "1.5rem 1.75rem 1.75rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-3"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  color: "#A78BFA",
                }}
              >
                {s.badge}
              </span>
              <h3
                className="text-white font-bold mb-3 leading-snug"
                style={{ fontSize: "21px", letterSpacing: "-0.015em" }}
              >
                {s.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button — large, corporate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="text-center mt-16"
      >
        <Link to="/kobi/step-1">
          <button
            className="inline-flex items-center gap-3 text-white font-bold transition-all duration-200"
            style={{
              height: "54px",
              padding: "0 48px",
              borderRadius: "24px",
              fontSize: "16px",
              background: "linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #8B5CF6 100%)",
              boxShadow: "0 4px 16px rgba(107,33,168,0.35)",
              minWidth: "260px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #5B21B6 0%, #6D28D9 50%, #7C3AED 100%)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(107,33,168,0.50)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #8B5CF6 100%)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(107,33,168,0.35)";
            }}
          >
            Hemen Başla <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
