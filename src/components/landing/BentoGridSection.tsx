import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import bentoSales from "@/assets/bento-sales.png";
import bentoCashflow from "@/assets/bento-cashflow.png";
import bentoOperations from "@/assets/bento-operations.png";
import bentoGlobal from "@/assets/bento-global.png";

/* ── Card data ── */
const cards = [
  {
    span: "lg:col-span-8",
    wide: true,
    image: bentoSales,
    imgClass: "absolute -bottom-4 -right-4 w-[250px] md:w-[350px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 z-10",
    title: "360° Satış & Tahsilat",
    desc: "İster mağazada ister dijitalde ticaretinize güç katın. Tahsilat süreçlerinizi tek platformda birleştirin, online satışlarınızı ve kargo operasyonlarınızı hızlandırın.",
    badges: ["Param Fiziki POS", "Param Sanal POS", "Param Cep POS", "Ticimax", "İkas", "T-Soft", "Aras Kargo"],
  },
  {
    span: "lg:col-span-4",
    wide: false,
    image: bentoCashflow,
    imgClass: "absolute -bottom-6 -right-6 w-[180px] md:w-[220px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 z-10 opacity-80",
    title: "Nakit Akışını Yönetin",
    desc: "Tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına anında ulaşarak ticaretinize güç katın.",
    badges: ["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"],
  },
  {
    span: "lg:col-span-5",
    wide: false,
    image: bentoOperations,
    imgClass: "absolute -bottom-6 -right-6 w-[200px] md:w-[250px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 z-10 opacity-80",
    title: "Kusursuz Operasyon ve Ekip",
    desc: "Depo yönetiminden saha satış rotalarına, e-Dönüşüm işlemlerinden personel bordrolarına kadar tüm operasyonel iş yükünüzü tek merkezden optimize edin.",
    badges: ["Univera Stokbar", "Nebim V3", "Univera EnRoute", "Uni-Dox", "Paramtech Flows", "Workcube HR"],
  },
  {
    span: "lg:col-span-7",
    wide: true,
    image: bentoGlobal,
    imgClass: "absolute -bottom-4 -right-4 w-[250px] md:w-[320px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 z-10",
    title: "Sınırları Aşan Büyüme",
    desc: "Hibe programlarıyla devlet teşviklerinden yararlanın. En güçlü iş dünyası kuruluşlarının vizyonuyla ve doğru stratejiyle globale açılın.",
    badges: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı", "TÜSİAD", "MÜSİAD", "TOBB", "İTO", "HİB", "KAGİDER", "Mükellef"],
  },
];

const cardBase =
  "bg-white border border-slate-200 shadow-sm rounded-[2rem] p-8 sm:p-10 relative overflow-hidden group hover:shadow-xl hover:border-purple-200 transition-all duration-300 min-h-[400px] flex flex-col";

/* ── Section ── */
const BentoGridSection = () => (
  <section className="bg-slate-50 py-24 px-6 relative z-10">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <h2
          className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4"
          style={{ lineHeight: 1.1 }}
        >
          Ticaretinizi Büyüten{" "}
          <span className="text-gradient-primary">Ekosistem</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          İşletmenizin her ihtiyacı için sektör lideri çözümler tek platformda.
        </p>
      </motion.div>

      {/* 12-column Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {cards.map((card) => (
          <div key={card.title} className={`${card.span} ${cardBase}`}>
            {/* Content wrapper — wide cards limit text width, narrow cards use full width + bottom padding */}
            <div
              className={
                card.wide
                  ? "w-full lg:w-[60%] flex flex-col h-full"
                  : "w-full flex flex-col h-full pb-[120px]"
              }
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-3 relative z-20">
                {card.title}
              </h3>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed relative z-20">
                {card.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-8 relative z-20">
                {card.badges.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition-colors"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* 3D Image — positioned in corner */}
            <img
              src={card.image}
              alt={card.title}
              className={card.imgClass}
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="mt-16 flex justify-center w-full">
        <Link
          to="/kobi/step-1"
          className="bg-primary hover:brightness-90 text-primary-foreground px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-primary/20 cursor-pointer"
        >
          50+ Çözümü Hemen Keşfet
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </section>
);

export default BentoGridSection;
