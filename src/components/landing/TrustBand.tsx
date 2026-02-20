import { motion } from "framer-motion";

const partners = [
  { name: "Garanti BBVA", abbr: "GBB" },
  { name: "İş Bankası", abbr: "İŞB" },
  { name: "Akbank", abbr: "AKB" },
  { name: "Yapı Kredi", abbr: "YKB" },
  { name: "QNB Finansbank", abbr: "QNB" },
  { name: "Ziraat Bankası", abbr: "ZRT" },
];

const TrustBand = () => (
  <section className="py-14 border-y border-slate-100">
    <div className="max-w-6xl mx-auto px-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400 text-center mb-10"
      >
        Güvenilen Çözüm Ortakları
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
      >
        {partners.map((p) => (
          <motion.div
            key={p.name}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            whileHover={{ scale: 1.08 }}
            className="group flex items-center gap-2 cursor-default"
          >
            {/* Logo placeholder — grayscale circle badge */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all duration-300"
              style={{
                background: "hsl(252,20%,92%)",
                color: "hsl(260,10%,55%)",
                filter: "grayscale(1)",
              }}
            >
              <span
                className="group-hover:hidden block"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {p.abbr}
              </span>
              <span
                className="group-hover:block hidden"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#7C3AED" }}
              >
                {p.abbr}
              </span>
            </div>
            <span
              className="text-sm font-semibold transition-colors duration-300"
              style={{ color: "hsl(260,10%,60%)" }}
            >
              <span className="group-hover:text-[#7C3AED] transition-colors duration-300">
                {p.name}
              </span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustBand;
