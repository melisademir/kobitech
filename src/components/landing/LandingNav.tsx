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
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(253,251,247,0.72)"
          : "rgba(10,4,24,0.40)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.12)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 4px 24px -4px rgba(109,40,217,0.10)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/homepage" className="flex items-center">
          <span
            className="text-2xl font-extrabold tracking-tight transition-colors duration-500"
            style={{ color: scrolled ? "hsl(260, 30%, 12%)" : "#FFFFFF" }}
          >
            Digital<span style={{ color: scrolled ? "#7C3AED" : "#C4B5FD" }}>Hub</span>
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
                    ? (isActive ? "#6D28D9" : "hsl(260, 15%, 44%)")
                    : (isActive ? "#E9D5FF" : "rgba(243,232,255,0.7)"),
                  borderBottom: isActive ? "2px solid currentColor" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = scrolled ? "#6D28D9" : "#E9D5FF")}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled
                  ? (isActive ? "#6D28D9" : "hsl(260, 15%, 44%)")
                  : (isActive ? "#E9D5FF" : "rgba(243,232,255,0.7)")
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
            style={{ color: scrolled ? "hsl(260, 15%, 44%)" : "rgba(243,232,255,0.8)" }}
            onMouseEnter={e => (e.currentTarget.style.color = scrolled ? "#6D28D9" : "#E9D5FF")}
            onMouseLeave={e => (e.currentTarget.style.color = scrolled ? "hsl(260, 15%, 44%)" : "rgba(243,232,255,0.8)")}
          >
            Kayıt Ol
          </Link>
          <Link to="/digitalhub/login">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 6px 24px -4px rgba(124,58,237,0.40)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="h-9 px-5 rounded-full text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
                boxShadow: "0 4px 16px -4px rgba(124,58,237,0.35)",
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
