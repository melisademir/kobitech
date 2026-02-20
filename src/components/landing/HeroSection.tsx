import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-36 lg:pb-24">
      {/* Ambient glow blobs — mor odaklı */}
      <div className="absolute top-1/4 left-[-10%] w-[700px] h-[700px] rounded-full bg-primary/[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-10 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Türkiye'nin Dijitalleşme Platformu
          </span>
        </motion.div>

        {/* H1 — agresif, 800 weight, tight tracking */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.08] mb-6 tracking-[-0.03em]"
          style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          İşletmenizin tüm dijital
          <br />
          <span className="text-gradient-primary">ihtiyaçları tek platformda!</span>
        </motion.h1>

        {/* Sub-headline — belirgin muted, daha küçük, geniş satır aralığı */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-14 font-normal"
          style={{ lineHeight: "1.75" }}
        >
          Dijitalleşin, verimli çalışın, dünyaya açılın.
          <br className="hidden md:block" />
          Yerelden küresele, yanınızdayız.
        </motion.p>

        {/* Glassmorphism Input Group */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border border-white/20"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px -8px rgba(109,40,217,0.15), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
          >
            {/* Email input */}
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 2px 12px rgba(109,40,217,0.06)",
                }}
              />
            </div>

            {/* Phone input */}
            <div className="relative flex-1">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Telefon numaranız"
                className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 2px 12px rgba(109,40,217,0.06)",
                }}
              />
            </div>

            {/* CTA Button — derin mor, hover glow */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-12 px-7 rounded-xl font-bold text-sm text-white whitespace-nowrap shrink-0 flex items-center gap-2 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
                boxShadow: "0 4px 20px -4px rgba(109,40,217,0.5)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px -4px rgba(109,40,217,0.7)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px -4px rgba(109,40,217,0.5)";
              }}
            >
              Hemen Başla <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <p className="text-xs text-muted-foreground/50 mt-3 text-center">
            <a href="#" className="underline hover:text-muted-foreground transition-colors">KVKK Aydınlatma Metni</a>'ni kabul etmiş sayılırsınız.
          </p>
        </motion.div>

        {/* Hero illustration with glow + floating card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto mt-10"
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-3xl scale-95 translate-y-4" />

          <img
            src={heroIllustration}
            alt="Dashboard"
            className="relative w-full rounded-3xl border border-white/20"
            style={{
              boxShadow: "0 32px 80px -12px rgba(109,40,217,0.30), 0 0 0 1px rgba(255,255,255,0.12)",
            }}
          />

          {/* Floating glass card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 left-6 md:left-10"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 8px 32px -4px rgba(109,40,217,0.18)",
              borderRadius: "16px",
              padding: "14px 20px",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.15), rgba(109,40,217,0.05))" }}>
                ✅
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Dijitalleşme Tamamlandı!</p>
                <p className="text-[11px] text-muted-foreground">+%34 verimlilik artışı</p>
              </div>
            </div>
          </motion.div>

          {/* Floating stats card */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-4 right-6 md:right-10"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 8px 32px -4px rgba(109,40,217,0.18)",
              borderRadius: "16px",
              padding: "12px 18px",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📈</span>
              <div>
                <p className="text-xs font-bold text-foreground">10.000+ KOBİ</p>
                <p className="text-[11px] text-muted-foreground">Platformumuza güveniyor</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
