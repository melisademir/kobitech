import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () =>
<>
    <section className="relative overflow-hidden pt-20 pb-10 lg:pt-32 lg:pb-16">
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.05] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

          <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-8 tracking-wide">
            Türkiye'nin Dijitalleşme Platformu
          </motion.span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[1.1] mb-6 tracking-tight">
            <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block">
              İşletmenizin tüm dijital
            </motion.span>
            <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block">
              ihtiyaçları tek platformda!
            </motion.span>
          </h1>

          <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-normal">
            Dijitalleşin, verimli çalışın, dünyaya açılın.<br className="hidden md:block" /> Yerelden küresele, yanınızdayız.
          </motion.p>
        </motion.div>

        {/* Inline Contact Form */}
        <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[900px] mx-auto mb-16">
          <div className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl px-6 py-5 shadow-premium border border-white/20" style={{ background: 'linear-gradient(90deg, rgba(2, 187, 180, 0.82) 0%, rgba(2, 187, 180, 0.82) 100%)' }}>
            <div className="flex flex-col items-start shrink-0">
              <span className="text-base font-bold text-accent-foreground">Sizi Arayalım</span>
              <a href="#" className="text-xs text-accent-foreground/70 underline">KVKK Aydınlatma Metni</a>
            </div>
            <Input placeholder="Adınız Soyadınız" className="h-11 rounded-xl border-0 bg-background text-foreground flex-1" />
            <Input placeholder="Telefon numaranız" className="h-11 rounded-xl border-0 bg-background text-foreground flex-1" />
            <Button variant="default" className="h-11 px-7 rounded-xl whitespace-nowrap font-bold text-sm shrink-0">
              Gönder
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </>;


export default HeroSection;
