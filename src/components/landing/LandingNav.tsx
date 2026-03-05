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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(245,245,247,0.85)"
          : "rgba(26,10,74,0.40)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: scrolled ? "1px solid #E2E8F0" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 4px 24px -4px rgba(26,10,74,0.08)" : "none",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/homepage" className="flex items-center">
          <span
            className="text-2xl font-extrabold tracking-tight transition-colors duration-500"
            style={{ color: scrolled ? "#1A0A4A" : "#FFFFFF" }}
          >
            Digital<span style={{ color: "#4A1DB5" }}>Hub</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Anasayfa", "Çözümler", "Nasıl Çalışır?", "İletişim"].map((item, i) => {
            const hrefs = ["#", "#solutions", "#how", "#contact"];
            const isActive = i === 0;
            return (
              <motion.a
                key={item}
                href={hrefs[i]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                className="text-sm font-medium transition-colors"
                style={{
                  color: scrolled
                    ? (isActive ? "#4A1DB5" : "#64748B")
                    : (isActive ? "#FFFFFF" : "#94A3B8"),
                  borderBottom: isActive ? "2px solid currentColor" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = scrolled ? "#4A1DB5" : "#FFFFFF")}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled
                  ? (isActive ? "#4A1DB5" : "#64748B")
                  : (isActive ? "#FFFFFF" : "#94A3B8")
                )}
              >
                {item}
              </motion.a>
            );
          })}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <Link
            to="/digitalhub/signup"
            className="text-sm font-semibold hidden sm:block transition-colors duration-500"
            style={{ color: scrolled ? "#64748B" : "#94A3B8" }}
            onMouseEnter={e => (e.currentTarget.style.color = scrolled ? "#4A1DB5" : "#FFFFFF")}
            onMouseLeave={e => (e.currentTarget.style.color = scrolled ? "#64748B" : "#94A3B8")}
          >
            Kayıt Ol
          </Link>
          <Link to="/digitalhub/login">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 6px 24px -4px rgba(74,29,181,0.40)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="h-9 px-5 rounded-lg text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(90deg, #4A1DB5, #00D4AA)",
                boxShadow: "0 4px 16px -4px rgba(74,29,181,0.35)",
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
