import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const FooterSection = () => (
  <footer id="contact" className="bg-secondary text-secondary-foreground py-14 mt-20">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
      className="max-w-7xl mx-auto px-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <motion.div variants={colVariants} className="col-span-2 md:col-span-1">
          <span className="text-lg font-extrabold tracking-tight">
            Param<span className="text-accent">TECH</span>
          </span>
          <p className="text-sm text-secondary-foreground/60 mt-3">
            KOBİ'lerin dijital dönüşüm platformu.
          </p>
        </motion.div>
        <motion.div variants={colVariants}>
          <h4 className="font-bold text-sm mb-4">Ürünler</h4>
          <div className="space-y-2.5 text-sm text-secondary-foreground/60">
            <p className="hover:text-accent cursor-pointer transition-colors">Ödeme Çözümleri</p>
            <p className="hover:text-accent cursor-pointer transition-colors">E-Ticaret</p>
            <p className="hover:text-accent cursor-pointer transition-colors">Muhasebe</p>
            <p className="hover:text-accent cursor-pointer transition-colors">ERP Yazılımı</p>
            <p className="hover:text-accent cursor-pointer transition-colors">Lojistik</p>
          </div>
        </motion.div>
        <motion.div variants={colVariants}>
          <h4 className="font-bold text-sm mb-4">Hızlı Linkler</h4>
          <div className="space-y-2.5 text-sm text-secondary-foreground/60">
            <Link to="/kobi/signup" className="block hover:text-accent transition-colors">KOBİ Kaydı</Link>
            <Link to="/login" className="block hover:text-accent transition-colors">Bayi Girişi</Link>
            <a href="#how" className="block hover:text-accent transition-colors">Nasıl Çalışır?</a>
            <a href="#solutions" className="block hover:text-accent transition-colors">Çözümler</a>
          </div>
        </motion.div>
        <motion.div variants={colVariants}>
          <h4 className="font-bold text-sm mb-4">İletişim</h4>
          <div className="space-y-2.5 text-sm text-secondary-foreground/60">
            <p>info@paramtech.com.tr</p>
            <p>+90 212 XXX XX XX</p>
            <p>İstanbul, Türkiye</p>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="border-t border-secondary-foreground/10 mt-10 pt-8 text-center text-xs text-secondary-foreground/40 origin-left"
      >
        © 2026 ParamTech. Tüm hakları saklıdır.
      </motion.div>
    </motion.div>
  </footer>
);

export default FooterSection;
