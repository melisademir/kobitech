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
    {/* 1 — HERO: Deep navy / dark atmosphere */}
    <div className="relative" style={{ background: "hsl(258, 45%, 10%)" }}>
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(258,45%,10%)] pointer-events-none" />
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>

    {/* 2 — STATS: Warm ivory */}
    <div style={{ background: "hsl(38, 60%, 98%)" }}>
      <StatsSection />
    </div>

    {/* 3 — PARTNERS / SOLUTIONS: Faint lavender-cream gradient */}
    <div style={{ background: "linear-gradient(160deg, hsl(38,55%,97%) 0%, hsl(265,40%,96%) 100%)" }}>
      <PartnersSection />
    </div>

    {/* 4 — PARTNER ECOSYSTEM: Warm off-white */}
    <div style={{ background: "hsl(38, 30%, 97%)" }}>
      <PartnerEcosystemSection />
    </div>

    {/* 5 — FEATURES / HUB: Ivory */}
    <div style={{ background: "hsl(38, 60%, 98%)" }}>
      <FeaturesSection />
    </div>

    {/* 6 — HOW IT WORKS: Deep navy again — creates rhythm contrast */}
    <div style={{ background: "hsl(258, 45%, 10%)" }}>
      <HowItWorksSection />
    </div>

    {/* 7 — CTA: Lavender-cream gradient */}
    <div style={{ background: "linear-gradient(160deg, hsl(265,40%,96%) 0%, hsl(38,55%,97%) 100%)" }}>
      <CtaSection />
    </div>

    {/* 8 — TESTIMONIALS: Ivory */}
    <div style={{ background: "hsl(38, 60%, 98%)" }}>
      <TestimonialsSection />
    </div>

    {/* 9 — TRUST BAND: Warm white */}
    <div style={{ background: "hsl(38, 30%, 97%)", borderTop: "1px solid hsl(43,65%,52%,0.15)" }}>
      <TrustBand />
    </div>

    <FooterSection />
  </div>
);

export default Landing;
