import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration-new.png";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } }
};

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="relative overflow-hidden pt-16 pb-0 lg:pt-24">

      {/* Soft purple blob — top left */}
      <div
        className="absolute top-[-12%] left-[-8%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.13) 0%, transparent 68%)" }}
      />
      {/* Gold blob — bottom right */}
      <div
        className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 68%)" }}
      />
      {/* Mid lavender blob */}
      <div
        className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)" }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(109,40,217,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT — Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left pt-8 pb-8 lg:py-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold mb-8 tracking-widest uppercase"
                style={{
                  background: "rgba(109,40,217,0.10)",
                  border: "1.5px solid rgba(109,40,217,0.25)",
                  color: "#5B21B6",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#7C3AED" }} />
                Türkiye'nin Dijitalleşme Platformu
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] mb-5"
              style={{ letterSpacing: "-0.03em", color: "hsl(260, 40%, 10%)" }}
            >
              İşletmenizin tüm
              <br />
              dijital ihtiyaçları
              <br />
              <span style={{
                background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 60%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                tek platformda!
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="max-w-md mx-auto lg:mx-0 mb-10 font-medium"
              style={{ fontSize: "18px", lineHeight: "1.75", color: "hsl(260, 20%, 34%)" }}
            >
              Dijitalleşin, verimli çalışın, dünyaya açılın.
              <br />
              Yerelden küresele, yanınızdayız.
            </motion.p>

            {/* Glassmorphism Input Group */}
            <motion.div variants={itemVariants} className="max-w-xl mx-auto lg:mx-0">
              <div
                className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1.5px solid rgba(109,40,217,0.15)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.9) inset, 0 12px 48px -8px rgba(109,40,217,0.14), 0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                {/* Email */}
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7C3AED" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresiniz"
                    className="hero-input w-full h-12 pl-10 pr-4 rounded-xl text-sm font-semibold outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      border: "1.5px solid rgba(109,40,217,0.16)",
                      color: "hsl(260,40%,10%)",
                    }}
                  />
                </div>

                {/* CTA */}
                <Link to="/kobi/step-1">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 40px -4px rgba(124,58,237,0.55)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="h-12 px-7 rounded-xl font-bold text-sm text-white whitespace-nowrap shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center"
                    style={{
                      background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
                      boxShadow: "0 4px 20px -4px rgba(124,58,237,0.50)",
                    }}
                  >
                    Hemen Başla <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>

              <p className="text-xs mt-3 text-center lg:text-left" style={{ color: "hsl(260, 20%, 52%)" }}>
                <a href="#" className="underline hover:opacity-70 transition-opacity">KVKK Aydınlatma Metni</a>'ni kabul etmiş sayılırsınız.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Illustration */}
          <motion.div
            className="flex-1 relative w-full lg:max-w-[580px] self-end"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 80%, rgba(109,40,217,0.18) 0%, transparent 65%)",
                transform: "scale(1.15)",
              }}
            />
            {/* Floating card badge */}
            <motion.div
              className="absolute top-8 left-4 lg:-left-6 z-10 rounded-2xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(109,40,217,0.15)",
                boxShadow: "0 8px 32px -8px rgba(109,40,217,0.20)",
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#7C3AED" }}>Aktif KOBİ</p>
              <p className="text-xl font-black" style={{ color: "hsl(260,40%,10%)" }}>10.000+</p>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              className="absolute bottom-16 right-4 lg:-right-4 z-10 rounded-2xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(212,175,55,0.25)",
                boxShadow: "0 8px 32px -8px rgba(212,175,55,0.25)",
              }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#D4AF37" }}>Dijital Çözüm</p>
              <p className="text-xl font-black" style={{ color: "hsl(260,40%,10%)" }}>50+</p>
            </motion.div>

            <img
              src={heroIllustration}
              alt="Dijital platform illüstrasyonu"
              className="w-full h-auto object-contain relative z-[1]"
              style={{ 
                filter: "drop-shadow(0 32px 64px rgba(109,40,217,0.18))",
                borderRadius: "16px 16px 0 0",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
