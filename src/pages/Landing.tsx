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

    {/* 2 — STATS: Pure white, clean contrast after dark hero */}
    <div className="bg-white">
      <StatsSection />
    </div>

    {/* 3 — PARTNERS / SOLUTIONS: Very light lila atmosphere */}
    <div style={{ background: "hsl(252, 60%, 97%)" }}>
      <PartnersSection />
    </div>

    {/* 4 — PARTNER ECOSYSTEM: Light grey — puzzle showcase */}
    <div style={{ background: "#F9FAFB" }}>
      <PartnerEcosystemSection />
    </div>

    {/* 5 — FEATURES / HUB: Pure white — high contrast cards */}
    <div className="bg-white">
      <FeaturesSection />
    </div>

    {/* 6 — HOW IT WORKS: Deep navy again — creates rhythm contrast */}
    <div style={{ background: "hsl(258, 45%, 10%)" }}>
      <HowItWorksSection />
    </div>

    {/* 7 — CTA: Soft lila */}
    <div style={{ background: "hsl(252, 60%, 97%)" }}>
      <CtaSection />
    </div>

    {/* 8 — TESTIMONIALS: White — calm close */}
    <div className="bg-white">
      <TestimonialsSection />
    </div>

    {/* 9 — TRUST BAND: Partner logos before footer */}
    <div className="bg-white border-t border-slate-100">
      <TrustBand />
    </div>

    <FooterSection />
  </div>
);

export default Landing;
