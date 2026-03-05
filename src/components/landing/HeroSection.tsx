import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ButtonColorful } from "@/components/ui/button-colorful";
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
  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "88vh" }}>

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroIllustration}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "left top" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Radial gradient overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 80% 90% at 50% 45%, rgba(10,15,30,0.72) 0%, rgba(10,15,30,0.55) 30%, rgba(10,15,30,0.30) 55%, rgba(10,15,30,0.12) 75%, transparent 90%)",
            "radial-gradient(ellipse 100% 50% at 50% 100%, rgba(10,15,30,0.60) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 100% at 0% 50%, rgba(10,15,30,0.40) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 100% at 100% 50%, rgba(10,15,30,0.28) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-[2] flex flex-col items-center justify-center text-center"
        style={{ minHeight: "88vh", paddingTop: "5rem", paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
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
                background: "rgba(0,212,170,0.12)",
                border: "1.5px solid rgba(0,212,170,0.30)",
                color: "#00D4AA",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00D4AA" }} />
              Türkiye'nin Dijitalleşme Platformu
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] mb-6"
            style={{ letterSpacing: "-0.05em", lineHeight: 0.98, color: "#FFFFFF", textShadow: "0 4px 32px rgba(0,0,0,0.55)", fontWeight: 900 }}
          >
            İşletmenizin tüm dijital
            <br />
            <span className="text-gradient-primary">
              ihtiyaçları tek platformda!
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-lg mx-auto font-medium mb-8"
            style={{ fontSize: "clamp(16px, 1.2vw, 20px)", lineHeight: "1.85", color: "#94A3B8", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            Dijitalleşin, verimli çalışın, dünyaya açılın.
            <br />
            Yerelden küresele, yanınızdayız.
          </motion.p>

          {/* Input row */}
          <motion.div variants={itemVariants}>
            <div
              className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-xl"
              style={{
                background: "rgba(10,15,30,0.60)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 8px 40px -8px rgba(0,0,0,0.30)",
              }}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="hero-input w-full h-10 pl-10 pr-4 rounded-lg text-xs font-semibold outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#FFFFFF",
                  }}
                />
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon numaranız"
                  className="hero-input w-full h-10 pl-10 pr-4 rounded-lg text-xs font-semibold outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#FFFFFF",
                  }}
                />
              </div>
              <Link to="/digitalhub/onboarding1" className="flex-shrink-0">
                <ButtonColorful label="Hemen Başla" className="w-full sm:w-auto min-w-[170px]" />
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-3" style={{ color: "#94A3B8" }}>
              <Checkbox
                id="kvkk-hero"
                checked={kvkkAccepted}
                onCheckedChange={(checked) => setKvkkAccepted(checked === true)}
                className="border-slate-500/40 data-[state=checked]:bg-[#4A1DB5] data-[state=checked]:border-[#4A1DB5] h-4 w-4 rounded-[3px]"
              />
              <label htmlFor="kvkk-hero" className="text-xs cursor-pointer">
                <a href="#" className="underline hover:opacity-70 transition-opacity">KVKK Aydınlatma Metni</a>'ni kabul ediyorum.
              </label>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
