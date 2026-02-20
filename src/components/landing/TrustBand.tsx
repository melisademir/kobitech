import { motion } from "framer-motion";
import logoAras from "@/assets/logo-aras.png";
import logoFinrota from "@/assets/logo-finrota-new.svg";
import logoIkas from "@/assets/logo-ikas.png";
import logoKariyer from "@/assets/logo-kariyer.png";
import logoMukellef from "@/assets/logo-mukellef.png";
import logoNebim from "@/assets/logo-nebim.svg";
import logoParam from "@/assets/logo-param.jpg";
import logoTicimax from "@/assets/logo-ticimax.png";
import logoTsoft from "@/assets/logo-tsoft.png";
import logoUnivaera from "@/assets/logo-univera.svg";
import logoKredim from "@/assets/logo-kredim.svg";
import logoGoogle from "@/assets/logo-google.png";

const partners = [
  { name: "Param", logo: logoParam },
  { name: "T-SOFT", logo: logoTsoft },
  { name: "Finrota", logo: logoFinrota },
  { name: "ikas", logo: logoIkas },
  { name: "Nebim", logo: logoNebim },
  { name: "Aras Kargo", logo: logoAras },
  { name: "Univera", logo: logoUnivaera },
  { name: "Kredim", logo: logoKredim },
  { name: "Ticimax", logo: logoTicimax },
  { name: "Mükelllef", logo: logoMukellef },
  { name: "Kariyer.net", logo: logoKariyer },
  { name: "Google", logo: logoGoogle },
];

const TrustBand = () => (
  <section className="py-14">
    <div className="max-w-6xl mx-auto px-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-400 text-center mb-10"
      >
        Güvenilen Çözüm Ortakları
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8"
      >
        {partners.map((p) => (
          <motion.div
            key={p.name}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            whileHover={{ scale: 1.08 }}
            className="group flex items-center justify-center cursor-default"
            title={p.name}
          >
            <img
              src={p.logo}
              alt={p.name}
              className="h-8 w-auto max-w-[110px] object-contain transition-all duration-300"
              style={{
                filter: "grayscale(1) opacity(0.45)",
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0) opacity(1)")}
              onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(1) opacity(0.45)")}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustBand;
