import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.png";

const CtaSection = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="rounded-3xl overflow-visible gradient-primary-dark relative"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 32px 80px -16px rgba(109,40,217,0.35)",
          }}
        >
          {/* Inner light sheen */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />

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
                style={{ letterSpacing: "-0.025em", lineHeight: 1.2 }}
              >
                Dijital Dönüşümünüz
                <br />
                Burada Başlıyor
              </h2>
              <p className="text-white/60 text-sm mb-10 max-w-md" style={{ lineHeight: "1.7" }}>
                3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.
              </p>
              <motion.div
                whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 320, damping: 18 } }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Button asChild variant="accent" size="lg">
                  <Link to="/kobi/step-1">
                    Hemen Başla <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right — dashboard overflows card top */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex-1 p-8 md:pr-12 md:pt-0 hidden md:flex items-end justify-center"
              style={{ overflow: "visible" }}
            >
              <div className="relative w-full max-w-sm" style={{ marginTop: "-40px" }}>
                {/* Glow behind */}
                <div className="absolute inset-[-10px] blur-3xl rounded-3xl" style={{ background: "rgba(109,40,217,0.3)", zIndex: 0 }} />
                {/* Double-border image card overflows */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    outline: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset, 0 24px 60px -12px rgba(0,0,0,0.35)",
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
