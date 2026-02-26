import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Globe2,
  Settings,
  Wallet,
  ArrowRight,
  CheckSquare,
  TrendingUp,
} from "lucide-react";

const cardBase =
  "rounded-3xl border border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#541F8F]/40 overflow-hidden relative group";

const BentoGridSection = () => (
  <section className="py-24 md:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <h2
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-foreground"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          Platformun Gücünü
          <br />
          <span className="text-gradient-primary">Keşfedin</span>
        </h2>
        <p
          className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          style={{ fontSize: "19px", lineHeight: "1.7" }}
        >
          İşletmenizin her ihtiyacı için birbirine entegre çözümler.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[200px] md:auto-rows-[220px]"
      >
        {/* 1 — Ana Odak: Bütünleşik Ödeme Sistemleri (2×2) */}
        <div
          className={`${cardBase} md:col-span-2 md:row-span-2 p-8 flex flex-col justify-between`}
          style={{
            background:
              "linear-gradient(160deg, white 50%, hsl(268,60%,97%) 100%)",
          }}
        >
          <div className="relative z-10 space-y-3">
            <div
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl"
              style={{ background: "rgba(84,31,143,0.08)" }}
            >
              <CreditCard className="w-5 h-5" style={{ color: "#541F8F" }} />
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ letterSpacing: "-0.02em" }}
            >
              Bütünleşik Ödeme Sistemleri
            </h3>
            <p
              className="text-muted-foreground max-w-sm"
              style={{ fontSize: "16px", lineHeight: 1.65 }}
            >
              Fiziki, Sanal ve Cep POS. Nerede olursanız olun, tüm
              tahsilatlarınız tek ekranda aksın.
            </p>
          </div>
          {/* Decorative illustration */}
          <div className="absolute bottom-4 right-4 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500">
            <CreditCard className="w-40 h-40 md:w-56 md:h-56" style={{ color: "#541F8F" }} />
          </div>
        </div>

        {/* 2 — E-Ticaret & Global Büyüme (2 col, 1 row) */}
        <div className={`${cardBase} md:col-span-2 p-7 flex flex-col justify-between`}>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ background: "rgba(84,31,143,0.08)" }}
              >
                <Globe2 className="w-5 h-5" style={{ color: "#541F8F" }} />
              </div>
              <TrendingUp
                className="w-5 h-5 opacity-40"
                style={{ color: "#541F8F" }}
              />
            </div>
            <h3
              className="text-xl font-bold text-foreground"
              style={{ letterSpacing: "-0.015em" }}
            >
              E-Ticaret &amp; Global Büyüme
            </h3>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Sınırları kaldırın. Dünyaya açılın, dövizle satış yapın.
            </p>
          </div>
          <div className="absolute bottom-3 right-4 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500">
            <Globe2 className="w-28 h-28" style={{ color: "#541F8F" }} />
          </div>
        </div>

        {/* 3 — Operasyon Yönetimi (1 col, 1 row) */}
        <div className={`${cardBase} p-7 flex flex-col justify-between`}>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ background: "rgba(84,31,143,0.08)" }}
              >
                <Settings className="w-5 h-5" style={{ color: "#541F8F" }} />
              </div>
              <CheckSquare
                className="w-4 h-4 opacity-40"
                style={{ color: "#541F8F" }}
              />
            </div>
            <h3
              className="text-lg font-bold text-foreground"
              style={{ letterSpacing: "-0.01em" }}
            >
              Operasyon Yönetimi
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Stok, saha ve ekip takibini otomatiğe bağlayın.
            </p>
          </div>
        </div>

        {/* 4 — Nakit Akışı & Finans (1 col, 1 row) */}
        <div className={`${cardBase} p-7 flex flex-col justify-between`}>
          <div className="space-y-2.5">
            <div
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: "rgba(84,31,143,0.08)" }}
            >
              <Wallet className="w-5 h-5" style={{ color: "#541F8F" }} />
            </div>
            <h3
              className="text-lg font-bold text-foreground"
              style={{ letterSpacing: "-0.01em" }}
            >
              Nakit Akışı &amp; Finans
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Paranızı akıllıca yönetin, teşvikleri kaçırmayın.
            </p>
          </div>
          <div className="absolute bottom-2 right-3 text-2xl font-bold opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500 select-none">
            ₺ $ €
          </div>
        </div>

        {/* 5 — Aksiyon Kartı: Hemen Başvur */}
        <Link
          to="/kobi/step-1"
          className={`${cardBase} md:col-span-2 flex items-center justify-center gap-3 cursor-pointer`}
          style={{
            background: "linear-gradient(135deg, #541F8F 0%, #7C3AED 100%)",
            border: "none",
          }}
        >
          <span className="text-white text-xl md:text-2xl font-bold tracking-tight">
            Hemen Başvur
          </span>
          <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default BentoGridSection;
