import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import stepHedef from "@/assets/step-hedef-corp.png";
import stepTeklif from "@/assets/step-teklif-corp.png";
import stepBuyume from "@/assets/step-buyume-corp.png";

const steps = [
  {
    num: "1",
    image: stepHedef,
    badges: ["Karşılaştır"],
    title: "İşletmenize özel çözümleri inceleyin ve karşılaştırın.",
  },
  {
    num: "2",
    image: stepTeklif,
    badges: ["Teklif Al"],
    title: "Size özel çözümleri seçin ve teklif alın.",
  },
  {
    num: "3",
    image: stepBuyume,
    badges: ["Ticaretini Büyüt, Maliyetini Düşür"],
    title: "Dijital büyümenizi hemen başlatın.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    transition: { type: "spring" as const, stiffness: 300, damping: 15 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
};

const HowItWorksSection = () => (
  <section id="how" className="py-20 md:py-[120px]">
    <div className="max-w-[1200px] mx-auto px-6">
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
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          Dijitalde Büyümeye
          <br />
          <span className="text-gradient-primary">Başlayın</span>
        </h2>
        <p
          className="mt-5 mx-auto text-base md:text-lg md:whitespace-nowrap"
          style={{ color: "#94A3B8", lineHeight: "1.7" }}
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {steps.map((s) => (
          <motion.div
            key={s.num}
            variants={stepVariants}
          >
            <motion.div
              className="flex flex-col overflow-hidden cursor-default h-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
              }}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <motion.img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                {/* Number + Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center justify-center rounded-full font-extrabold text-white"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "14px",
                      background: "linear-gradient(135deg, #6D28D9, #8B5CF6)",
                      boxShadow: "0 2px 8px rgba(124,58,237,0.35)",
                    }}
                  >
                    {s.num}
                  </span>
                  {s.badges.map((b) => (
                    <span
                      key={b}
                      className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase"
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.3)",
                        color: "#A78BFA",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-white font-bold leading-snug"
                  style={{ fontSize: "clamp(17px, 2vw, 21px)", letterSpacing: "-0.015em" }}
                >
                  {s.title}
                </h3>
              </div>
            </motion.div>
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
        <Link to="/digitalhub/onboarding1">
          <ButtonColorful label="Hemen Başla" className="min-w-[260px]" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
