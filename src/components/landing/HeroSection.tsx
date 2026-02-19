import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroDashboard from "@/assets/hero-dashboard.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const HeroSection = () =>
<>
    <section className="relative overflow-hidden pt-16 pb-8 lg:pt-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-block px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-8 tracking-wide">
            Türkiye'nin Dijitalleşme Platformu
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primary leading-[1.15] mb-5">
            İşletmenizin tüm dijital<br />ihtiyaçları tek platformda!
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Dijitalleşin, verimli çalışın, dünyaya açılın. Yerelden küresele, yanınızdayız.
          </p>
        </motion.div>

        {/* Inline Contact Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-[1121px] mx-auto mb-14">
          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-3xl px-8 py-6 shadow-premium" style={{ background: 'linear-gradient(90deg, rgba(2, 187, 180, 0.80) 0%, rgba(2, 187, 180, 0.80) 100%)' }}>
            <div className="flex flex-col items-start shrink-0">
              <span className="text-lg font-bold text-accent-foreground">Sizi Arayalım</span>
              <a href="#" className="text-xs text-accent-foreground/80 underline">KVKK Aydınlatma Metni</a>
            </div>
            <Input placeholder="Adınız Soyadınız" className="h-12 rounded-xl border-0 bg-background text-foreground flex-1" />
            <Input placeholder="Telefon numaranız" className="h-12 rounded-xl border-0 bg-background text-foreground flex-1" />
            <Button variant="default" className="h-12 px-8 rounded-xl whitespace-nowrap font-bold text-sm shrink-0">
              Gönder
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Dashboard Visual */}
    <section className="relative pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="rounded-2xl overflow-hidden shadow-premium border border-border/50 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent z-10 pointer-events-none" />
          <img src={heroDashboard} alt="KOBİ Dijital Platform Paneli" className="w-full h-auto object-cover" />
        </motion.div>
      </div>
    </section>
  </>;

export default HeroSection;