import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useOnboarding } from "@/contexts/OnboardingContext";
import stepHedef from "@/assets/step-hedef-corp.png";
import stepTeklif from "@/assets/step-teklif-corp.png";
import stepBuyume from "@/assets/step-buyume-corp.png";
import kobiLogo from "@/assets/logo-kobitech.png";

const steps = [
  { image: stepHedef, label: "Karşılaştır", title: "İşletmenize özel çözümleri inceleyin ve karşılaştırın.", desc: "İşletmenize özel çözümleri inceleyin ve karşılaştırın.", accent: "#A78BFA", accentDark: "#7C3AED" },
  { image: stepTeklif, label: "Teklif Al", title: "Size özel çözümleri seçin ve teklif alın.", desc: "Size özel çözümleri seçin ve teklif alın.", accent: "#818CF8", accentDark: "#6366F1" },
  { image: stepBuyume, label: "Ticaretini Büyüt, Maliyetini Düşür", title: "Dijital büyümenizi hemen başlatın.", desc: "Dijital büyümenizi hemen başlatın.", accent: "#C084FC", accentDark: "#A855F7" },
];

const KobiSignup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/digitalhub/onboarding1";
  const { data: onboardingData } = useOnboarding();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(onboardingData.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [showKvkk, setShowKvkk] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Tüm alanlar gereklidir"); return; }
    if (password.length < 6) { setError("Şifre en az 6 karakter olmalıdır"); return; }
    if (!kvkkAccepted) { setError("KVKK Aydınlatma Metni'ni kabul etmeniz gerekmektedir"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate(redirect); }, 800);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ background: "linear-gradient(160deg, #0F0720 0%, #1A0A3C 50%, #0D1240 100%)" }}>
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)" }} />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <img src={kobiLogo} alt="DigitalHub" className="h-[30px] w-auto" />
            <span className="text-xl font-extrabold tracking-tight" style={{ color: "#E9D5FF" }}>DigitalHub</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold leading-snug" style={{ color: "#F3E8FF", letterSpacing: "-0.02em" }}>Dijitalde Büyümeye Başlayın</h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(196,181,253,0.65)" }}>Hedeflerinizi belirleyin, çözümleri keşfedin ve dijital büyümenizi başlatın.</p>
          </div>

          <div className="flex flex-col gap-5">
            {steps.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }} className="flex items-center gap-5">
                {/* Card image */}
                <div className="relative w-28 h-[70px] shrink-0 overflow-hidden" style={{ borderRadius: "14px", background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", boxShadow: `0 8px 24px -6px ${s.accent}40` }}>
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black text-white" style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accentDark})` }}>{i + 1}</div>
                </div>
                {/* Text */}
                <div className="flex-1 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase mb-1.5" style={{ background: `${s.accent}20`, color: s.accent, border: `1px solid ${s.accent}30` }}>{s.label}</span>
                  <h3 className="text-lg font-bold leading-snug mb-1" style={{ color: "#F3E8FF" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(196,181,253,0.80)" }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div />
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-[400px] space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">İşletme Kayıt</h1>
            <p className="text-muted-foreground mt-2">Ücretsiz hesap oluşturun</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@sirket.com" className="pl-10 h-12 border-2 focus:border-primary rounded-lg" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="En az 6 karakter" className="pl-10 pr-10 h-12 border-2 focus:border-primary rounded-lg" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {/* KVKK Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="kvkk"
                checked={kvkkAccepted}
                onCheckedChange={(checked) => setKvkkAccepted(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="kvkk" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                <button type="button" onClick={() => setShowKvkk(true)} className="text-primary font-semibold hover:underline">KVKK Aydınlatma Metni</button>'ni okudum ve kabul ediyorum.
              </label>
            </div>

            {error && <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"><span>✗</span> {error}</div>}
            <Button type="submit" size="lg" className="w-full" disabled={loading || !kvkkAccepted}>{loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}</Button>
          </form>
          <p className="text-center text-muted-foreground text-sm">Zaten hesabınız var mı? <Link to={`/digitalhub/login${redirect !== "/digitalhub/onboarding1" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="text-primary font-bold hover:underline">Giriş Yap</Link></p>

          {/* KVKK Modal */}
          {showKvkk && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowKvkk(false)}>
              <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-foreground mb-4">KVKK Aydınlatma Metni</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, DigitalHub olarak kişisel verilerinizin güvenliğine önem veriyoruz.</p>
                  <p><strong>Veri Sorumlusu:</strong> DigitalHub Teknoloji A.Ş.</p>
                  <p><strong>İşlenen Kişisel Veriler:</strong> Ad-soyad, e-posta adresi, telefon numarası, şirket bilgileri, sektör bilgisi ve platform üzerindeki kullanım verileri.</p>
                  <p><strong>İşleme Amaçları:</strong> Hesap oluşturma ve yönetimi, hizmet sunumu, iletişim, yasal yükümlülüklerin yerine getirilmesi, pazarlama faaliyetleri (açık rıza ile).</p>
                  <p><strong>Veri Aktarımı:</strong> Kişisel verileriniz, hizmet sağlayıcılar ve iş ortaklarımızla KVKK'nın öngördüğü güvenlik önlemleri çerçevesinde paylaşılabilir.</p>
                  <p><strong>Haklarınız:</strong> KVKK'nın 11. maddesi kapsamında; verilerinize erişim, düzeltme, silme, işlemenin kısıtlanması ve veri taşınabilirliği haklarına sahipsiniz. Bu haklarınızı kullanmak için <span className="text-primary font-medium">kvkk@digitalhub.com.tr</span> adresine başvurabilirsiniz.</p>
                  <p><strong>Saklama Süresi:</strong> Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal yükümlülükler çerçevesinde saklanır.</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setShowKvkk(false)}>Kapat</Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default KobiSignup;
