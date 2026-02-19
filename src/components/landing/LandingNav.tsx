import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingNav = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-xl font-extrabold text-foreground tracking-tight">
            Param<span className="text-accent">TECH</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#solutions" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Çözümlerimiz</a>
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Özellikler</a>
          <a href="#how" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Nasıl Çalışır?</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">İletişim</a>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Portal <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {loginOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-premium border border-border overflow-hidden z-50">
                <Link to="/kobi/login" onClick={() => setLoginOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted text-foreground transition-colors">
                  🏢 KOBİ Girişi
                </Link>
                <Link to="/login" onClick={() => setLoginOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted text-foreground transition-colors">
                  🎯 Bayi Girişi
                </Link>
              </div>
            )}
          </div>
          <Button asChild variant="accent" size="sm">
            <Link to="/kobi/step-1">Giriş Yap</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
