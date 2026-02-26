import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import bentoDarkSales from "@/assets/bento-dark-sales.png";
import bentoDarkCashflow from "@/assets/bento-dark-cashflow.png";
import bentoDarkOperations from "@/assets/bento-dark-operations.png";
import bentoDarkGlobal from "@/assets/bento-dark-global.png";

/* ── Card data ── */
const cards = [
  {
    span: "lg:col-span-8",
    image: bentoDarkSales,
    title: "360° Satış & Tahsilat",
    desc: "İster mağazada ister dijitalde ticaretinize güç katın. Tahsilat süreçlerinizi tek platformda birleştirin, online satışlarınızı ve kargo operasyonlarınızı hızlandırın.",
    highlight: "Fiziki, Sanal ve Cep POS ile Tüm Ödemeler Tek Ekranda!",
  },
  {
    span: "lg:col-span-4",
    image: bentoDarkCashflow,
    title: "Nakit Akışını Yönetin",
    desc: "Tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına anında ulaşarak ticaretinize güç katın.",
    highlight: "Tüm Banka Hesaplarınız ve Nakit Akışınız Kontrol Altında!",
  },
  {
    span: "lg:col-span-5",
    image: bentoDarkOperations,
    title: "Kusursuz Operasyon ve Ekip",
    desc: "Depo yönetiminden saha satış rotalarına, e-Dönüşüm işlemlerinden personel bordrolarına kadar tüm operasyonel iş yükünüzü tek merkezden optimize edin.",
    highlight: "Depo, Saha ve İK Süreçleriniz İçin Uçtan Uca Otomasyon!",
  },
  {
    span: "lg:col-span-7",
    image: bentoDarkGlobal,
    title: "Sınırları Aşan Büyüme",
    desc: "Hibe programlarıyla devlet teşviklerinden yararlanın. En güçlü iş dünyası kuruluşlarının vizyonuyla ve doğru stratejiyle globale açılın.",
    highlight: "Devlet Teşvikleri ve Global İş Ağlarıyla Sınırları Kaldırın!",
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
            className={`relative overflow-hidden rounded-[2rem] min-h-[400px] group ${card.span}`}
          >
            {/* Background image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,11%)]/95 via-[hsl(222,47%,11%)]/60 to-[hsl(222,47%,11%)]/20" />

            {/* Content */}
            <div className="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-between">
              {/* Top — text */}
              <div>
                <h3 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight leading-tight drop-shadow-lg mb-3">
                  {card.title}
                </h3>
                <p className="text-[hsl(214,32%,80%)] text-sm md:text-base font-medium leading-relaxed drop-shadow">
                  {card.desc}
                </p>

                {/* Glassmorphism highlight box */}
                <div className="bg-white/95 backdrop-blur-sm text-foreground rounded-xl px-5 py-3 text-sm font-bold shadow-xl w-fit mt-6">
                  {card.highlight}
                </div>
              </div>

              {/* Bottom — CTA */}
              <Link
                to="/kobi/step-1"
                className="bg-[hsl(268,68%,60%)] hover:bg-[hsl(268,68%,50%)] text-white rounded-full py-3 px-6 text-sm font-bold inline-flex items-center gap-2 transition-all hover:scale-105 shadow-md w-fit mt-8"
              >
                Hemen Başla
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTA — outside the grid */}
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
