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
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-36 lg:pb-36">
      {/* Warm wood-toned mesh gradient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,150,60,0.22) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(160,114,42,0.16) 0%, transparent 70%)" }} />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,220,140,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }} />

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}>

          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold mb-10 tracking-widest uppercase"
              style={{
                background: "rgba(201,150,60,0.18)",
                border: "1px solid rgba(201,150,60,0.38)",
                color: "#F5C842"
              }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#F5C842" }} />
              Türkiye'nin Dijitalleşme Platformu
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.06] mb-6 text-white"
            style={{ letterSpacing: "-0.03em" }}>
            İşletmenizin tüm dijital
            <br />
            <span className="text-gradient-gold">
              ihtiyaçları tek platformda!
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base max-w-md mx-auto mb-12 font-normal"
            style={{ lineHeight: "1.7", color: "rgba(245,200,130,0.65)" }}>
            Dijitalleşin, verimli çalışın, dünyaya açılın.
            <br className="hidden md:block" />
            Yerelden küresele, yanınızdayız.
          </motion.p>

          {/* Glassmorphism Input Group */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-6">
            <div
              className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl"
              style={{
                background: "rgba(255,240,200,0.05)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(201,150,60,0.18)",
                boxShadow: "0 0 0 1px rgba(201,150,60,0.10) inset, 0 10px 40px rgba(0,0,0,0.25)"
              }}>

              {/* Email */}
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(245,200,130,0.45)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,240,200,0.07)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(201,150,60,0.16)",
                    color: "white"
                  }} />
              </div>

              {/* Phone */}
              <div className="relative flex-1">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(245,200,130,0.45)" }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon numaranız"
                  className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,240,200,0.07)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(201,150,60,0.16)",
                    color: "white"
                  }} />
              </div>

              {/* CTA */}
              <Link to="/kobi/step-1">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 40px -4px rgba(201,150,60,0.80)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="h-12 px-7 rounded-xl font-bold text-sm whitespace-nowrap shrink-0 flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #A0722A, #C9963C)",
                    color: "#FFF8E7",
                    boxShadow: "0 4px 20px -4px rgba(201,150,60,0.65)"
                  }}>
                  Hemen Başla <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>

            <p className="text-xs mt-3 text-center" style={{ color: "rgba(245,200,130,0.30)" }}>
              <a href="#" className="underline hover:opacity-70 transition-opacity">KVKK Aydınlatma Metni</a>'ni kabul etmiş sayılırsınız.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
