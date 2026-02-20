import { motion } from "framer-motion";
import statsGem from "@/assets/stats-gem.svg";
import statsPartner from "@/assets/stats-partner.svg";

const stats = [
  { value: "10.000+", label: "Aktif KOBİ", sub: "Türkiye geneli" },
  { value: "48+",     label: "Farklı Sektör", sub: "Tüm sektörler" },
  { value: "50+",     label: "Dijital Araç", sub: "Entegre çözümler" },
  { value: "30+",     label: "Çözüm Ortağı", sub: "Seçkin partnerler" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
};

const StatsSection = () => (
  <section className="py-20 border-b border-slate-100">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
          Rakamlarla Kobi Dijital
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 320, damping: 20 } }}
            className="flex flex-col items-center gap-1.5 py-10 px-6 bg-white group cursor-default"
          >
            <p
              className="text-3xl md:text-4xl font-black text-foreground"
              style={{ letterSpacing: "-0.04em" }}
            >
              {s.value}
            </p>
            <p className="text-sm font-semibold text-foreground/80">{s.label}</p>
            <p className="text-xs text-slate-400 tracking-wide">{s.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default StatsSection;
