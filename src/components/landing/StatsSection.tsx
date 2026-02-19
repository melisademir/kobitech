import { motion } from "framer-motion";
import statsFolders from "@/assets/stats-folders.svg";
import statsChart from "@/assets/stats-chart.svg";
import statsGem from "@/assets/stats-gem.svg";
import statsPartner from "@/assets/stats-partner.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }),
};

const stats = [
  { icon: statsFolders, value: "10.000+", label: "Aktif Kobi" },
  { icon: statsChart, value: "48+", label: "Farklı Sektör" },
  { icon: statsGem, value: "50+", label: "Dijital Dönüşüm Aracı" },
  { icon: statsPartner, value: "30+", label: "Çözüm Ortağı" },
];

const StatsSection = () => (
  <section className="py-14 border-y border-border bg-card">
    <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
          className="flex flex-col items-center gap-2">
          <img src={s.icon} alt={s.label} className="w-12 h-12 mb-1" />
          <p className="text-2xl md:text-3xl font-extrabold text-foreground">{s.value}</p>
          <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsSection;
