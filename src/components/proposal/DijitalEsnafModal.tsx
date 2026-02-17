import { useState } from "react";
import { X, Zap, FileText, TrendingUp, Bell, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface CustomerInfo {
  companyName: string;
  sector: string;
  email: string;
}

interface Props {
  customer: CustomerInfo;
  onClose: () => void;
}

const benefits = [
  { icon: <Zap className="h-8 w-8" />, title: "Otomatik Ödeme", desc: "Müşteri online ödeme yapar, siz takip etmezsiniz" },
  { icon: <FileText className="h-8 w-8" />, title: "Otomatik Fatura", desc: "Sistem faturayı keser, e-posta gönderir" },
  { icon: <TrendingUp className="h-8 w-8" />, title: "Anında Komisyon", desc: "Komisyonunuz otomatik hesaplanır ve görürsünüz" },
  { icon: <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" /></svg>, title: "Müşteri Takibi", desc: "Global Readiness Level ile müşteri ilerlemesini izlersiniz" },
  { icon: <Bell className="h-8 w-8" />, title: "Satış Fırsatları", desc: "Müşteri yeni adım tamamladığında bildirim alırsınız" },
  { icon: <CheckCircle className="h-8 w-8" />, title: "Sıfır Manuel İş", desc: "Takip, fatura, tahsilat otomatik" },
];

const defaultTemplate = (name: string, sector: string) =>
  `Sayın Yetkili,

${name} olarak ${sector} sektöründe faaliyet gösteren işletmeniz için Param Dijital Esnaf platformunu kullanmanızı öneriyoruz.

Dijital Esnaf ile tüm ödeme, fatura ve iş süreçlerinizi tek platformdan yönetebilirsiniz.

Platform avantajları:
• Online ödeme ve tahsilat
• Otomatik faturalama
• İş süreçleri takibi
• 7/24 erişim

Platformu incelemek ve kayıt olmak için aşağıdaki linke tıklayabilirsiniz.

Saygılarımızla,
Param Bayi Ekibi`;

const DijitalEsnafModal = ({ customer, onClose }: Props) => {
  const [message, setMessage] = useState(defaultTemplate(customer.companyName, customer.sector));
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Davet gönderildi! ✓", description: `${customer.companyName} müşterisine Dijital Esnaf daveti e-posta ile gönderildi.`, duration: 4000 });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card rounded-2xl shadow-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="gradient-primary rounded-t-2xl px-8 py-8 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground">
            <X className="h-7 w-7" />
          </button>
          <span className="text-6xl mb-3 block">🎯</span>
          <h2 className="text-primary-foreground font-bold text-2xl">Müşteriyi Dijital Esnaf Platformuna Davet Edin!</h2>
          <p className="text-primary-foreground/80 mt-2">Online ödeme = Otomatik komisyon!</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Customer summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Davet Edilecek Müşteri:</p>
            <p className="font-bold text-foreground">{customer.companyName}</p>
            <div className="flex gap-2 mt-1">
              <Badge className="bg-primary text-primary-foreground text-xs">{customer.sector}</Badge>
              <span className="text-xs text-muted-foreground">{customer.email || "E-posta girilmedi"}</span>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Neden Dijital Esnaf'a Davet Etmelisiniz?</h3>
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <div key={i} className="border-2 border-success/30 rounded-lg p-4">
                  <div className="text-success mb-2">{b.icon}</div>
                  <p className="font-bold text-foreground text-sm">{b.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-destructive/5 border-l-4 border-destructive rounded-r-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-destructive text-sm">Manuel süreç = Ekstra iş yükü</p>
                <ul className="text-xs text-destructive/80 mt-2 space-y-1">
                  <li>✗ Ödeme takibi manuel yapacaksınız</li>
                  <li>✗ Fatura manuel keseceksiniz</li>
                  <li>✗ Komisyon gecikmeli hesaplanacak</li>
                  <li>✗ Müşteri ilerlemesini göremeyeceksiniz</li>
                  <li>✗ Upsell fırsatlarını kaçıracaksınız</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Message template */}
          <div>
            <h3 className="font-bold text-foreground mb-1">Davet Mesajı</h3>
            <p className="text-xs text-muted-foreground mb-3">Müşterinize gidecek e-posta mesajını düzenleyebilirsiniz</p>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={10}
              maxLength={2000}
              className="w-full border border-input rounded-lg p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground text-right mt-1">{message.length}/2000</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSend}
              disabled={sending || !customer.email}
              className="flex-1 py-3.5 rounded-lg gradient-primary text-primary-foreground font-bold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {sending ? "Gönderiliyor..." : "🎯 Daveti Gönder"}
            </button>
            <button onClick={onClose} className="px-6 py-3.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:bg-muted/50">
              Kapat
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DijitalEsnafModal;
