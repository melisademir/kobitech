import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <>
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 hero-badge px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary tracking-wide">Türkiye'nin Dijitalleşme Platformu</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-extrabold leading-[1.1] tracking-tight mb-6"
        >
          <span className="text-foreground">İşletmenizin tüm</span>
          <br />
          <span className="text-gradient-primary">dijital ihtiyaçları</span>
          <br />
          <span className="text-foreground">tek platformda!</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Dijitalleşin, verimli çalışın, dünyaya açılın.
          <br className="hidden sm:block" />
          Yerelden küresele, <strong className="text-foreground font-semibold">yanınızdayız.</strong>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <Button asChild variant="default" size="lg" className="rounded-full px-8 shadow-premium hover:shadow-premium-hover transition-all gap-2">
            <Link to="/kobi/signup">
              Ücretsiz Başla <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2">
            <a href="#how">Nasıl Çalışır?</a>
          </Button>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-2xl p-1 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/20">
            <div className="flex flex-col sm:flex-row items-center gap-3 rounded-xl bg-white/95 backdrop-blur-sm px-5 py-4 shadow-card">
              <div className="flex flex-col items-start shrink-0 pr-4 border-r border-border hidden sm:flex">
                <span className="text-sm font-bold text-foreground">Sizi Arayalım</span>
                <a href="#" className="text-[10px] text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors">KVKK Aydınlatma Metni</a>
              </div>
              <Input
                placeholder="Adınız Soyadınız"
                className="h-10 rounded-lg border-0 bg-muted/50 focus:bg-white text-sm flex-1 transition-colors"
              />
              <Input
                placeholder="Telefon numaranız"
                className="h-10 rounded-lg border-0 bg-muted/50 focus:bg-white text-sm flex-1 transition-colors"
              />
              <Button variant="default" className="h-10 px-6 rounded-lg whitespace-nowrap font-semibold text-sm shrink-0 shadow-premium">
                Gönder
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Verileriniz güvende. Spam yok, istediğinizde çıkabilirsiniz.
          </p>
        </motion.div>
      </div>
    </section>
  </>
);

export default HeroSection;
