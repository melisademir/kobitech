import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import loginHero from "@/assets/login-hero.png";
import { useOnboarding } from "@/contexts/OnboardingContext";

const KobiSignup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/kobi/welcome";
  const { data: onboardingData } = useOnboarding();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(onboardingData.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Tüm alanlar gereklidir"); return; }
    if (password.length < 6) { setError("Şifre en az 6 karakter olmalıdır"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate(redirect); }, 800);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden flex-col justify-between p-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-2xl">🏢</div>
            <span className="text-2xl font-extrabold text-primary-foreground tracking-tight">KOBİ DİJİTAL</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
          <h2 className="text-4xl font-bold text-primary-foreground leading-tight">Dijital Dönüşüme<br />Bugün Başlayın</h2>
          <img src={loginHero} alt="Dashboard" className="rounded-2xl shadow-premium-hover max-w-sm opacity-90" />
        </motion.div>
        <div />
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-[400px] space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">KOBİ Kaydı</h1>
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
            {error && <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"><span>✗</span> {error}</div>}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}</Button>
          </form>
          <p className="text-center text-muted-foreground text-sm">Zaten hesabınız var mı? <Link to={`/kobi/login${redirect !== "/kobi/welcome" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="text-primary font-bold hover:underline">Giriş Yap</Link></p>
        </motion.div>
      </div>
    </div>
  );
};

export default KobiSignup;
