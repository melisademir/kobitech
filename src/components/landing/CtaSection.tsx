import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

const LinkCard = ({ title, description, imageUrl, href }: LinkCardProps) =>
<Link to={href}>
    






























  
  </Link>;


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
}];


const CtaSection = () =>
<section className="py-24 md:py-32">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[24px]"
      style={{
        padding: "56px 40px",
        background: "linear-gradient(145deg, hsl(258,45%,10%) 0%, hsl(268,50%,18%) 100%)",
        boxShadow: "0 2px 8px rgba(72,11,135,0.11), 0 16px 48px rgba(72,11,135,0.18)"
      }}>
      
        {/* Header */}
        <div className="text-center mb-10">
          <h2
          className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}>
          
            İşletmenizi Dijitalde Büyütmeye
            <br />
            <span className="text-gradient-primary">Hazır mısınız?</span>
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(196,181,253,0.8)", maxWidth: "480px", margin: "0 auto" }}>
            50+ dijital çözüm, 30+ çözüm ortağı. Tek platformda tüm ihtiyaçlarınıza yanıt bulun.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {cardData.map((card) =>
        <LinkCard key={card.title} {...card} />
        )}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/digitalhub/onboarding1">
            <button
            className="inline-flex items-center gap-2 text-white font-bold transition-all duration-200"
            style={{
              height: "56px",
              padding: "0 48px",
              borderRadius: "24px",
              fontSize: "16px",
              background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.45)",
              minWidth: "260px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #6D28D9, #7C3AED)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(124,58,237,0.60)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #7C3AED, #8B5CF6)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.45)";
            }}>
            
              Hemen Başla <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>;


export default CtaSection;