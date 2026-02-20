import { motion } from "framer-motion";
import statsFolders from "@/assets/stats-folders.svg";
import statsChart from "@/assets/stats-chart.svg";
import statsGem from "@/assets/stats-gem.svg";
import statsPartner from "@/assets/stats-partner.svg";

const stats = [
  { icon: statsFolders, value: "10.000+", label: "Aktif Kobi", desc: "Aktif kullanan işletme" },
  { icon: statsChart, value: "48+", label: "Farklı Sektör", desc: "Sektörde çözüm" },
  { icon: statsGem, value: "50+", label: "Dijital Araç", desc: "Dönüşüm çözümü" },
  { icon: statsPartner, value: "30+", label: "Çözüm Ortağı", desc: "Teknoloji partneri" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const StatsSection = () => (
  <section className="py-16 relative overflow-hidden">
    {/* Subtle separator lines */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="relative flex flex-col items-center gap-2 group rounded-2xl py-7 px-4 stat-glow bg-white cursor-default select-none"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300"
          >
            <img src={s.icon} alt={s.label} className="w-7 h-7" />
          </motion.div>

          <p className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{s.value}</p>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground/80">{s.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default StatsSection;
