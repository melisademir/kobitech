import { motion } from "framer-motion";
import {
  CreditCard, ShoppingCart, Calculator, Truck, Building2, Users,
  Globe, Briefcase, Landmark, Shield
} from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const partnerIcons = [
  CreditCard, ShoppingCart, Calculator, Truck, Building2,
  Users, Globe, Briefcase, Landmark, Shield,
];

const PartnersSection = () => (
  <section id="solutions" className="py-20 bg-card">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4 tracking-wide uppercase">Ekosistem</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Globalleşirken Yalnız Değilsin</h2>
      </motion.div>

      {/* Partner Icons Row */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="flex flex-wrap justify-center gap-4 mb-14">
        {partnerIcons.map((Icon, i) => (
          <div key={i} className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow">
            <Icon className="h-5 w-5 text-accent" />
          </div>
        ))}
      </motion.div>

      {/* Featured Partner Card */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="max-w-5xl mx-auto bg-background rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
            <div className="flex-1">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Öne Çıkan Çözüm</p>
              <h3 className="text-xl font-bold text-foreground mb-3">Finans & Ödeme Çözümleri</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                İşletmenizin finansal süreçlerini uçtan uca dijitalleştirin.
                POS, online ödeme, fatura yönetimi ve finansman desteği ile
                operasyonlarınızı hızlandırın.
              </p>
              <button className="text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1">
                Keşfet →
              </button>
            </div>
            <div className="flex-1 max-w-sm">
              <div className="rounded-xl overflow-hidden border border-border shadow-card">
                <img src={heroDashboard} alt="Çözüm Görseli" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PartnersSection;
