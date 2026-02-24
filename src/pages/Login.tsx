import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import loginHero from "@/assets/login-hero.png";
import kobiLogo from "@/assets/logo-kobitech.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("E-posta ve şifre gereklidir");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden flex-col justify-between p-8"
        style={{ background: "linear-gradient(160deg, #0f0a1e 0%, #1a1040 40%, #2d1b69 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(124,58,237,0.3) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 flex items-center gap-2">
          <img src={kobiLogo} alt="KobiTECH" className="h-[28px] w-auto brightness-200" />
          <span className="text-lg font-extrabold text-white tracking-tight">KobiTECH</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5">
          <h2 className="text-2xl font-bold text-white leading-snug text-center">KOBİ'lerin<br />Dijital Partneri</h2>
          <img src={loginHero} alt="Enterprise Dashboard" className="rounded-2xl shadow-2xl w-full max-w-[320px]" />
          <p className="text-white/50 text-xs leading-relaxed max-w-[240px] text-center">Dijital dönüşüm yolculuğunuzda yanınızdayız</p>
        </motion.div>
        <div />
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-[400px] space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <img src={kobiLogo} alt="KobiTECH" className="h-[28px] w-auto" />
            <span className="text-xl font-extrabold text-primary">KobiTECH</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground">Bayi Girişi</h1>
            <p className="text-muted-foreground mt-2">Hesabınıza erişmek için giriş yapın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@sirket.com"
                  className="pl-10 h-12 border-2 focus:border-primary rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 border-2 focus:border-primary rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(c) => setRemember(c as boolean)}
                  className="border-primary data-[state=checked]:bg-primary"
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Beni Hatırla</label>
              </div>
              <Link to="/reset-password" className="text-sm text-primary hover:underline font-medium">
                Şifrenizi mi unuttunuz?
              </Link>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                <span>✗</span> {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">Şifrenizi mi unuttunuz?</p>
            <Link to="/reset-password" className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 mt-1">
              Şifre Sıfırla →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
