import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Wallet,
  Users,
  Globe,
  ArrowRight,
} from "lucide-react";

/* ── Badge color presets ── */
const badgeColor = {
  indigo: "bg-[hsl(226,76%,96%)] text-[hsl(226,60%,42%)] border-[hsl(226,60%,90%)]",
  emerald: "bg-[hsl(152,68%,95%)] text-[hsl(152,60%,30%)] border-[hsl(152,60%,88%)]",
  blue: "bg-[hsl(210,80%,96%)] text-[hsl(210,70%,38%)] border-[hsl(210,60%,88%)]",
  purple: "bg-[hsl(268,60%,96%)] text-[hsl(268,60%,38%)] border-[hsl(268,50%,88%)]",
} as const;

type ColorKey = keyof typeof badgeColor;

const Badge = ({ label, color }: { label: string; color: ColorKey }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor[color]}`}
  >
    {label}
  </span>
);

/* ── Shared card base ── */
const cardBase =
  "bg-white rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer";

/* ── Section ── */
const BentoGridSection = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative z-10">
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

      {/* Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)]"
      >
        {/* ─── Kart 1 — 360° Satış & Tahsilat (2×2 Kahraman) ─── */}
        <div
          className={`${cardBase} md:col-span-2 lg:col-span-2 lg:row-span-2`}
          style={{
            background:
              "linear-gradient(160deg, white 55%, hsl(226,76%,96%) 100%)",
          }}
        >
          <CreditCard className="w-8 h-8 mb-4" style={{ color: "hsl(226,60%,42%)" }} />
          <h3 className="text-xl font-bold text-foreground mb-3">
            360° Satış &amp; Tahsilat
          </h3>
          <p className="text-sm text-muted-foreground mb-6 flex-grow">
            İster mağazada ister dijitalde ticaretinize güç katın. Tahsilat
            süreçlerinizi tek platformda birleştirin, online satışlarınızı ve
            kargo operasyonlarınızı hızlandırın.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {[
              "Param Fiziki POS",
              "Param Sanal POS",
              "Param Cep POS",
              "Ticimax",
              "İkas",
              "T-Soft",
              "Aras Kargo",
            ].map((t) => (
              <Badge key={t} label={t} color="indigo" />
            ))}
          </div>
          {/* Decorative */}
          <div className="absolute -bottom-6 -right-6 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500">
            <CreditCard className="w-52 h-52" style={{ color: "hsl(226,60%,42%)" }} />
          </div>
        </div>

        {/* ─── Kart 2 — Nakit Akışı (1×2 Dikey) ─── */}
        <div className={`${cardBase} md:col-span-1 lg:col-span-1 lg:row-span-2`}>
          <Wallet className="w-8 h-8 mb-4" style={{ color: "hsl(152,60%,30%)" }} />
          <h3 className="text-xl font-bold text-foreground mb-3">
            Nakit Akışını Yönetin
          </h3>
          <p className="text-sm text-muted-foreground mb-6 flex-grow">
            Tüm para trafiğinizi güvenle yönetin. Kredim Business ile
            işletmenize uygun finansman imkanlarına anında ulaşarak ticaretinize
            güç katın.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {["Netahsilat", "Netekstre", "Nap360", "Posrapor", "Kredim Business"].map(
              (t) => (
                <Badge key={t} label={t} color="emerald" />
              ),
            )}
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500">
            <Wallet className="w-36 h-36" style={{ color: "hsl(152,60%,30%)" }} />
          </div>
        </div>

        {/* ─── Kart 3 — Operasyon ve İK (Geniş Yatay) ─── */}
        <div className={`${cardBase} md:col-span-3 lg:col-span-2`}>
          <Users className="w-8 h-8 mb-4" style={{ color: "hsl(210,70%,38%)" }} />
          <h3 className="text-xl font-bold text-foreground mb-3">
            Kusursuz Operasyon ve Ekip
          </h3>
          <p className="text-sm text-muted-foreground mb-6 flex-grow">
            Depo yönetiminden saha satış rotalarına, e-Dönüşüm işlemlerinden
            personel bordrolarına kadar tüm operasyonel iş yükünüzü tek
            merkezden optimize edin.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {[
              "Univera Stokbar",
              "Nebim V3",
              "Univera EnRoute",
              "Uni-Dox",
              "Paramtech Flows",
              "Workcube HR",
            ].map((t) => (
              <Badge key={t} label={t} color="blue" />
            ))}
          </div>
        </div>

        {/* ─── Kart 4 — Büyüme & Globalleşme (Geniş Alt) ─── */}
        <div className={`${cardBase} md:col-span-3 lg:col-span-3`}>
          <Globe className="w-8 h-8 mb-4" style={{ color: "hsl(268,60%,38%)" }} />
          <h3 className="text-xl font-bold text-foreground mb-3">
            Sınırları Aşan Büyüme
          </h3>
          <p className="text-sm text-muted-foreground mb-6 flex-grow">
            Hibe programlarıyla devlet teşviklerinden yararlanın. En güçlü iş
            dünyası kuruluşlarının vizyonuyla ve doğru stratejiyle globale
            açılın.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {[
              "KOSGEB",
              "TÜBİTAK",
              "Ticaret Bakanlığı",
              "TÜSİAD",
              "MÜSİAD",
              "TOBB",
              "İTO",
              "HİB",
              "KAGİDER",
              "Mükellef",
            ].map((t) => (
              <Badge key={t} label={t} color="purple" />
            ))}
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500">
            <Globe className="w-40 h-40" style={{ color: "hsl(268,60%,38%)" }} />
          </div>
        </div>

        {/* ─── Kart 5 — CTA Aksiyon ─── */}
        <Link
          to="/kobi/step-1"
          className="rounded-3xl p-8 relative overflow-hidden flex items-center justify-center gap-3 cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out md:col-span-3 lg:col-span-1 lg:row-span-1"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(268,80%,55%) 100%)",
          }}
        >
          <span className="text-primary-foreground text-xl md:text-2xl font-bold tracking-tight">
            Hemen Başvur
          </span>
          <ArrowRight className="w-6 h-6 text-primary-foreground group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default BentoGridSection;
