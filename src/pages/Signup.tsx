import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import loginHero from "@/assets/login-hero.png";

const cities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep",
  "Mersin", "Diyarbakır", "Kayseri", "Eskişehir", "Samsun", "Denizli", "Trabzon",
  "Malatya", "Sakarya", "Manisa", "Balıkesir", "Kocaeli",
];

const sectors = ["Perakende", "Üretim", "Tekstil", "Gıda", "E-ticaret", "Hizmet", "Teknoloji", "Sağlık"];

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: "", name: "", email: "", phone: "", city: "",
    sectors: [] as string[], experience: "", referral: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));
  const toggleSector = (s: string) =>
    setForm((p) => ({
      ...p,
      sectors: p.sectors.includes(s) ? p.sectors.filter((x) => x !== s) : [...p.sectors, s],
    }));

  const isValid = form.company && form.name && form.email && form.phone && form.city && agreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/application-confirmation");
    }, 800);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden flex-col justify-between p-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-2xl">🎯</div>
            <span className="text-2xl font-extrabold text-primary-foreground tracking-tight">SALESPARTNER</span>
          </div>
          <p className="text-primary-foreground/70 text-sm ml-[52px]">Param Satış Platformu</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-6">
          <h2 className="text-4xl font-bold text-primary-foreground leading-tight">
            Param Bayisi Olun
          </h2>
          <p className="text-primary-foreground/80 text-lg">Kazançlı bir iş ortaklığına hazır mısınız?</p>

          <div className="space-y-4">
            {[
              { icon: "💰", text: "Yüksek komisyon oranları (%15-20)" },
              { icon: "📦", text: "21 farklı ürün portföyü" },
              { icon: "🎯", text: "Akıllı satış asistanı" },
              { icon: "📈", text: "Detaylı performans raporları" },
              { icon: "🏆", text: "Eğitim ve destek" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-3 text-primary-foreground/90">
                <span className="text-xl">{b.icon}</span>
                <span className="font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div />
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-card overflow-y-auto">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-[500px] space-y-6 py-8">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <span className="text-2xl">🎯</span>
            <span className="text-xl font-extrabold text-primary">SALESPARTNER</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground">Bayilik Başvurusu</h1>
            <p className="text-muted-foreground mt-2">Formu tamamlayın, 2 iş günü içinde dönüş yapalım</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Şirket Adınız *</label>
              <Input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Örn: ABC Bilişim Ltd." className="h-12 border-2 focus:border-primary rounded-lg" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Yetkili Adı Soyadı *</label>
              <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ad Soyad" className="h-12 border-2 focus:border-primary rounded-lg" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">E-posta *</label>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="ornek@sirket.com" className="h-12 border-2 focus:border-primary rounded-lg" />
                <p className="text-xs text-muted-foreground">Giriş için kullanılacak</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefon *</label>
                <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+90 5XX XXX XX XX" className="h-12 border-2 focus:border-primary rounded-lg" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Şehir *</label>
              <Select onValueChange={(v) => update("city", v)}>
                <SelectTrigger className="h-12 border-2 focus:border-primary rounded-lg">
                  <SelectValue placeholder="Şehir seçin" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Faaliyet Gösterdiğiniz Sektörler</label>
              <p className="text-xs text-muted-foreground">Hangi sektörlerde müşteriniz var?</p>
              <div className="flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSector(s)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                      form.sectors.includes(s)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bayi Deneyiminiz</label>
              <Textarea
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
                placeholder="Daha önce hangi ürünleri sattınız? Kaç yıldır bayilik yapıyorsunuz?"
                rows={4}
                className="border-2 focus:border-primary rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Referans Kodu</label>
              <Input value={form.referral} onChange={(e) => update("referral", e.target.value)} placeholder="Sizi yönlendiren biri varsa" className="h-12 border-2 focus:border-primary rounded-lg" />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(c) => setAgreed(c as boolean)}
                className="mt-0.5 border-primary data-[state=checked]:bg-primary"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                <span className="text-primary font-medium hover:underline cursor-pointer">Param Bayilik Sözleşmesi</span>'ni okudum, kabul ediyorum
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={!isValid || loading}>
              {loading ? "Gönderiliyor..." : "Başvuru Gönder"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Zaten bayimiz misiniz?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">Giriş Yapın</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
