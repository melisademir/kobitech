import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const LandingNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-md bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Param<span className="text-accent">TECH</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Anasayfa", "Çözümler", "Nasıl Çalışır?", "İletişim"].map((item, i) => (
            <motion.a
              key={item}
              href={["#", "#solutions", "#how", "#contact"][i]}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <Link to="/kobi/signup" className="text-sm font-semibold text-white/90 hover:text-white transition-colors hidden sm:block">
            Kayıt Ol
          </Link>
          <Button asChild variant="accent" size="sm" className="rounded-full px-6">
            <Link to="/kobi/login">Giriş Yap</Link>
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default LandingNav;
