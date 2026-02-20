import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

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
    <section className="relative overflow-hidden pt-20 pb-28 lg:pt-36 lg:pb-40">

      {/* Soft purple blob — top left */}
      <div
        className="absolute top-[-12%] left-[-8%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.16) 0%, transparent 68%)" }}
      />
      {/* Gold-tinted blob — bottom right */}
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 68%)" }}
      />
      {/* Mid lavender blob */}
      <div
        className="absolute top-[30%] right-[15%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(109,40,217,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>

          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold mb-10 tracking-widest uppercase"
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
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.06] mb-6"
            style={{ letterSpacing: "-0.03em", color: "hsl(260, 40%, 10%)" }}
          >
            İşletmenizin tüm dijital
            <br />
            <span style={{
              background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 60%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              ihtiyaçları tek platformda!
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-md mx-auto mb-12 font-medium"
            style={{ fontSize: "19px", lineHeight: "1.7", color: "hsl(260, 20%, 32%)" }}
          >
            Dijitalleşin, verimli çalışın, dünyaya açılın.
            <br className="hidden md:block" />
            Yerelden küresele, yanınızdayız.
          </motion.p>

          {/* Glassmorphism Input Group — light glass */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-6">
            <div
              className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.60)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(124,58,237,0.14)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.9) inset, 0 12px 48px -8px rgba(109,40,217,0.12), 0 4px 16px rgba(0,0,0,0.04)",
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
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1.5px solid rgba(109,40,217,0.18)",
                    color: "hsl(260,40%,10%)",
                  }}
                />
              </div>

              {/* Phone */}
              <div className="relative flex-1">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7C3AED" }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon numaranız"
                  className="hero-input w-full h-12 pl-10 pr-4 rounded-xl text-sm font-semibold outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1.5px solid rgba(109,40,217,0.18)",
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
                  className="h-12 px-7 rounded-xl font-bold text-sm text-white whitespace-nowrap shrink-0 flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
                    boxShadow: "0 4px 20px -4px rgba(124,58,237,0.50)",
                  }}
                >
                  Hemen Başla <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>

            <p className="text-xs mt-3 text-center" style={{ color: "hsl(260, 20%, 50%)" }}>
              <a href="#" className="underline hover:opacity-70 transition-opacity">KVKK Aydınlatma Metni</a>'ni kabul etmiş sayılırsınız.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
