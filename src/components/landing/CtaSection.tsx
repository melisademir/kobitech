import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

const CtaSection = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="rounded-3xl overflow-visible relative"
          style={{
            background: "linear-gradient(135deg, hsl(258, 45%, 14%) 0%, hsl(268, 72%, 22%) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 32px 80px -16px rgba(109,40,217,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          {/* Inner light sheen */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
          {/* Dot grid */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />

          <div className="flex flex-col md:flex-row items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 p-12 md:p-16 text-center md:text-left"
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-5"
                style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
              >
                Dijital Dönüşümünüz
                <br />
                Burada Başlıyor
              </h2>
              <p className="text-sm mb-10 max-w-md" style={{ color: "rgba(196,181,253,0.65)", lineHeight: "1.7" }}>
                3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.
              </p>
              <Link to="/kobi/step-1">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 40px -4px rgba(124,58,237,0.7)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-xl font-bold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
                    color: "white",
                    boxShadow: "0 4px 20px -4px rgba(139,92,246,0.6)",
                  }}
                >
                  Hemen Başla <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right — dashboard overflows top */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex-1 p-8 md:pr-12 md:pt-0 hidden md:flex items-end justify-center"
              style={{ overflow: "visible" }}
            >
              <div className="relative w-full max-w-sm" style={{ marginTop: "-48px" }}>
                {/* Blob glow behind */}
                <div className="absolute inset-[-20px] blur-3xl rounded-3xl pointer-events-none"
                  style={{ background: "rgba(139,92,246,0.25)", zIndex: 0 }} />
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset, 0 24px 60px -12px rgba(0,0,0,0.4)",
                    zIndex: 1,
                  }}
                  whileHover={{
                    scale: 1.025,
                    transition: { type: "spring", stiffness: 280, damping: 20 },
                  }}
                >
                  <img src={heroDashboard} alt="Platform" className="w-full h-auto block" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
