import { motion } from "framer-motion";

const stats = [
{ value: "5.000+", label: "Aktif KOBİ", sub: "Türkiye geneli" },
{ value: "20+", label: "Farklı Sektör", sub: "Tüm sektörler" },
{ value: "50+", label: "Dijital Çözüm", sub: "Entegre çözümler" },
{ value: "30+", label: "Çözüm Ortağı", sub: "Seçkin partnerler" }];


const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
};

const StatsSection = () =>
<section className="py-20">
    <div className="max-w-5xl mx-auto px-6">
      










      <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-[20px] overflow-hidden"
      style={{
        background: "hsl(220,13%,91%)",
        border: "1px solid hsl(220,13%,91%)",
        boxShadow: "0 2px 8px rgba(15,23,42,0.08), 0 8px 32px rgba(15,23,42,0.06)"
      }}>

        {stats.map((s) =>
      <motion.div
        key={s.label}
        variants={itemVariants}
        className="flex flex-col items-center gap-1.5 py-10 px-6 bg-white cursor-default">

            <p
          className="text-3xl md:text-4xl font-black text-foreground"
          style={{ letterSpacing: "-0.04em" }}>

              {s.value}
            </p>
            <p className="text-sm font-semibold text-foreground/80">{s.label}</p>
            <p className="text-xs text-muted-foreground tracking-wide">{s.sub}</p>
          </motion.div>
      )}
      </motion.div>
    </div>
  </section>;


export default StatsSection;