import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[400px] bg-card rounded-2xl shadow-premium p-8 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎯</span>
          <span className="text-lg font-extrabold text-primary">SALESPARTNER</span>
        </div>

        {!sent ? (
          <>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Şifremi Sıfırla</h1>
              <p className="text-muted-foreground mt-2 text-sm">E-posta adresinize şifre sıfırlama bağlantısı göndereceğiz</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="pl-10 h-12 border-2 focus:border-primary rounded-lg"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={!email || loading}>
                {loading ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Bağlantı Gönderildi!</h2>
            <p className="text-sm text-muted-foreground">
              Şifre sıfırlama bağlantısı <span className="font-medium text-foreground">{email}</span> adresine gönderildi.
            </p>
          </div>
        )}

        <Link to="/sales/login" className="flex items-center justify-center gap-2 text-primary text-sm font-medium hover:underline">
          <ArrowLeft className="h-4 w-4" /> Giriş sayfasına dön
        </Link>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
