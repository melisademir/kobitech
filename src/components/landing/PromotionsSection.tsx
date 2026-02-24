import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Sektörden Haberler Veren AI Agent'ımız ile Tanışın!",
    subtitle: "Size Özel 1.000 Chat Hediye",
    description: "Sektörünüzdeki güncel gelişmeleri, trendleri ve fırsatları yapay zeka destekli asistanımızla anında öğrenin.",
    icon: MessageSquare,
    gradient: "linear-gradient(145deg, hsl(210,45%,92%) 0%, hsl(220,50%,85%) 100%)",
    textColor: "hsl(220,40%,20%)",
    subtitleBg: "rgba(99,102,241,0.15)",
    subtitleColor: "#6366F1",
    subtitleBorder: "rgba(99,102,241,0.3)",
  },
  {
    title: "ParamTECH Cloud ile İşletmenizi Dijitale Taşıyın!",
    subtitle: "Size Özel 2 Ay Ücretsiz",
    description: "Bulut altyapısı, veri yönetimi ve dijital araçlarla işletmenizi geleceğe hazırlayın.",
    icon: Cloud,
    gradient: "linear-gradient(145deg, hsl(230,35%,14%) 0%, hsl(240,40%,18%) 100%)",
    textColor: "#FFFFFF",
    subtitleBg: "rgba(139,92,246,0.2)",
    subtitleColor: "#A78BFA",
    subtitleBorder: "rgba(139,92,246,0.35)",
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
            className="relative rounded-2xl overflow-hidden p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
            style={{
              background: card.gradient,
              border: i === 1 ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-1.5 self-start px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5"
              style={{
                background: card.subtitleBg,
                border: `1px solid ${card.subtitleBorder}`,
                color: card.subtitleColor,
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
                color: i === 1 ? "rgba(196,181,253,0.75)" : "rgba(30,30,60,0.6)",
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
                  background: i === 1 ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                  border: i === 1 ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
                  color: i === 1 ? "#E9D5FF" : "hsl(220,40%,25%)",
                }}
              >
                Detaylı Bilgi <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PromotionsSection;
