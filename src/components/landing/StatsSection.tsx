import { motion } from "framer-motion";
import statsFolders from "@/assets/stats-folders.svg";
import statsChart from "@/assets/stats-chart.svg";
import statsGem from "@/assets/stats-gem.svg";
import statsPartner from "@/assets/stats-partner.svg";

const stats = [
  {
    icon: statsFolders,
    value: "10.000+",
    label: "Aktif Kobi",
    circleBg: "rgba(109,40,217,0.09)",
    shadowColor: "rgba(109,40,217,0.22)",
  },
  {
    icon: statsChart,
    value: "48+",
    label: "Farklı Sektör",
    circleBg: "rgba(109,40,217,0.09)",
    shadowColor: "rgba(109,40,217,0.22)",
  },
  {
    icon: statsGem,
    value: "50+",
    label: "Dijital Dönüşüm Aracı",
    circleBg: "rgba(109,40,217,0.09)",
    shadowColor: "rgba(109,40,217,0.22)",
  },
  {
    icon: statsPartner,
    value: "30+",
    label: "Çözüm Ortağı",
    circleBg: "rgba(109,40,217,0.09)",
    shadowColor: "rgba(109,40,217,0.22)",
  },
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
  <section className="py-16 border-y border-border/50">
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
          whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.22 } }}
          className="flex flex-col items-center gap-4 rounded-3xl py-10 px-6 transition-all duration-300 border border-white/25 group"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 2px 24px -4px rgba(109,40,217,0.07), 0 1px 0 rgba(255,255,255,0.8) inset",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px -8px ${s.shadowColor}, 0 1px 0 rgba(255,255,255,0.8) inset`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 24px -4px rgba(109,40,217,0.07), 0 1px 0 rgba(255,255,255,0.8) inset";
          }}
        >
          {/* Icon — circle bg, icon jumps on hover */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-16 h-16 rounded-full"
              style={{ background: s.circleBg }}
            />
            <motion.div
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center border border-white/50"
              style={{
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 16px -4px rgba(109,40,217,0.10)",
              }}
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <img src={s.icon} alt={s.label} className="w-7 h-7" />
            </motion.div>
          </div>
          <p className="text-3xl md:text-4xl font-black text-foreground tracking-tight" style={{ letterSpacing: "-0.03em" }}>{s.value}</p>
          <p className="text-sm text-muted-foreground font-medium leading-snug" style={{ opacity: 0.7 }}>{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default StatsSection;
