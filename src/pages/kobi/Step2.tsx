import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const sectors = [
  { name: "Üretim", icon: "🏭" }, { name: "Perakende", icon: "🛒" },
  { name: "Tekstil", icon: "🧵" }, { name: "Gıda", icon: "🍽️" },
  { name: "E-ticaret", icon: "🌐" }, { name: "Hizmet", icon: "💼" },
  { name: "Sağlık", icon: "🏥" }, { name: "Eğitim", icon: "📚" },
  { name: "İnşaat", icon: "🏗️" }, { name: "Lojistik", icon: "🚛" },
  { name: "Turizm", icon: "✈️" }, { name: "Restoran/Kafe", icon: "☕" },
  { name: "Otomotiv", icon: "🚗" }, { name: "Teknoloji", icon: "💻" },
  { name: "Danışmanlık", icon: "📊" }, { name: "Diğer", icon: "📦" },
];

const Step2 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-border" />
        </div>
        <p className="text-center text-sm text-muted-foreground">Adım 2/3</p>
        <h1 className="text-2xl font-bold text-foreground text-center">Hangi Sektördesiniz?</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sectors.map(s => (
            <button key={s.name} onClick={() => setSelected(s.name)} className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${selected === s.name ? "border-primary bg-primary/5 shadow-premium" : "border-border hover:border-primary/30 bg-card"}`}>
              <div className="absolute top-3 right-3">
                <Checkbox checked={selected === s.name} tabIndex={-1} className="pointer-events-none" />
              </div>
              <span className="text-3xl">{s.icon}</span>
              <span className="text-sm font-medium text-foreground">{s.name}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="flex-1">
            <Link to="/kobi/step-1"><ArrowLeft className="h-4 w-4 mr-1" /> Geri</Link>
          </Button>
          <Button onClick={() => { if (selected) navigate("/kobi/step-3"); }} disabled={!selected} variant="hero" className="flex-1">İleri</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step2;
