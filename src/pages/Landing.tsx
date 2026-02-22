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


const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* 1 — HERO: Light ivory with glass & soft purple blobs */}
    <div
      className="relative"
      style={{
        background: "linear-gradient(145deg, hsl(38,60%,98%) 0%, hsl(265,50%,96%) 55%, hsl(38,50%,97%) 100%)",
      }}
    >
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>

    {/* 2 — PARTNERS / SOLUTIONS: Faint lavender-cream gradient */}
    <div style={{ background: "linear-gradient(160deg, hsl(38,55%,97%) 0%, hsl(265,40%,96%) 100%)" }}>
      <PartnersSection />
    </div>

    {/* 3 — PARTNER ECOSYSTEM: Warm off-white */}
    <div style={{ background: "hsl(38, 30%, 97%)" }}>
      <PartnerEcosystemSection />
    </div>

    {/* 4 — FEATURES / HUB: Ivory */}
    <div style={{ background: "hsl(38, 60%, 98%)" }}>
      <FeaturesSection />
    </div>

    {/* 5 — HOW IT WORKS: Deep navy */}
    <div style={{ background: "hsl(258, 45%, 10%)" }}>
      <HowItWorksSection />
    </div>

    {/* 6 — STATS */}
    <div style={{ background: "hsl(38, 60%, 98%)" }}>
      <StatsSection />
    </div>

    {/* 7 — TESTIMONIALS: Ivory */}
    <div style={{ background: "hsl(38, 60%, 98%)" }}>
      <TestimonialsSection />
    </div>

    {/* 8 — CTA: Lavender-cream gradient */}
    <div style={{ background: "linear-gradient(160deg, hsl(265,40%,96%) 0%, hsl(38,55%,97%) 100%)" }}>
      <CtaSection />
    </div>

    {/* 9 — TRUST BAND: Warm white */}
    <div style={{ background: "hsl(38, 30%, 97%)", borderTop: "1px solid hsl(43,65%,52%,0.15)" }}>
      <TrustBand />
    </div>

    <FooterSection />
  </div>
);

export default Landing;
