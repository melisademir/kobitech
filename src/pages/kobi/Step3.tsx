import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";

const goals = [
  { name: "İhracat yapmak", icon: "🌍" },
  { name: "Maliyetleri azaltmak", icon: "📉" },
  { name: "Satışları artırmak", icon: "📈" },
  { name: "E-ticarete geçmek", icon: "🛒" },
  { name: "Operasyonları otomatikleştirmek", icon: "⚙️" },
  { name: "Ekibi büyütmek", icon: "👥" },
  { name: "Ödeme süreçleri", icon: "💳" },
  { name: "Stok/Lojistik", icon: "📦" },
  { name: "Diğer", icon: "✨" },
];

const Step3 = () => {
  const navigate = useNavigate();
  const { data: onboardingData, setData } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(onboardingData.goals || []);

  const toggle = (g: string) => setSelected(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const handleNext = () => {
    if (selected.length) {
      setData({ goals: selected });
      navigate("/digitalhub/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
        </div>
        <p className="text-center text-sm text-muted-foreground">Adım 3/3</p>
        <h1 className="text-2xl font-bold text-foreground text-center">Büyüme Hedefiniz Nedir?</h1>
        <p className="text-muted-foreground text-center text-sm">Birden fazla seçebilirsiniz</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {goals.map(g => (
            <button key={g.name} onClick={() => toggle(g.name)} className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${selected.includes(g.name) ? "border-primary bg-primary/5 shadow-premium" : "border-border hover:border-primary/30 bg-card"}`}>
              <div className="absolute top-3 right-3">
                <Checkbox checked={selected.includes(g.name)} tabIndex={-1} className="pointer-events-none" />
              </div>
              <span className="text-3xl">{g.icon}</span>
              <span className="text-sm font-medium text-foreground text-center">{g.name}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="flex-1">
            <Link to="/digitalhub/onboarding2"><ArrowLeft className="h-4 w-4 mr-1" /> Geri</Link>
          </Button>
          <Button onClick={handleNext} disabled={!selected.length} variant="hero" className="flex-1">Planımı Oluştur 🚀</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step3;
