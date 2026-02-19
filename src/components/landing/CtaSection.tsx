import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CtaSection = () => (
  <section className="py-0">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="rounded-3xl overflow-hidden gradient-primary-dark relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 p-10 md:p-14 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-4 leading-tight">
                Dijital Dönüşümünüz<br />Burada Başlıyor
              </h2>
              <p className="text-primary-foreground/70 text-sm mb-8 max-w-md">
                3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.
              </p>
              <Button asChild variant="accent" size="lg">
                <Link to="/kobi/step-1">Hemen Başla <ArrowRight className="h-5 w-5 ml-1" /></Link>
              </Button>
            </div>
            <div className="flex-1 p-6 md:p-10 hidden md:block">
              <div className="rounded-xl overflow-hidden shadow-premium opacity-80">
                <img src={heroDashboard} alt="Platform" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
