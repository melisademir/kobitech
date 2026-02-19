import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { turkishCities } from "@/data/sectors";

const Step1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
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
            <Link to="/kobi/welcome"><ArrowLeft className="h-4 w-4 mr-1" /> Geri</Link>
          </Button>
          <Button onClick={() => { if (name && email && phone && city) navigate("/kobi/step-2"); }} disabled={!name || !email || !phone || !city} variant="hero" className="flex-1">İleri</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step1;
