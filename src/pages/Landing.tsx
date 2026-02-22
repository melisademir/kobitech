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

/* Shared section divider — horizontal gradient line */
const SectionDivider = () => (
  <div className="flex justify-center">
    <div
      style={{
        width: "80%",
        height: "2px",
        background: "linear-gradient(90deg, transparent 0%, rgba(109,40,217,0.18) 30%, rgba(109,40,217,0.18) 70%, transparent 100%)",
      }}
    />
  </div>
);

const Landing = () => (
  <div className="min-h-screen bg-background">
    {/* 1 — HERO */}
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

    {/* 2 — PARTNERS / SOLUTIONS */}
    <div style={{ background: "linear-gradient(160deg, hsl(38,55%,97%) 0%, hsl(265,40%,96%) 100%)" }}>
      <PartnersSection />
    </div>

    <SectionDivider />

    {/* 3 — PARTNER ECOSYSTEM */}
    <div style={{ background: "linear-gradient(180deg, hsl(38,30%,97%) 0%, hsl(252,30%,97%) 100%)" }}>
      <PartnerEcosystemSection />
    </div>

    <SectionDivider />

    {/* 4 — FEATURES */}
    <div style={{ background: "linear-gradient(180deg, hsl(38,60%,98%) 0%, hsl(252,25%,97%) 100%)" }}>
      <FeaturesSection />
    </div>

    {/* 5 — HOW IT WORKS */}
    <div style={{ background: "hsl(258, 45%, 10%)" }}>
      <HowItWorksSection />
    </div>

    {/* 6 — STATS + TESTIMONIALS grouped */}
    <div style={{ background: "linear-gradient(180deg, hsl(38,60%,98%) 0%, hsl(252,20%,97%) 100%)" }}>
      <StatsSection />
      <SectionDivider />
      <TestimonialsSection />
    </div>

    {/* 7 — CTA */}
    <div style={{ background: "linear-gradient(160deg, hsl(265,40%,96%) 0%, hsl(38,55%,97%) 100%)" }}>
      <CtaSection />
    </div>

    <SectionDivider />

    {/* 8 — TRUST BAND */}
    <div style={{ background: "hsl(38, 30%, 97%)", borderTop: "1px solid hsl(43,65%,52%,0.15)" }}>
      <TrustBand />
    </div>

    <FooterSection />
  </div>
);

export default Landing;
