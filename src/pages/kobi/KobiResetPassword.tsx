import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const KobiResetPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="min-h-screen bg-card flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[420px] space-y-8">
        <Link to="/digitalhub/login" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> Giriş sayfasına dön</Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Şifre Sıfırlama</h1>
          <p className="text-muted-foreground mt-2">E-posta adresinize sıfırlama linki gönderilecek</p>
        </div>
        {sent ? (
          <div className="bg-success/10 text-success p-6 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">Link Gönderildi! ✉️</p>
            <p className="text-sm">Lütfen e-posta kutunuzu kontrol edin.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@sirket.com" className="pl-10 h-12 border-2 focus:border-primary rounded-lg" />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">Sıfırlama Linki Gönder</Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default KobiResetPassword;
