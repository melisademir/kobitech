import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-36 lg:pb-28">
      {/* Ambient glow blobs — wide, very soft */}
      <div className="absolute top-1/4 left-[-15%] w-[900px] h-[900px] rounded-full bg-primary/[0.05] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-10 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Türkiye'nin Dijitalleşme Platformu
          </span>
        </motion.div>

        {/* H1 — aggressive 800 weight, tight tracking */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.08] mb-6"
          style={{ fontWeight: 800, letterSpacing: "-0.03em" }}>
          İşletmenizin tüm dijital
          <br />
          <span className="text-gradient-primary">ihtiyaçları tek platformda!</span>
        </motion.h1>

        {/* Sub-headline — small, muted, spacious line-height */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-12 font-normal"
          style={{ lineHeight: "1.6", opacity: 0.7 }}>
          Dijitalleşin, verimli çalışın, dünyaya açılın.
          <br className="hidden md:block" />
          Yerelden küresele, yanınızdayız.
        </motion.p>

        {/* Glassmorphism Input Group — no outer border, just shadow + blur */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto mb-6">

          <div
            className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}>

            {/* Email input */}
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 2px 12px rgba(109,40,217,0.04)"
                }} />
            </div>

            {/* Phone input */}
            <div className="relative flex-1">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon numaranız"
                className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 2px 12px rgba(109,40,217,0.04)"
                }} />
            </div>

            {/* CTA — deep Electric Violet, glow on hover */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-12 px-7 rounded-xl font-bold text-sm text-white whitespace-nowrap shrink-0 flex items-center gap-2 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
                boxShadow: "0 4px 20px -4px rgba(124,58,237,0.5)"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px -4px rgba(124,58,237,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px -4px rgba(124,58,237,0.5)";
              }}>
              Hemen Başla <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <p className="text-xs text-muted-foreground/40 mt-3 text-center">
            <a href="#" className="underline hover:text-muted-foreground/60 transition-colors">KVKK Aydınlatma Metni</a>'ni kabul etmiş sayılırsınız.
          </p>
        </motion.div>

        {/* Hero visual with perspective tilt + purple blob behind */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto mt-14">

          {/* Big purple blob behind — z-index layering */}
          <div
            className="absolute inset-x-[10%] inset-y-[5%] rounded-full blur-[80px] pointer-events-none"
            style={{ background: "rgba(109,40,217,0.18)", zIndex: 0 }}
          />

          {/* Floating glass card — top left */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-4 z-20 hidden md:block"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px -8px rgba(109,40,217,0.18)",
              padding: "14px 18px",
              minWidth: "160px",
            }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg,#6D28D9,#7C3AED)" }}>
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-foreground" style={{ letterSpacing: "-0.01em" }}>Teklif Onaylandı</p>
                <p className="text-[10px] text-muted-foreground">az önce</p>
              </div>
            </div>
          </motion.div>

          {/* Floating stats card — bottom right */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -right-4 z-20 hidden md:block"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px -8px rgba(109,40,217,0.18)",
              padding: "14px 20px",
            }}>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Bu Ay</p>
            <p className="text-2xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>+2.4K</p>
            <p className="text-xs text-primary font-semibold mt-0.5">↑ %18 büyüme</p>
          </motion.div>

          {/* Dashboard mockup placeholder — perspective tilt */}
          <div
            className="relative z-10 w-full rounded-3xl overflow-hidden border border-white/30"
            style={{
              transform: "perspective(1000px) rotateX(2deg)",
              boxShadow: "0 32px 80px -16px rgba(109,40,217,0.25), 0 8px 32px -8px rgba(0,0,0,0.08)",
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              minHeight: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {/* Mock UI inside */}
            <div className="w-full p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[{ label: "Aktif Çözümler", val: "12" }, { label: "Teklifler", val: "4" }, { label: "Tasarruf", val: "₺8.2K" }].map(item => (
                  <div key={item.label} className="rounded-2xl p-4 border border-white/40" style={{ background: "rgba(109,40,217,0.05)" }}>
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>{item.val}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl h-24 border border-white/40 flex items-end gap-1.5 px-4 pb-4" style={{ background: "rgba(109,40,217,0.03)" }}>
                {[30, 50, 40, 70, 55, 80, 65, 90, 75, 100, 85, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-full" style={{ height: `${h}%`, background: `rgba(109,40,217,${0.15 + (h / 100) * 0.35})` }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
