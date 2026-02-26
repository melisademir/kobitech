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
    image: bentoSales,
    title: "360° Satış & Tahsilat",
    desc: "İster mağazada ister dijitalde ticaretinize güç katın. Tahsilat süreçlerinizi tek platformda birleştirin, online satışlarınızı ve kargo operasyonlarınızı hızlandırın.",
    badges: ["Param Fiziki POS", "Param Sanal POS", "Param Cep POS", "Ticimax", "İkas", "T-Soft", "Aras Kargo"],
  },
  {
    span: "lg:col-span-4",
    image: bentoCashflow,
    title: "Nakit Akışını Yönetin",
    desc: "Tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına anında ulaşarak ticaretinize güç katın.",
    badges: ["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"],
  },
  {
    span: "lg:col-span-5",
    image: bentoOperations,
    title: "Kusursuz Operasyon ve Ekip",
    desc: "Depo yönetiminden saha satış rotalarına, e-Dönüşüm işlemlerinden personel bordrolarına kadar tüm operasyonel iş yükünüzü tek merkezden optimize edin.",
    badges: ["Univera Stokbar", "Nebim V3", "Univera EnRoute", "Uni-Dox", "Paramtech Flows", "Workcube HR"],
  },
  {
    span: "lg:col-span-7",
    image: bentoGlobal,
    title: "Sınırları Aşan Büyüme",
    desc: "Hibe programlarıyla devlet teşviklerinden yararlanın. En güçlü iş dünyası kuruluşlarının vizyonuyla ve doğru stratejiyle globale açılın.",
    badges: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı", "TÜSİAD", "MÜSİAD", "TOBB", "İTO", "HİB", "KAGİDER", "Mükellef"],
  },
];

/* ── Section ── */
const BentoGridSection = () => (
  <section className="py-24 px-6 bg-muted/30 relative z-10">
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
          <div
            key={card.title}
            className={`${card.span} relative overflow-hidden rounded-[2rem] min-h-[420px] group flex flex-col`}
          >
            {/* Full background image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
              loading="lazy"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260,25%,6%)] via-[hsl(260,25%,6%,0.8)] to-[hsl(260,25%,6%,0.2)] z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col h-full justify-end p-8 sm:p-10">
              <h3 className="text-white text-3xl font-extrabold tracking-tight mb-3 drop-shadow-md">
                {card.title}
              </h3>
              <p className="text-slate-200 text-base font-medium leading-relaxed drop-shadow max-w-2xl">
                {card.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {card.badges.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm transition-all hover:bg-white/20"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
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
