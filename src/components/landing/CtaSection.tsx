import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import promoPayment from "@/assets/promo-payment.jpg";
import promoCloud from "@/assets/promo-cloud.jpg";
import promoAiAgent from "@/assets/promo-ai-agent.jpg";

interface LinkCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    transition: { type: "spring" as const, stiffness: 300, damping: 15 }
  }
};

const LinkCard = ({ title, description, imageUrl, href }: LinkCardProps) => (
  <Link to={href}>
    <motion.div
      className="relative overflow-hidden cursor-pointer h-full"
      style={{
        borderRadius: "12px",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img src={imageUrl} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,15,30,0.80) 100%)" }} />
      </div>
      <div className="p-5">
        <h3 className="text-white font-bold text-base mb-1" style={{ letterSpacing: "-0.02em" }}>{title}</h3>
        <p className="text-sm" style={{ color: "#94A3B8", lineHeight: 1.6 }}>{description}</p>
        <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: "#00D4AA" }}>
          Keşfet <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  </Link>
);

const cardData = [
  {
    title: "50+ Dijital Çözüm",
    description: "Ödeme, e-ticaret, stok, kargo ve daha fazlası tek platformda.",
    imageUrl: promoPayment,
    href: "/digitalhub/products"
  },
  {
    title: "30+ Çözüm Ortağı",
    description: "Sektör lideri sağlayıcılarla güçlü bir ekosistem.",
    imageUrl: promoCloud,
    href: "/digitalhub/products"
  },
  {
    title: "Yapay Zeka Desteği",
    description: "AI destekli analizlerle işletmenizi bir adım öne taşıyın.",
    imageUrl: promoAiAgent,
    href: "/digitalhub/onboarding1"
  }
];

const CtaSection = () => (
  <section className="py-20 md:py-[120px]" style={{ paddingTop: "calc(4% + 80px)" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          İşletmenizi Dijitalde Büyütmeye
          <br />
          <span style={{ color: "#00D4AA" }}>Hazır mısınız?</span>
        </h2>
        <p className="text-base md:text-lg" style={{ lineHeight: 1.7, color: "#94A3B8", maxWidth: "480px", margin: "0 auto" }}>
          50+ dijital çözüm, 30+ çözüm ortağı. Tek platformda tüm ihtiyaçlarınıza yanıt bulun.
        </p>
      </div>

      {/* Cards removed */}

      {/* CTA Button */}
      <div className="text-center">
        <Link to="/digitalhub/onboarding1">
          <ButtonColorful label="Hemen Başla" className="min-w-[260px]" />
        </Link>
      </div>
    </div>
  </section>
);

export default CtaSection;
