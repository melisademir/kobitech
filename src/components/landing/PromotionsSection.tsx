import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Cloud, FileText, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import promoAiAgent from "@/assets/promo-ai-agent.jpg";
import promoCloud from "@/assets/promo-cloud.jpg";
import promoUnidox from "@/assets/promo-unidox.jpg";
import promoParam from "@/assets/promo-param.jpg";

const cards = [
  {
    title: "Sektörden Haberler Veren AI Agent'ımız ile Tanışın!",
    subtitle: "Size Özel 1.000 Chat Hediye",
    description: "Sektörünüzdeki güncel gelişmeleri, trendleri ve fırsatları yapay zeka destekli asistanımızla anında öğrenin.",
    icon: MessageSquare,
    image: promoAiAgent,
    overlay: "linear-gradient(180deg, rgba(15,10,35,0.35) 0%, rgba(15,10,35,0.25) 50%, rgba(15,10,35,0.4) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(99,102,241,0.2)",
    subtitleColor: "#A5B4FC",
    subtitleBorder: "rgba(99,102,241,0.35)",
    descColor: "rgba(230,230,245,0.85)",
    btnBg: "rgba(255,255,255,0.12)",
    btnBorder: "rgba(255,255,255,0.2)",
    btnColor: "#E0E7FF",
  },
  {
    title: "ParamTECH Cloud ile İşletmenizi Dijitale Taşıyın!",
    subtitle: "Size Özel 2 Ay Ücretsiz",
    description: "Bulut altyapısı, veri yönetimi ve dijital araçlarla işletmenizi geleceğe hazırlayın.",
    icon: Cloud,
    image: promoCloud,
    overlay: "linear-gradient(180deg, rgba(10,8,30,0.35) 0%, rgba(10,8,30,0.25) 50%, rgba(10,8,30,0.4) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(139,92,246,0.2)",
    subtitleColor: "#A78BFA",
    subtitleBorder: "rgba(139,92,246,0.35)",
    descColor: "rgba(220,215,245,0.85)",
    btnBg: "rgba(255,255,255,0.12)",
    btnBorder: "rgba(255,255,255,0.2)",
    btnColor: "#E9D5FF",
  },
  {
    title: "Uni-dox ile Dijital Belge Yönetimini Keşfedin!",
    subtitle: "Size Özel 1.000 Kontör Hediye",
    description: "Dijital belge oluşturma, imzalama ve arşivleme süreçlerinizi hızlandırın. Uni-dox ile tüm evrak işleriniz tek platformda.",
    icon: FileText,
    image: promoUnidox,
    overlay: "linear-gradient(180deg, rgba(6,28,60,0.35) 0%, rgba(6,28,60,0.25) 50%, rgba(6,28,60,0.4) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(59,130,246,0.2)",
    subtitleColor: "#93C5FD",
    subtitleBorder: "rgba(59,130,246,0.35)",
    descColor: "rgba(220,230,250,0.85)",
    btnBg: "rgba(255,255,255,0.12)",
    btnBorder: "rgba(255,255,255,0.2)",
    btnColor: "#DBEAFE",
  },
  {
    title: "Param ile Ödemelerinizi Kolaylaştırın!",
    subtitle: "Size Özel %2,29 Komisyon Oranı",
    description: "Fiziksel ve sanal POS çözümleriyle tüm ödeme kanallarınızı avantajlı komisyon oranlarıyla yönetin.",
    icon: CreditCard,
    image: promoParam,
    overlay: "linear-gradient(180deg, rgba(30,10,60,0.35) 0%, rgba(30,10,60,0.25) 50%, rgba(30,10,60,0.4) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(168,85,247,0.2)",
    subtitleColor: "#C4B5FD",
    subtitleBorder: "rgba(168,85,247,0.35)",
    descColor: "rgba(230,220,255,0.85)",
    btnBg: "rgba(255,255,255,0.12)",
    btnBorder: "rgba(255,255,255,0.2)",
    btnColor: "#EDE9FE",
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
            className="relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col"
          >
            {/* Background image */}
            <img
              src={card.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{ background: card.overlay }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between flex-1">
              {/* Badge */}
              <span
                className="inline-flex items-center gap-1.5 self-start px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5"
                style={{
                  background: card.subtitleBg,
                  border: `1px solid ${card.subtitleBorder}`,
                  color: card.subtitleColor,
                  backdropFilter: "blur(8px)",
                }}
              >
                <card.icon className="w-3.5 h-3.5" />
                {card.subtitle}
              </span>

              {/* Title */}
              <h3
                className="font-bold leading-snug mb-3"
                style={{ fontSize: "clamp(22px, 2.5vw, 28px)", color: card.textColor, letterSpacing: "-0.02em" }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="mb-8"
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: card.descColor,
                  maxWidth: "380px",
                }}
              >
                {card.description}
              </p>

              {/* CTA */}
              <Link to="/kobi/step-1" className="self-start">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    background: card.btnBg,
                    border: `1px solid ${card.btnBorder}`,
                    color: card.btnColor,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  Detaylı Bilgi <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PromotionsSection;
