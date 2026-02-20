import { motion } from "framer-motion";
import statsFolders from "@/assets/stats-folders.svg";
import statsChart from "@/assets/stats-chart.svg";
import statsGem from "@/assets/stats-gem.svg";
import statsPartner from "@/assets/stats-partner.svg";

const stats = [
  { icon: statsFolders, value: "10.000+", label: "Aktif Kobi", color: "from-violet-500/15 to-purple-500/8", glow: "hover:shadow-[0_8px_40px_-8px_hsl(268,72%,38%/0.28)]" },
  { icon: statsChart, value: "48+", label: "Farklı Sektör", color: "from-cyan-500/15 to-teal-500/8", glow: "hover:shadow-[0_8px_40px_-8px_hsl(168,76%,42%/0.28)]" },
  { icon: statsGem, value: "50+", label: "Dijital Dönüşüm Aracı", color: "from-indigo-500/15 to-violet-500/8", glow: "hover:shadow-[0_8px_40px_-8px_hsl(245,70%,55%/0.28)]" },
  { icon: statsPartner, value: "30+", label: "Çözüm Ortağı", color: "from-emerald-500/15 to-cyan-500/8", glow: "hover:shadow-[0_8px_40px_-8px_hsl(160,84%,39%/0.28)]" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const StatsSection = () => (
  <section className="py-16 border-y border-border/60">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-5 text-center"
    >
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={itemVariants}
          whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.22 } }}
          className={`flex flex-col items-center gap-3 glass-card rounded-2xl py-8 px-5 transition-shadow duration-300 ${s.glow}`}
        >
          <motion.div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center border border-white/30`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 280 }}
          >
            <img src={s.icon} alt={s.label} className="w-7 h-7" />
          </motion.div>
          <p className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{s.value}</p>
          <p className="text-sm text-muted-foreground font-medium leading-snug">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default StatsSection;
