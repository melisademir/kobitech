import { motion } from "framer-motion";
import { Building2, MapPin, Handshake, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }),
};

const stats = [
  { icon: Building2, value: "10.000+", label: "Aktif KOBİ" },
  { icon: MapPin, value: "48+", label: "Farklı Sektör" },
  { icon: Handshake, value: "50+", label: "Çözüm Ortağı" },
  { icon: Users, value: "30+", label: "Çözüm Ürünü" },
];

const StatsSection = () => (
  <section className="py-14 border-y border-border bg-card">
    <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
          className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-1">
            <s.icon className="h-6 w-6 text-accent" />
          </div>
          <p className="text-2xl md:text-3xl font-extrabold text-foreground">{s.value}</p>
          <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsSection;
