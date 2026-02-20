import { motion } from "framer-motion";

const stats = [
  { value: "10.000+", label: "Aktif KOBİ", sub: "Türkiye geneli" },
  { value: "48+", label: "Farklı Sektör", sub: "Tüm sektörler" },
  { value: "50+", label: "Dijital Araç", sub: "Entegre çözümler" },
  { value: "30+", label: "Çözüm Ortağı", sub: "Seçkin partnerler" }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
};

const StatsSection = () => (
  <section className="py-20 border-b" style={{ borderColor: "hsl(38,20%,91%)" }}>
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "hsl(38,30%,55%)" }}>
          İşletmeler Kobi Dijital ile büyüyor
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
        style={{ background: "hsl(38,20%,91%)", border: "1px solid hsl(38,20%,91%)" }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 320, damping: 20 } }}
            className="flex flex-col items-center gap-1.5 py-10 px-6 cursor-default group"
            style={{ background: "hsl(38,25%,99%)" }}
          >
            <p
              className="text-3xl md:text-4xl font-black"
              style={{ letterSpacing: "-0.04em", color: "hsl(38,75%,38%)" }}
            >
              {s.value}
            </p>
            <p className="text-sm font-semibold" style={{ color: "hsl(25,35%,18%)" }}>{s.label}</p>
            <p className="text-xs tracking-wide" style={{ color: "hsl(38,20%,58%)" }}>{s.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default StatsSection;
