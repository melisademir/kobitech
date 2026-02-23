import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { turkishCities } from "@/data/sectors";
import { useOnboarding } from "@/contexts/OnboardingContext";
import stepHedef from "@/assets/step-hedef-corp.png";
import stepTeklif from "@/assets/step-teklif-corp.png";
import stepBuyume from "@/assets/step-buyume-corp.png";

const steps = [
  { image: stepHedef, label: "Hedef Belirleme", title: "Büyüme Hedefinizi Belirleyin", desc: "Satışlarınızı artırmak, maliyetleri düşürmek ya da yeni pazarlara açılmak mı istiyorsunuz?", accent: "#A78BFA", accentDark: "#7C3AED" },
  { image: stepTeklif, label: "Teklif Al", title: "Çözümleri Karşılaştırın ve Teklif Alın", desc: "İşletmenize özel çözümleri inceleyin ve teklif alın.", accent: "#818CF8", accentDark: "#6366F1" },
  { image: stepBuyume, label: "Büyümeye Başla", title: "Dijitalde Büyümenizi Başlatın", desc: "Size özel çözümleri seçin ve büyümeye başlayın.", accent: "#C084FC", accentDark: "#A855F7" },
];

const Step1 = () => {
  const navigate = useNavigate();
  const { data, setData } = useOnboarding();
  const [name, setName] = useState(data.businessName || "");
  const [email, setEmail] = useState(data.email || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [city, setCity] = useState(data.city || "");

  const handleNext = () => {
    if (name && email && phone && city) {
      setData({ businessName: name, email, phone, city });
      navigate("/kobi/step-2");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel — steps visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ background: "linear-gradient(160deg, #0F0720 0%, #1A0A3C 50%, #0D1240 100%)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)" }} />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(124,58,237,0.25)", border: "1px solid rgba(167,139,250,0.3)" }}>🏢</div>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: "#E9D5FF" }}>KobiTECH</span>
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
                {/* Circle image */}
                <div className="relative w-24 h-24 shrink-0">
                  <motion.div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${s.accent}30 0%, transparent 70%)`, transform: "scale(2)" }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.9 }} />
                  <motion.div className="absolute inset-[-10px] rounded-full pointer-events-none" style={{ border: `1.5px dashed ${s.accent}35` }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                  <div className="relative w-24 h-24 rounded-full overflow-hidden" style={{ boxShadow: `0 0 0 2px ${s.accent}55, 0 12px 32px -6px ${s.accent}60` }}>
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute -top-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black text-white z-10" style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accentDark})` }}>{i + 1}</div>
                  </div>
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

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-lg space-y-8">
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-8 rounded-full bg-primary" />
            <div className="h-2 w-8 rounded-full bg-border" />
            <div className="h-2 w-8 rounded-full bg-border" />
          </div>
          <p className="text-center text-sm text-muted-foreground">Adım 1/3</p>
          <h1 className="text-2xl font-bold text-foreground text-center">İşletme Bilgileri</h1>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">İşletme Adı *</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="İşletmenizin adı" className="h-12 border-2 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">E-posta *</label>
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@firma.com" type="email" className="h-12 border-2 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Telefon *</label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="05XX XXX XX XX" type="tel" className="h-12 border-2 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Şehir *</label>
              <select value={city} onChange={e => setCity(e.target.value)} className="w-full h-12 rounded-md border-2 border-input bg-background px-3 text-sm focus:border-primary focus:outline-none">
                <option value="">Şehir seçin</option>
                {turkishCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/kobi/login"><ArrowLeft className="h-4 w-4 mr-1" /> Geri</Link>
            </Button>
            <Button onClick={handleNext} disabled={!name || !email || !phone || !city} variant="hero" className="flex-1">İleri</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Step1;
