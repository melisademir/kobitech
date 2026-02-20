import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const LandingNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-premium">
            <span className="text-white font-black text-sm">P</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-primary">Param</span><span className="text-accent">TECH</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {["Anasayfa", "Çözümler", "Nasıl Çalışır?", "İletişim"].map((item, i) => (
            <motion.a
              key={item}
              href={["#", "#solutions", "#how", "#contact"][i]}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <Link
            to="/kobi/signup"
            className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors hidden sm:block"
          >
            Kayıt Ol
          </Link>
          <Button asChild variant="default" size="sm" className="rounded-full px-5 shadow-premium hover:shadow-premium-hover transition-shadow">
            <Link to="/kobi/login">Giriş Yap</Link>
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default LandingNav;
