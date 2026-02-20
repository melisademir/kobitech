import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.png";

const CtaSection = () => (
  <section className="section-gap">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-3xl overflow-hidden gradient-primary-dark relative border border-white/10">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 p-12 md:p-16 text-center md:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-5 leading-tight tracking-tight">
                Dijital Dönüşümünüz<br />Burada Başlıyor
              </h2>
              <p className="text-primary-foreground/65 text-base mb-10 max-w-md leading-relaxed">
                3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.
              </p>
              <Button asChild variant="accent" size="lg">
                <Link to="/kobi/step-1">Hemen Başla <ArrowRight className="h-5 w-5 ml-1" /></Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 p-8 md:p-12 hidden md:block"
            >
              {/* Glow behind image */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-2xl scale-90" />
                <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-white/10 relative">
                  <img src={heroDashboard} alt="Platform" className="w-full h-auto" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
