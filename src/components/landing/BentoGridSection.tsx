import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Wallet, Users, Globe, ArrowRight } from "lucide-react";

/* ── Badge presets ── */
const badgeStyles = {
  indigo: "bg-[hsl(226,76%,96%)]/50 text-[hsl(226,60%,42%)] border-[hsl(226,60%,90%)]",
  emerald: "bg-[hsl(152,68%,95%)]/50 text-[hsl(152,60%,30%)] border-[hsl(152,60%,88%)]",
  blue: "bg-[hsl(210,80%,96%)]/50 text-[hsl(210,70%,38%)] border-[hsl(210,60%,88%)]",
  purple: "bg-[hsl(268,60%,96%)]/50 text-[hsl(268,60%,38%)] border-[hsl(268,50%,88%)]",
} as const;

type ColorKey = keyof typeof badgeStyles;

const Badge = ({ label, color }: { label: string; color: ColorKey }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyles[color]}`}>
    {label}
  </span>
);

/* ── Icon container presets ── */
const iconBg = {
  indigo: "bg-[hsl(226,76%,96%)]",
  emerald: "bg-[hsl(152,68%,95%)]",
  blue: "bg-[hsl(210,80%,96%)]",
  purple: "bg-[hsl(268,60%,96%)]",
} as const;

/* ── Card base ── */
const cardBase =
  "rounded-[2rem] p-8 sm:p-10 border border-border/60 shadow-sm shadow-muted/50 relative overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col gap-4";

/* ── Card data ── */
const cards: {
  span: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  badges: string[];
  color: ColorKey;
  wide?: boolean;
}[] = [
  {
    span: "lg:col-span-8",
    icon: <CreditCard className="w-8 h-8" style={{ color: "hsl(226,60%,42%)" }} />,
    title: "360° Satış & Tahsilat",
    desc: "İster mağazada ister dijitalde ticaretinize güç katın. Tahsilat süreçlerinizi tek platformda birleştirin, online satışlarınızı ve kargo operasyonlarınızı hızlandırın.",
    badges: ["Param Fiziki POS", "Param Sanal POS", "Param Cep POS", "Ticimax", "İkas", "T-Soft", "Aras Kargo"],
    color: "indigo",
    wide: true,
  },
  {
    span: "lg:col-span-4",
    icon: <Wallet className="w-8 h-8" style={{ color: "hsl(152,60%,30%)" }} />,
    title: "Nakit Akışını Yönetin",
    desc: "Tüm para trafiğinizi güvenle yönetin. Kredim Business ile işletmenize uygun finansman imkanlarına anında ulaşarak ticaretinize güç katın.",
    badges: ["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"],
    color: "emerald",
  },
  {
    span: "lg:col-span-5",
    icon: <Users className="w-8 h-8" style={{ color: "hsl(210,70%,38%)" }} />,
    title: "Kusursuz Operasyon ve Ekip",
    desc: "Depo yönetiminden saha satış rotalarına, e-Dönüşüm işlemlerinden personel bordrolarına kadar tüm operasyonel iş yükünüzü tek merkezden optimize edin.",
    badges: ["Univera Stokbar", "Nebim V3", "Univera EnRoute", "Uni-Dox", "Paramtech Flows", "Workcube HR"],
    color: "blue",
  },
  {
    span: "lg:col-span-7",
    icon: <Globe className="w-8 h-8" style={{ color: "hsl(268,60%,38%)" }} />,
    title: "Sınırları Aşan Büyüme",
    desc: "Hibe programlarıyla devlet teşviklerinden yararlanın. En güçlü iş dünyası kuruluşlarının vizyonuyla ve doğru stratejiyle globale açılın.",
    badges: ["KOSGEB", "TÜBİTAK", "Ticaret Bakanlığı", "TÜSİAD", "MÜSİAD", "TOBB", "İTO", "HİB", "KAGİDER", "Mükellef"],
    color: "purple",
    wide: true,
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
            className={`${cardBase} ${card.span} ${
              card.wide
                ? "bg-gradient-to-br from-white to-muted/80"
                : "bg-white"
            }`}
          >
            {/* Icon container */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconBg[card.color]}`}>
              {card.icon}
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-foreground">{card.title}</h3>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{card.desc}</p>

            {/* Badges pinned to bottom */}
            <div className="flex flex-wrap gap-2 mt-auto pt-6">
              {card.badges.map((b) => (
                <Badge key={b} label={b} color={card.color} />
              ))}
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
