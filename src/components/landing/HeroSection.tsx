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
    <section className="relative overflow-hidden" style={{ minHeight: "88vh" }}>

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroIllustration}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "left center" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Organic vignette overlay — no box, just a soft radial dark gradient ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 80% at 55% 45%, rgba(15,7,32,0.62) 0%, rgba(15,7,32,0.44) 35%, rgba(15,7,32,0.18) 60%, transparent 85%)",
            "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(8,4,20,0.55) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 100% at 0% 50%, rgba(8,4,20,0.35) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-[2] flex flex-col items-center justify-center text-center"
        style={{ minHeight: "88vh", paddingTop: "6rem", paddingBottom: "6rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
      >
        <motion.div
          className="w-full max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold mb-7 tracking-widest uppercase"
              style={{
                background: "rgba(167,139,250,0.15)",
                border: "1.5px solid rgba(167,139,250,0.35)",
                color: "#DDD6FE",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#A78BFA" }} />
              Türkiye'nin Dijitalleşme Platformu
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] mb-5"
            style={{ letterSpacing: "-0.03em", color: "#F5F0FF" }}
          >
            İşletmenizin tüm dijital
            <br />
            <span style={{
              background: "linear-gradient(135deg, #C4B5FD 0%, #A78BFA 55%, #DDD6FE 100%)",
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
            className="max-w-lg mx-auto font-medium mb-8"
            style={{ fontSize: "19px", lineHeight: "1.75", color: "rgba(221,214,254,0.80)" }}
          >
            Dijitalleşin, verimli çalışın, dünyaya açılın.
            <br />
            Yerelden küresele, yanınızdayız.
          </motion.p>

          {/* Input row */}
          <motion.div variants={itemVariants}>
            <div
              className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl"
              style={{
                background: "rgba(15,7,32,0.55)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(167,139,250,0.22)",
                boxShadow: "0 8px 40px -8px rgba(109,40,217,0.30)",
              }}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#A78BFA" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="hero-input w-full h-12 pl-10 pr-4 rounded-xl text-sm font-semibold outline-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(167,139,250,0.20)",
                    color: "#F5F0FF",
                  }}
                />
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#A78BFA" }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon numaranız"
                  className="hero-input w-full h-12 pl-10 pr-4 rounded-xl text-sm font-semibold outline-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(167,139,250,0.20)",
                    color: "#F5F0FF",
                  }}
                />
              </div>
              <Link to="/kobi/step-1">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 40px -4px rgba(167,139,250,0.60)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="h-12 px-7 rounded-xl font-bold text-sm text-white whitespace-nowrap shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center"
                  style={{
                    background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
                    boxShadow: "0 4px 20px -4px rgba(124,58,237,0.55)",
                  }}
                >
                  Hemen Başla <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
            <p className="text-xs mt-3" style={{ color: "rgba(196,181,253,0.55)" }}>
              <a href="#" className="underline hover:opacity-70 transition-opacity">KVKK Aydınlatma Metni</a>'ni kabul etmiş sayılırsınız.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
