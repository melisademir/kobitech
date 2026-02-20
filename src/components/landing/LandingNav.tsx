import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(20, 12, 5, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,150,60,0.15)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Param<span style={{ color: "#C9963C" }}>TECH</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Anasayfa", "Çözümler", "Nasıl Çalışır?", "İletişim"].map((item, i) => (
            <motion.a
              key={item}
              href={["#", "#solutions", "#how", "#contact"][i]}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              className="text-sm font-medium transition-colors"
              style={{ color: "rgba(245,200,130,0.70)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F5C842")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,200,130,0.70)")}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <Link
            to="/kobi/signup"
            className="text-sm font-semibold hidden sm:block transition-colors"
            style={{ color: "rgba(245,200,130,0.70)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#F5C842")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,200,130,0.70)")}
          >
            Kayıt Ol
          </Link>
          <Link to="/kobi/login">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 6px 28px -4px rgba(201,150,60,0.70)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="h-9 px-5 rounded-full text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #A0722A, #C9963C)",
                color: "#FFF8E7",
                boxShadow: "0 4px 16px -4px rgba(201,150,60,0.55)",
              }}
            >
              Giriş Yap
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default LandingNav;
