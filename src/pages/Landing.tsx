import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PartnersSection from "@/components/landing/PartnersSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaSection from "@/components/landing/CtaSection";
import FooterSection from "@/components/landing/FooterSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustBand from "@/components/landing/TrustBand";
import PartnerEcosystemSection from "@/components/landing/PartnerEcosystemSection";
import heroBg from "@/assets/hero-bg.png";

const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* 1 — HERO: Koyu ceviz/ahşap atmosferi */}
    <div className="relative" style={{ background: "hsl(25, 38%, 8%)" }}>
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-15 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(25,38%,8%)] pointer-events-none" />
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>

    {/* 2 — STATS: Fildişi krem, cevizden yumuşak geçiş */}
    <div style={{ background: "hsl(38, 25%, 98%)" }}>
      <StatsSection />
    </div>

    {/* 3 — TRUST BAND: Krem, minimal logo şeridi */}
    <div style={{ background: "hsl(38, 25%, 98%)", borderTop: "1px solid hsl(38,20%,92%)" }}>
      <TrustBand />
    </div>

    {/* 4 — PARTNERS / SOLUTIONS: Sıcak amber/krem atmosferi */}
    <div style={{ background: "hsl(38, 55%, 96%)" }}>
      <PartnersSection />
    </div>

    {/* 5 — PARTNER ECOSYSTEM: Açık krem */}
    <div style={{ background: "hsl(35, 30%, 97%)" }}>
      <PartnerEcosystemSection />
    </div>

    {/* 6 — FEATURES: Saf krem, yüksek kontrast kartlar */}
    <div style={{ background: "hsl(38, 25%, 98%)" }}>
      <FeaturesSection />
    </div>

    {/* 7 — HOW IT WORKS: Koyu ceviz, ritim kırıcı */}
    <div style={{ background: "hsl(25, 38%, 8%)" }}>
      <HowItWorksSection />
    </div>

    {/* 8 — CTA: Sıcak amber lila */}
    <div style={{ background: "hsl(38, 55%, 96%)" }}>
      <CtaSection />
    </div>

    {/* 9 — TESTIMONIALS: Krem, sakin kapanış */}
    <div style={{ background: "hsl(38, 25%, 98%)" }}>
      <TestimonialsSection />
    </div>

    <FooterSection />
  </div>
);

export default Landing;
