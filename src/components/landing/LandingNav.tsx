import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingNav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-extrabold text-primary tracking-tight">
            Param<span className="text-accent">TECH</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-primary hover:text-accent transition-colors">Anasayfa</a>
          <a href="#solutions" className="text-sm font-medium text-primary hover:text-accent transition-colors">Çözümler</a>
          <a href="#how" className="text-sm font-medium text-primary hover:text-accent transition-colors">Nasıl Çalışır?</a>
          <a href="#contact" className="text-sm font-medium text-primary hover:text-accent transition-colors">İletişim</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/kobi/signup" className="text-sm font-semibold text-primary hover:text-accent transition-colors hidden sm:block">
            Kayıt Ol
          </Link>
          <Button asChild variant="accent" size="sm" className="rounded-full px-6">
            <Link to="/kobi/login">Giriş Yap</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
