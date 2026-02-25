import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Cloud, FileText, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import promoAiChat from "@/assets/promo-ai-chat.jpg";
import promoCloudTech from "@/assets/promo-cloud-tech.jpg";
import promoDocuments from "@/assets/promo-documents.jpg";
import promoPayment from "@/assets/promo-payment.jpg";

const cards = [
  {
    title: "Size Özel 1.000 Chat Hediye — AI Agent'ımız ile Tanışın!",
    description: "1.000 chat hediyenizle sektörünüzdeki güncel gelişmeleri, trendleri ve fırsatları yapay zeka destekli asistanımızla anında öğrenin.",
    icon: MessageSquare,
    image: promoAiChat,
    overlay: "linear-gradient(180deg, rgba(15,10,35,0.78) 0%, rgba(15,10,35,0.58) 50%, rgba(15,10,35,0.82) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(99,102,241,0.2)",
    subtitleColor: "#A5B4FC",
    subtitleBorder: "rgba(99,102,241,0.35)",
    descColor: "rgba(210,215,230,0.8)",
    btnBg: "rgba(255,255,255,0.1)",
    btnBorder: "rgba(255,255,255,0.18)",
    btnColor: "#E0E7FF",
  },
  {
    title: "2 Ay Ücretsiz — ParamTECH Cloud ile Dijitale Taşıyın!",
    description: "2 ay ücretsiz deneme ile bulut altyapısı, veri yönetimi ve dijital araçlarla işletmenizi geleceğe hazırlayın.",
    icon: Cloud,
    image: promoCloudTech,
    overlay: "linear-gradient(180deg, rgba(10,8,30,0.72) 0%, rgba(15,12,40,0.55) 50%, rgba(10,8,30,0.78) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(139,92,246,0.2)",
    subtitleColor: "#A78BFA",
    subtitleBorder: "rgba(139,92,246,0.35)",
    descColor: "rgba(196,181,253,0.75)",
    btnBg: "rgba(255,255,255,0.1)",
    btnBorder: "rgba(255,255,255,0.15)",
    btnColor: "#E9D5FF",
  },
  {
    title: "1.000 Kontör Hediye — Uni-dox ile Belge Yönetimini Keşfedin!",
    description: "1.000 kontör hediyenizle dijital belge oluşturma, imzalama ve arşivleme süreçlerinizi hızlandırın. Uni-dox ile tüm evrak işleriniz tek platformda.",
    icon: FileText,
    image: promoDocuments,
    overlay: "linear-gradient(180deg, rgba(6,28,60,0.78) 0%, rgba(10,20,50,0.58) 50%, rgba(6,28,60,0.82) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(59,130,246,0.2)",
    subtitleColor: "#93C5FD",
    subtitleBorder: "rgba(59,130,246,0.35)",
    descColor: "rgba(191,219,254,0.8)",
    btnBg: "rgba(255,255,255,0.1)",
    btnBorder: "rgba(255,255,255,0.18)",
    btnColor: "#DBEAFE",
  },
  {
    title: "%2,29 Komisyon Oranı — Param ile Ödemelerinizi Kolaylaştırın!",
    description: "Özel %2,29 komisyon oranıyla fiziksel ve sanal POS çözümleri sayesinde tüm ödeme kanallarınızı avantajlı şekilde yönetin.",
    icon: CreditCard,
    image: promoPayment,
    overlay: "linear-gradient(180deg, rgba(30,10,60,0.76) 0%, rgba(40,15,70,0.55) 50%, rgba(30,10,60,0.8) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(168,85,247,0.2)",
    subtitleColor: "#C4B5FD",
    subtitleBorder: "rgba(168,85,247,0.35)",
    descColor: "rgba(216,200,255,0.8)",
    btnBg: "rgba(255,255,255,0.1)",
    btnBorder: "rgba(255,255,255,0.15)",
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
            {/* Center text-safe zone */}
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 70% 50% at center, rgba(0,0,0,0.35) 0%, transparent 100%)" }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center items-center text-center flex-1">
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
