import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, TrendingUp, Users, Package, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">K</div>
            <span className="text-lg font-extrabold text-foreground tracking-tight">KOBİ DİJİTAL</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#solutions" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Çözümlerimiz</a>
            <a href="#how" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Nasıl Çalışır?</a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">İletişim</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setLoginOpen(!loginOpen)} className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                Giriş Yap <ChevronDown className="h-4 w-4" />
              </button>
              {loginOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-premium border border-border overflow-hidden z-50">
                  <Link to="/kobi/login" onClick={() => setLoginOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 text-foreground hover:text-primary transition-colors">
                    🏢 KOBİ Girişi
                  </Link>
                  <Link to="/login" onClick={() => setLoginOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 text-foreground hover:text-primary transition-colors">
                    🎯 Bayi Girişi
                  </Link>
                </div>
              )}
            </div>
            <Button asChild variant="hero" size="sm">
              <Link to="/kobi/signup">Ücretsiz Başla</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Dijital Dönüşümle<br /><span className="text-gradient-primary">İşinizi Büyütün</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Ödeme, muhasebe, stok, ERP ve e-ticaret çözümlerini tek platformdan yönetin. 10.000+ KOBİ'nin güvendiği dijital dönüşüm partneri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/kobi/signup">KOBİ Olarak Başla <ArrowRight className="h-5 w-5 ml-1" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/signup">Bayi Olarak Katıl</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "10,000+", label: "KOBİ" },
            { value: "500+", label: "Bayi" },
            { value: "50+", label: "Ortak" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-extrabold text-gradient-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KOBİ Features */}
      <section id="solutions" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">KOBİ'ler İçin</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">İşletmenize özel dijital dönüşüm yol haritası ve 21+ çözüm</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Hızlı Başlangıç", desc: "3 adımda işletmenizi tanımlayın, size özel çözümleri keşfedin" },
              { icon: Package, title: "21+ Çözüm", desc: "Ödeme, muhasebe, ERP, e-ticaret ve daha fazlası tek çatı altında" },
              { icon: Shield, title: "Güvenli Altyapı", desc: "ParamTech güvencesiyle tüm verileriniz güvende" },
            ].map(f => (
              <div key={f.title} className="bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bayi Features */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">Bayiler İçin</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Satış süreçlerinizi güçlendirin, komisyonlarınızı artırın</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Performans Takibi", desc: "Satış hedeflerinizi ve komisyonlarınızı anlık takip edin" },
              { icon: Users, title: "Müşteri Analizi", desc: "Sektör bazlı müşteri analizi ve akıllı ürün önerileri" },
              { icon: BarChart3, title: "Teklif Yönetimi", desc: "Profesyonel teklifler oluşturun, süreçleri yönetin" },
            ].map(f => (
              <div key={f.title} className="bg-background rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Nasıl Çalışır?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Kayıt Olun", desc: "İşletme bilgilerinizi girin, sektörünüzü ve hedeflerinizi seçin" },
              { step: "2", title: "Keşfedin", desc: "Size özel dijital dönüşüm haritanızı ve çözümleri keşfedin" },
              { step: "3", title: "Başlayın", desc: "Çözümleri sepetinize ekleyin, teklif alın ve dijitalleşin" },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full gradient-primary text-primary-foreground font-bold text-xl flex items-center justify-center mb-4">{s.step}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">K</div>
                <span className="font-bold">KOBİ DİJİTAL</span>
              </div>
              <p className="text-sm text-secondary-foreground/70">ParamTech tarafından geliştirilmiştir.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Hızlı Linkler</h4>
              <div className="space-y-2 text-sm text-secondary-foreground/70">
                <Link to="/kobi/signup" className="block hover:text-primary">KOBİ Kaydı</Link>
                <Link to="/login" className="block hover:text-primary">Bayi Girişi</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">İletişim</h4>
              <p className="text-sm text-secondary-foreground/70">info@paramtech.com.tr</p>
              <p className="text-sm text-secondary-foreground/70">+90 212 XXX XX XX</p>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/10 mt-8 pt-8 text-center text-sm text-secondary-foreground/50">
            © 2026 KOBİ DİJİTAL. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
