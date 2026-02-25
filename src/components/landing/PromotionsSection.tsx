import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Cloud, FileText, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import promoAiChat from "@/assets/promo-ai-chat.jpg";
import promoCloudTech from "@/assets/promo-cloud-tech.jpg";
import promoDocuments from "@/assets/promo-documents.jpg";
import promoPayment from "@/assets/promo-payment.jpg";

const cards = [
  {
    title: "Sektörden Haber Veren AI Agent'ımız ile Tanışın!",
    benefit: "Size Özel ilk 100 Bülten Hediye!",
    description: "İlk 100 bülten hediyenizle sektörünüzdeki güncel gelişmeleri, trendleri ve fırsatları yapay zeka destekli asistanımızla anında öğrenin.",
    icon: MessageSquare,
    image: promoAiChat,
    badgeBg: "rgba(99,102,241,0.18)",
    badgeBorder: "rgba(99,102,241,0.35)",
    badgeColor: "#6366F1",
    overlayColor: "rgba(15,25,60,0.45)",
    btnBg: "rgba(99,102,241,0.2)",
    btnBorder: "rgba(99,102,241,0.4)",
    btnColor: "#A5B4FC",
  },
  {
    title: "ParamTECH Cloud ile İşletmenizi Dijitale Taşıyın!",
    benefit: "2 Ay Ücretsiz",
    description: "2 ay ücretsiz deneme ile bulut altyapısı, veri yönetimi ve dijital araçlarla işletmenizi geleceğe hazırlayın.",
    icon: Cloud,
    image: promoCloudTech,
    badgeBg: "rgba(59,130,246,0.18)",
    badgeBorder: "rgba(59,130,246,0.35)",
    badgeColor: "#3B82F6",
    overlayColor: "rgba(10,20,50,0.4)",
    btnBg: "rgba(59,130,246,0.2)",
    btnBorder: "rgba(59,130,246,0.4)",
    btnColor: "#93C5FD",
  },
  {
    title: "Uni-dox ile Dijital Belge Yönetimini Keşfedin!",
    benefit: "1.000 Kontör Hediye",
    description: "1.000 kontör hediyenizle e-Fatura, e-İrsaliye, e-Defter, e-Mutabakat ve e-Arşiv süreçlerinizi tek platformda hızlandırın.",
    icon: FileText,
    image: promoDocuments,
    badgeBg: "rgba(34,197,94,0.15)",
    badgeBorder: "rgba(34,197,94,0.35)",
    badgeColor: "#16A34A",
    overlayColor: "rgba(30,20,10,0.35)",
    btnBg: "rgba(34,197,94,0.2)",
    btnBorder: "rgba(34,197,94,0.4)",
    btnColor: "#86EFAC",
  },
  {
    title: "Param ile Ödemelerinizi Kolaylaştırın!",
    benefit: "%2,29 Komisyon Oranı",
    description: "Özel %2,29 komisyon oranıyla fiziksel ve sanal POS çözümleri sayesinde tüm ödeme kanallarınızı avantajlı şekilde yönetin.",
    icon: CreditCard,
    image: promoPayment,
    badgeBg: "rgba(168,85,247,0.15)",
    badgeBorder: "rgba(168,85,247,0.35)",
    badgeColor: "#A855F7",
    overlayColor: "rgba(30,15,50,0.35)",
    btnBg: "rgba(168,85,247,0.2)",
    btnBorder: "rgba(168,85,247,0.4)",
    btnColor: "#C4B5FD",
  },
];

const PromotionsSection = () => (
  <section className="py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col"
          >
            {/* Background image — objects sit at bottom */}
            <img
              src={card.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-bottom"
              aria-hidden="true"
            />
            {/* Light overlay for text readability at top */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${card.overlayColor} 0%, transparent 55%, transparent 100%)`,
              }}
            />

            {/* Content — top-aligned, left-aligned */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between flex-1">
              {/* Top section: title + description */}
              <div>
                <h3
                  className="font-bold leading-snug mb-3 text-white"
                  style={{ fontSize: "clamp(22px, 2.5vw, 28px)", letterSpacing: "-0.02em", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                >
                  {card.title}
                </h3>

                <p
                  className="mb-4 text-white/75"
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    maxWidth: "380px",
                    textShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  {card.description}
                </p>
              </div>

              {/* Bottom section: CTA */}
              <div>
                <Link to="/kobi/step-1">
                  <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg backdrop-blur-md"
                    style={{
                      background: card.btnBg,
                      border: `1px solid ${card.btnBorder}`,
                      color: card.btnColor,
                    }}
                  >
                    Detaylı Bilgi <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PromotionsSection;
