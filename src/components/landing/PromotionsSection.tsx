import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Cloud, FileText, CreditCard } from "lucide-react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import promoAiChat from "@/assets/promo-ai-chat.jpg";
import promoCloudTech from "@/assets/promo-cloud-tech.jpg";
import promoDocuments from "@/assets/promo-documents.jpg";
import promoPayment from "@/assets/promo-payment.jpg";

const cards = [
  {
    title: "Sektörden Haber Veren AI Agent'ımız ile Tanışın!",
    bubble: "İlk 100 Bülten Ücretsiz!",
    description: "Sektörünüzdeki güncel gelişmeleri, trendleri ve fırsatları yapay zeka destekli asistanımızla anında öğrenin.",
    icon: MessageSquare,
    image: promoAiChat,
    badgeBg: "rgba(99,102,241,0.18)",
    badgeBorder: "rgba(99,102,241,0.35)",
    badgeColor: "#6366F1",
    overlayColor: "rgba(15,25,60,0.25)",
    btnBg: "rgba(99,102,241,0.2)",
    btnBorder: "rgba(99,102,241,0.4)",
    btnColor: "#A5B4FC",
  },
  {
    title: "ParamTECH Cloud ile İşletmenizi Dijitale Taşıyın!",
    bubble: "2 Ay Ücretsiz!",
    description: "Bulut altyapısı, veri yönetimi ve siber güvenlik araçları ile işletmenizi kesintisiz büyütün.",
    icon: Cloud,
    image: promoCloudTech,
    badgeBg: "rgba(59,130,246,0.18)",
    badgeBorder: "rgba(59,130,246,0.35)",
    badgeColor: "#3B82F6",
    overlayColor: "rgba(10,20,50,0.22)",
    btnBg: "rgba(59,130,246,0.2)",
    btnBorder: "rgba(59,130,246,0.4)",
    btnColor: "#93C5FD",
  },
  {
    title: "Uni-dox ile e-Dönüşümünüzü Tamamlayın!",
    bubble: "1000 Kontör Ücretsiz!",
    description: "e-Fatura, e-İrsaliye, e-Defter, e-Mutabakat ve e-Arşiv süreçlerinizi tek platformda yönetin.",
    icon: FileText,
    image: promoDocuments,
    badgeBg: "rgba(34,197,94,0.15)",
    badgeBorder: "rgba(34,197,94,0.35)",
    badgeColor: "#16A34A",
    overlayColor: "rgba(30,20,10,0.20)",
    btnBg: "rgba(34,197,94,0.2)",
    btnBorder: "rgba(34,197,94,0.4)",
    btnColor: "#86EFAC",
  },
  {
    title: "Param ile Ödeme Almayı Kolaylaştırın!",
    bubble: "Size Özel %2,29\nKomisyon Oranı!",
    description: "Fiziki, sanal ve cep POS çözümleri ile tüm ödemelerinizi avantajlı komisyon oranlarıyla alın.",
    icon: CreditCard,
    image: promoPayment,
    badgeBg: "rgba(168,85,247,0.15)",
    badgeBorder: "rgba(168,85,247,0.35)",
    badgeColor: "#A855F7",
    overlayColor: "rgba(30,15,50,0.20)",
    btnBg: "rgba(168,85,247,0.2)",
    btnBorder: "rgba(168,85,247,0.4)",
    btnColor: "#C4B5FD",
  },
];

const PromoCard = ({ card, i }: { card: typeof cards[number]; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
    className="group relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col cursor-pointer"
    style={{
      boxShadow: "0 0 0 1.5px rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.12)",
      border: "1.5px solid rgba(255,255,255,0.18)",
      backdropFilter: "blur(2px)",
    }}
    whileHover={{
      y: -8,
      transition: { type: "spring", stiffness: 300, damping: 18 },
    }}
  >
    <div className="absolute inset-0 z-30 pointer-events-none rounded-2xl" style={{
      boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.25)",
    }} />
    <img
      src={card.image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-bottom"
      aria-hidden="true"
    />
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(180deg, ${card.overlayColor} 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.05) 60%, ${card.overlayColor} 85%, rgba(0,0,0,0.50) 100%)`,
      }}
    />
    <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between flex-1">
      <div>
        <h3
          className="font-extrabold leading-snug mb-3 text-white"
          style={{ fontSize: "clamp(22px, 2.5vw, 28px)", letterSpacing: "-0.025em", textShadow: "0 2px 16px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)" }}
        >
          {card.title}
        </h3>
        <p
          className="mb-4 text-white/90"
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            maxWidth: "380px",
            textShadow: "0 1px 10px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.35)",
          }}
        >
          {card.description}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: "backOut" }}
        className="absolute bottom-44 left-0 md:left-0 z-20 px-6 py-3.5 rounded-r-2xl rounded-l-none text-base font-extrabold leading-snug text-left whitespace-pre-line shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
          color: "#1E1B4B",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.2)",
        }}
      >
        {card.bubble}
      </motion.div>
      <div>
        <Link to="/digitalhub/onboarding1" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors group/btn">
          İncele
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const PromotionsSection = () => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  if (!isMobile) {
    return (
      <section className="py-20 md:py-[120px]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <PromoCard key={i} card={card} i={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-[120px]">
      <div className="px-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {cards.map((card, i) => (
              <div key={i} className="flex-[0_0_85%] min-w-0">
                <PromoCard card={card} i={i} />
              </div>
            ))}
          </div>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {cards.map((_, i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === selectedIndex ? "hsl(265,80%,55%)" : "hsl(265,20%,80%)",
                transform: i === selectedIndex ? "scale(1.3)" : "scale(1)",
              }}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
