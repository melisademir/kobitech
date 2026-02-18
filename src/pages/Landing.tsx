import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDown, Search, ArrowRight, CreditCard, ShoppingCart, Calculator,
  Truck, Building2, Users, LayoutDashboard, Brain, Globe, Shield, Zap,
  BarChart3, Star, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

const stats = [
  { value: "10.000+", label: "Aktif KOBİ" },
  { value: "81 İl", label: "Türkiye Geneli" },
  { value: "50+", label: "Çözüm Ortağı" },
];

const solutions = [
  { icon: CreditCard, title: "Finans & Ödeme", desc: "Finansal süreçlerinizi dijitalleştirin", tags: ["Ödeme Çözümleri", "Dijital Finansal Yönetim", "Finansman Desteği"] },
  { icon: ShoppingCart, title: "E-Ticaret", desc: "Online satış kanallarınızı güçlendirin", tags: ["E-Ticaret Altyapısı", "Çoklu Kanal Satış", "Mağaza Çözümleri"] },
  { icon: Calculator, title: "Muhasebe & ERP", desc: "Mali süreçlerinizi otomatikleştirin", tags: ["Muhasebe Çözümleri", "ERP Yazılımı", "Fatura Yönetimi"] },
  { icon: Truck, title: "Lojistik & Operasyon", desc: "Tedarik zincirinizi optimize edin", tags: ["Kargo & Lojistik", "Depo Yönetimi", "Sipariş Takibi"] },
  { icon: Building2, title: "Kurumsal Teknoloji", desc: "Altyapınızı geleceğe hazırlayın", tags: ["Kurumsal Çözümler", "Global Şirket Kurulumu", "Bulut Altyapısı"] },
  { icon: Users, title: "İnsan Kaynakları", desc: "Ekibinizi en verimli şekilde yönetin", tags: ["İK Yönetimi", "Bordro Çözümleri", "Yetenek Arama"] },
];

const features = [
  { icon: LayoutDashboard, title: "Tek Panelde Yönetim", desc: "Lojistik, ödeme, e-ticaret, muhasebe — tüm iş süreçlerinizi tek ekrandan takip edin." },
  { icon: Brain, title: "Akıllı Yol Haritası", desc: "İşletmenize özel dijital dönüşüm planı oluşturuyor, adım adım yönlendiriyoruz." },
  { icon: Globe, title: "Globalleşme Desteği", desc: "Türkiye'den dünya pazarlarına açılmanız için altyapı ve partner ağı sunuyoruz." },
  { icon: Shield, title: "Güvenli Altyapı", desc: "Verileriniz şifreli, KVKK uyumlu altyapımızla güvende." },
  { icon: Zap, title: "Hızlı Entegrasyon", desc: "Mevcut sistemlerinize dakikalar içinde entegre olun, iş kaybı yaşamayın." },
  { icon: BarChart3, title: "Performans Analizi", desc: "Gerçek zamanlı raporlarla işletmenizin dijital performansını ölçün." },
];

const steps = [
  { num: "01", title: "Ücretsiz Kayıt Olun", desc: "Sadece ad-soyad ve telefon numaranızla 2 dakikada kayıt olun." },
  { num: "02", title: "İşletmenizi Tanımlayın", desc: "Sektörünüzü ve ihtiyaçlarınızı belirleyin, size özel çözümler sunalım." },
  { num: "03", title: "Dijitalleşmeye Başlayın", desc: "Yol haritanızı takip edin, partnerlerimizle büyümeye başlayın." },
];

const testimonials = [
  { name: "Ahmet Yılmaz", role: "Tekstil İhracatçısı", text: "Dijital Esnaf sayesinde ilk kez yurt dışına satış yapmaya başladık. Süreçler inanılmaz kolaylaştı.", stars: 5 },
  { name: "Fatma Demir", role: "Gıda Üreticisi", text: "Muhasebe ve e-fatura entegrasyonu hayatımı kurtardı. Artık kağıt işleriyle uğraşmıyorum.", stars: 5 },
  { name: "Mehmet Kaya", role: "Mobilya Atölyesi", text: "E-ticaret mağazamı kurdum, siparişlerim %200 arttı. Harika bir platform.", stars: 5 },
  { name: "Ayşe Çelik", role: "El Sanatları", text: "Sosyal medya yönetimi ve online satış kanallarını birlikte yürütebiliyorum.", stars: 4 },
  { name: "Hasan Öztürk", role: "Oto Yedek Parça", text: "Stok takibi ve kargo entegrasyonu mükemmel çalışıyor. Çok memnunum.", stars: 5 },
  { name: "Zeynep Arslan", role: "Kozmetik Markası", text: "Global pazara açılmak istiyorduk, Dijital Esnaf tam da bunu sağladı.", stars: 5 },
];

const partners = ["Param", "İkas", "Kariyer.net", "Google", "Microsoft", "e-Dönüşümler", "KAGİDER", "TOBB"];

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

      {/* HERO */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              Türkiye'nin KOBİ Dijitalleşme Platformu
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
              İşletmenizin tüm dijital<br />ihtiyaçları <span className="text-gradient-primary">tek platformda!</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Dijitalleşin, verimli çalışın, dünyaya açılın. Yerelden küresele, yanınızdayız.
            </p>
            <div className="flex max-w-lg mx-auto gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Dijital dönüşüm çözümlerini keşfedin..."
                  className="pl-12 h-14 rounded-xl border-2 border-border focus:border-primary text-base"
                />
              </div>
              <Button asChild variant="hero" size="lg" className="h-14 px-8 rounded-xl">
                <Link to="/kobi/urunler">Keşfet</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-12 border-y border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
              <p className="text-2xl md:text-4xl font-extrabold text-gradient-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS ECOSYSTEM */}
      <section id="solutions" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Çözüm Ekosistemi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Globalleşirken Yalnız Değilsin</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">İşletmenizin her ihtiyacı için doğru çözüm ortağı ekosistemimizde</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-card rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - Neden Dijital Esnaf? */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">Neden Dijital Esnaf?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Bankacılık ve Dijital Çözümler,<br />İşletmeniz İçin Tek Platformda</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Sadece dijitalleştirmiyoruz; KOBİ'nizi Türkiye'den alıp globale taşıyacak ölçeklenebilir altyapı kuruyoruz.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-background rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Nasıl Çalışır?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Dijitalleşmeye 3 Adımda Başlayın</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.num} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary text-primary-foreground font-extrabold text-xl flex items-center justify-center mb-5 shadow-premium">{s.num}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-semibold mb-4">Başarı Hikayeleri</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">KOBİ'lerden Geri Bildirimler</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-background rounded-2xl p-7 border border-border shadow-card">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-foreground text-sm mb-5 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className={`h-4 w-4 ${si < t.stars ? "text-warning fill-warning" : "text-border"}`} />
                  ))}
                </div>
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">İş Ortakları</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Güvenilir İş Ortaklarımız</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((p, i) => (
              <motion.div key={p} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="px-8 py-4 bg-card rounded-xl border border-border shadow-card text-foreground font-bold text-sm hover:shadow-card-hover transition-shadow">
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">Başlamaya Hazır Mısınız?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Dijital Dönüşümünüz Burada Başlıyor</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/kobi/welcome">Hemen Başla <ArrowRight className="h-5 w-5 ml-1" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how">Nasıl Çalışır?</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
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
