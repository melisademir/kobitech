import { motion } from "framer-motion";
import statsFolders from "@/assets/stats-folders.svg";
import statsChart from "@/assets/stats-chart.svg";
import statsGem from "@/assets/stats-gem.svg";
import statsPartner from "@/assets/stats-partner.svg";

const stats = [
  { icon: statsFolders, value: "10.000+", label: "Aktif Kobi" },
  { icon: statsChart, value: "48+", label: "Farklı Sektör" },
  { icon: statsGem, value: "50+", label: "Dijital Dönüşüm Aracı" },
  { icon: statsPartner, value: "30+", label: "Çözüm Ortağı" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const StatsSection = () => (
  <section className="py-14 border-y border-border bg-gradient-to-r from-primary/[0.03] via-card to-accent/[0.03]">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
    >
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="flex flex-col items-center gap-2 group glass-card rounded-2xl py-6 px-4"
        >
          <motion.img
            src={s.icon}
            alt={s.label}
            className="w-12 h-12 mb-1"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p className="text-2xl md:text-3xl font-extrabold text-foreground">{s.value}</p>
          <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default StatsSection;
