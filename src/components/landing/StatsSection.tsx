import { motion } from "framer-motion";
import statsFolders from "@/assets/stats-folders.svg";
import statsChart from "@/assets/stats-chart.svg";
import statsGem from "@/assets/stats-gem.svg";
import statsPartner from "@/assets/stats-partner.svg";

const stats = [
  { icon: statsFolders, value: "10.000+", label: "Aktif Kobi" },
  { icon: statsChart,   value: "48+",     label: "Farklı Sektör" },
  { icon: statsGem,     value: "50+",     label: "Dijital Dönüşüm Aracı" },
  { icon: statsPartner, value: "30+",     label: "Çözüm Ortağı" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

const StatsSection = () => (
  <section className="py-16 border-b border-slate-100">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={itemVariants}
          whileHover={{ y: -6, scale: 1.025, transition: { type: "spring", stiffness: 320, damping: 20 } }}
          className="flex flex-col items-center gap-4 rounded-2xl py-9 px-5 group cursor-default"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(255,255,255,0.9)",
            outline: "1px solid hsl(252,20%,90%)",
            outlineOffset: "0px",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.8) inset, 0 2px 16px -4px rgba(109,40,217,0.06)",
          }}
        >
          {/* Icon with translucent circle bg */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full bg-primary/[0.08]" />
            <motion.div
              className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-white/80"
              style={{ boxShadow: "0 4px 12px -4px rgba(109,40,217,0.12)" }}
              whileHover={{ y: -4, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <img src={s.icon} alt={s.label} className="w-6 h-6" />
            </motion.div>
          </div>
          <p
            className="text-3xl md:text-4xl font-black text-foreground"
            style={{ letterSpacing: "-0.03em" }}
          >
            {s.value}
          </p>
          <p className="text-xs text-slate-500 font-semibold leading-snug text-center tracking-wide uppercase" style={{ letterSpacing: "0.05em" }}>
            {s.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default StatsSection;
