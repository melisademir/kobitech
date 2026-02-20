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

      {/* ── Full background illustration — fully visible ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroIllustration}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "left center" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Content centered on top ── */}
      <div
        className="relative z-[1] flex flex-col items-center justify-center text-center"
        style={{ minHeight: "88vh", paddingTop: "6rem", paddingBottom: "6rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
      >
        <motion.div
          className="w-full max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Glass card wrapping just the title area */}
          <motion.div
            variants={itemVariants}
            className="relative px-8 py-10 md:px-14 md:py-14 mb-6"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(253,251,247,0.72) 30%, rgba(253,251,247,0.45) 60%, rgba(253,251,247,0) 100%)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              WebkitMaskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 35%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 35%, transparent 100%)",
            }}
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold mb-7 tracking-widest uppercase"
              style={{
                background: "rgba(109,40,217,0.10)",
                border: "1.5px solid rgba(109,40,217,0.25)",
                color: "#5B21B6",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#7C3AED" }} />
              Türkiye'nin Dijitalleşme Platformu
            </span>

            {/* H1 */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] mb-5"
              style={{ letterSpacing: "-0.03em", color: "hsl(260, 45%, 9%)" }}
            >
              İşletmenizin tüm dijital
              <br />
              <span style={{
                background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 55%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                ihtiyaçları tek platformda!
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="max-w-lg mx-auto font-medium"
              style={{ fontSize: "19px", lineHeight: "1.75", color: "hsl(260, 25%, 30%)" }}
            >
              Dijitalleşin, verimli çalışın, dünyaya açılın.
              <br />
              Yerelden küresele, yanınızdayız.
            </p>
          </motion.div>

          {/* Input row — separate glass card below */}
          <motion.div variants={itemVariants}>
            <div
              className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.60)",
                boxShadow: "0 8px 40px -8px rgba(109,40,217,0.12), 0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7C3AED" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="hero-input w-full h-12 pl-10 pr-4 rounded-xl text-sm font-semibold outline-none"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1.5px solid rgba(109,40,217,0.14)",
                    color: "hsl(260,40%,10%)",
                  }}
                />
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7C3AED" }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon numaranız"
                  className="hero-input w-full h-12 pl-10 pr-4 rounded-xl text-sm font-semibold outline-none"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1.5px solid rgba(109,40,217,0.14)",
                    color: "hsl(260,40%,10%)",
                  }}
                />
              </div>
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
            <p className="text-xs mt-3" style={{ color: "hsl(260, 20%, 48%)" }}>
              <a href="#" className="underline hover:opacity-70 transition-opacity">KVKK Aydınlatma Metni</a>'ni kabul etmiş sayılırsınız.
            </p>
          </motion.div>

          {/* Stat badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { label: "Aktif KOBİ", value: "5.000+" },
              { label: "Dijital Çözüm", value: "50+" },
              { label: "Farklı Sektör", value: "20+" },
              { label: "Çözüm Ortağı", value: "30+" },
            ].map((s) => (
              <div
                key={s.label}
                className="px-5 py-2.5 rounded-2xl flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.68)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(109,40,217,0.13)",
                  boxShadow: "0 4px 16px -4px rgba(109,40,217,0.10)",
                }}
              >
                <span className="text-xl font-black" style={{ color: "#6D28D9" }}>{s.value}</span>
                <span className="text-xs font-semibold" style={{ color: "hsl(260,20%,40%)" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
