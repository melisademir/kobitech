import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroDashboard from "@/assets/hero-dashboard.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HeroSection = () => (
  <>
    <section className="relative overflow-hidden pt-20 pb-8 lg:pt-28 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-6 tracking-wide uppercase">
            Dijital Esnaf Platformu
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-5">
            İşletmenizin tüm dijital<br />ihtiyaçları <span className="text-gradient-primary">tek platformda!</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Dijitalleşin, verimli çalışın, dünyaya açılın. Yerelden küresele, yanınızdayız.
          </p>
        </motion.div>

        {/* Inline Contact Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-card rounded-2xl p-2.5 shadow-premium border border-border">
            <span className="text-sm text-muted-foreground font-medium px-3 whitespace-nowrap hidden sm:block">Sizi Arayalım</span>
            <Input placeholder="Adınız Soyadınız" className="h-11 rounded-xl border-0 bg-muted/50 flex-1" />
            <Input placeholder="Telefon Numaranız" className="h-11 rounded-xl border-0 bg-muted/50 flex-1" />
            <Button variant="accent" className="h-11 px-6 rounded-xl whitespace-nowrap">
              Gönder <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Dashboard Visual */}
    <section className="relative pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-2xl overflow-hidden shadow-premium border border-border/50 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent z-10 pointer-events-none" />
          <img src={heroDashboard} alt="KOBİ Dijital Platform Paneli" className="w-full h-auto object-cover" />
        </motion.div>
      </div>
    </section>
  </>
);

export default HeroSection;
