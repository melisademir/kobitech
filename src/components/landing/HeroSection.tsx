import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => (
  <>
    <section className="relative overflow-hidden pt-16 pb-8 lg:pt-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-5 py-2 rounded-full bg-white/20 text-white text-xs font-semibold mb-8 tracking-wide backdrop-blur-sm"
          >
            Türkiye'nin Dijitalleşme Platformu
          </motion.span>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.15] mb-5">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              İşletmenizin tüm dijital
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              ihtiyaçları tek platformda!
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10"
          >
            Dijitalleşin, verimli çalışın, dünyaya açılın. Yerelden küresele, yanınızdayız.
          </motion.p>
        </motion.div>

        {/* Inline Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1121px] mx-auto mb-14"
        >
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

    {/* Hero Illustration */}
    <section className="relative pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden relative shadow-[0_20px_60px_-15px_hsl(268,72%,38%/0.25),0_8px_24px_-8px_hsl(260,20%,10%/0.12)] border border-border/50"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none z-10" />
          <img src={heroIllustration} alt="KOBİ Dijital Platform" className="w-full h-auto object-cover" />
        </motion.div>
      </div>
    </section>
  </>
);

export default HeroSection;
