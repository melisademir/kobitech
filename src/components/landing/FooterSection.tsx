import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const FooterSection = () => (
  <footer id="contact" className="bg-secondary text-secondary-foreground py-20 mt-0">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
      className="max-w-7xl mx-auto px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Ürünlerimiz */}
        <motion.div variants={colVariants}>
          <h3 className="text-accent font-bold text-base mb-5">Ürünlerimiz</h3>

          <h4 className="font-bold text-sm mb-2">Fintek Ürünleri</h4>
          <div className="space-y-1.5 text-sm text-secondary-foreground/60 mb-5">
            <p>AiNext – Yapay Zeka Platformu</p>
            <p>SecureNEXT – MFA</p>
            <p>idNEXT – KYC</p>
            <p>White-label BNPL</p>
            <p>White-label Dijital Cüzdan</p>
            <p>AI-Chatbot (Akıllı Asistan)</p>
            <p>ParamNEXT</p>
            <p>Sadakat Programı</p>
          </div>

          <h4 className="font-bold text-sm mb-2">Ödeme & Para Transferi</h4>
          <div className="space-y-1.5 text-sm text-secondary-foreground/60 mb-5">
            <p>FAST – Para Transferi</p>
            <p>Processing</p>
            <p>Ön Ödemeli Kart Yönetimi</p>
            <p>Ödeme Geçidi – GateNext</p>
            <p>Online Tahsilat</p>
          </div>

          <h4 className="font-bold text-sm mb-2">Bulut Çözümleri</h4>
          <div className="space-y-1.5 text-sm text-secondary-foreground/60">
            <p>ParamCLOUD</p>
          </div>
        </motion.div>

        {/* Hizmetlerimiz */}
        <motion.div variants={colVariants}>
          <h3 className="text-accent font-bold text-base mb-5">Hizmetlerimiz</h3>

          <h4 className="font-bold text-sm mb-2">Kurumsal Servisler</h4>
          <div className="space-y-1.5 text-sm text-secondary-foreground/60 mb-5">
            <p>Fintech & Ödeme Sistemleri</p>
            <p>FMCG / Perakende</p>
            <p>Özel Ürünler</p>
          </div>

          <h4 className="font-bold text-sm mb-2">Yönetilen Servisler</h4>
          <div className="space-y-1.5 text-sm text-secondary-foreground/60">
            <p>Bulut ve Altyapı Hizmetleri</p>
            <p>Siber Güvenlik Operasyonları</p>
            <p>Bilgi Güvenliği</p>
            <p>DevOps ve Otomasyon</p>
            <p>Veritabanı Operasyonları</p>
            <p>Hizmet Yönetimi</p>
          </div>
        </motion.div>

        {/* Yasal Bilgiler & İletişim */}
        <motion.div variants={colVariants}>
          <h3 className="text-accent font-bold text-base mb-5">Yasal Bilgiler</h3>
          <div className="space-y-1.5 text-sm text-secondary-foreground/60 mb-8">
            <p>Çerez Politikası</p>
            <p>KVKK Politikası</p>
            <p>Bilgi Güvenliği</p>
            <p>Aydınlatma Metni</p>
          </div>

          <h3 className="text-accent font-bold text-base mb-5">Bize Ulaşın</h3>
          <div className="space-y-3 text-sm text-secondary-foreground/60">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent shrink-0" /> Davutpaşa Ofis</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent shrink-0" /> Ünalan Ofis</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent shrink-0" /> Hacettepe Ofis</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent shrink-0" /> İzmir Ofis</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent shrink-0" /> +90 850 242 65 71</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent shrink-0" /> sales@paramtech.com.tr</div>
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
        © 2026 DigitalHub. Tüm hakları saklıdır.
      </motion.div>
    </motion.div>
  </footer>
);

export default FooterSection;
