import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, TrendingUp, CheckCircle2 } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-36 lg:pb-36">
      {/* Soft ambient blobs */}
      <div className="absolute top-[20%] left-[-18%] w-[900px] h-[900px] rounded-full bg-primary/[0.04] blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-12%] w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-[180px] pointer-events-none" />

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

        {/* H1 — 800 weight, tight tracking */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6"
          style={{ fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06 }}
        >
          İşletmenizin tüm dijital
          <br />
          <span className="text-gradient-primary">ihtiyaçları tek platformda!</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-12 font-normal"
          style={{ lineHeight: "1.7" }}
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
          <div
            className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            {/* Email */}
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium text-foreground placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/25 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 2px 8px rgba(109,40,217,0.04)",
                }}
              />
            </div>

            {/* Phone */}
            <div className="relative flex-1">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon numaranız"
                className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium text-foreground placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/25 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 2px 8px rgba(109,40,217,0.04)",
                }}
              />
            </div>

            {/* CTA — Electric Violet, glow on hover */}
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px -4px rgba(124,58,237,0.7)",
                transition: { type: "spring", stiffness: 320, damping: 18 },
              }}
              whileTap={{ scale: 0.97 }}
              className="h-12 px-7 rounded-xl font-bold text-sm text-white whitespace-nowrap shrink-0 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
                boxShadow: "0 4px 20px -4px rgba(124,58,237,0.5)",
              }}
            >
              Hemen Başla <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <p className="text-xs text-slate-400 mt-3 text-center">
            <a href="#" className="underline hover:text-slate-500 transition-colors">
              KVKK Aydınlatma Metni
            </a>
            'ni kabul etmiş sayılırsınız.
          </p>
        </motion.div>

        {/* Hero visual — perspective tilt + depth */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto mt-16"
        >
          {/* Big purple blob behind — depth layer */}
          <div
            className="absolute inset-x-[8%] inset-y-[8%] rounded-full blur-[90px] pointer-events-none"
            style={{ background: "rgba(109,40,217,0.15)", zIndex: 0 }}
          />

          {/* Dashboard mockup — slight 3D tilt */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              transform: "perspective(1200px) rotateX(2.5deg)",
              border: "1px solid rgba(255,255,255,0.9)",
              outline: "1px solid hsl(252,20%,90%)",
              outlineOffset: "0",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.8) inset, 0 32px 80px -16px rgba(109,40,217,0.22)",
              zIndex: 1,
            }}
            whileHover={{
              rotateX: 0,
              scale: 1.012,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <img
              src={heroDashboard}
              alt="Platform dashboard"
              className="w-full h-auto block"
            />
          </motion.div>

          {/* Floating glass card — top left, overflow */}
          <motion.div
            className="absolute -top-5 -left-6 z-10 rounded-2xl px-4 py-3 hidden md:block"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              outline: "1px solid hsl(252,20%,90%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.8) inset, 0 8px 24px -4px rgba(109,40,217,0.14)",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" strokeWidth={1.75} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-0.5">
                  Bu ay
                </p>
                <p className="text-sm font-bold text-foreground leading-none">
                  +%34 Büyüme
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating badge — bottom right, overflow */}
          <motion.div
            className="absolute -bottom-5 -right-6 z-10 rounded-2xl px-4 py-3 hidden md:block"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              outline: "1px solid hsl(252,20%,90%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.8) inset, 0 8px 24px -4px rgba(109,40,217,0.14)",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-0.5">
                  Durum
                </p>
                <p className="text-sm font-bold text-foreground leading-none">
                  Teklif Onaylandı ✓
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
