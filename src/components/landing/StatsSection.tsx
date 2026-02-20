import { motion } from "framer-motion";
import statsFolders from "@/assets/stats-folders.svg";
import statsChart from "@/assets/stats-chart.svg";
import statsGem from "@/assets/stats-gem.svg";
import statsPartner from "@/assets/stats-partner.svg";

const stats = [
  { icon: statsFolders, value: "10.000+", label: "Aktif Kobi", color: "from-violet-500/20 to-purple-500/10", glow: "hover:shadow-[0_8px_32px_-4px_hsl(268,72%,38%/0.35)]" },
  { icon: statsChart, value: "48+", label: "Farklı Sektör", color: "from-cyan-500/20 to-teal-500/10", glow: "hover:shadow-[0_8px_32px_-4px_hsl(168,76%,42%/0.35)]" },
  { icon: statsGem, value: "50+", label: "Dijital Dönüşüm Aracı", color: "from-indigo-500/20 to-violet-500/10", glow: "hover:shadow-[0_8px_32px_-4px_hsl(245,70%,55%/0.35)]" },
  { icon: statsPartner, value: "30+", label: "Çözüm Ortağı", color: "from-emerald-500/20 to-cyan-500/10", glow: "hover:shadow-[0_8px_32px_-4px_hsl(160,84%,39%/0.35)]" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
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
          whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.22 } }}
          className={`flex flex-col items-center gap-2 group glass-card rounded-2xl py-6 px-4 transition-shadow duration-300 ${s.glow}`}
        >
          <motion.div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-1 border border-border`}
            whileHover={{ scale: 1.12, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={s.icon} alt={s.label} className="w-8 h-8" />
          </motion.div>
          <p className="text-2xl md:text-3xl font-extrabold text-foreground">{s.value}</p>
          <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default StatsSection;
