import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KobiLayout from "@/components/layout/KobiLayout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeklifTalebi = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const requestId = `TT-${Date.now().toString().slice(-5)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <KobiLayout>
        <div className="max-w-lg mx-auto text-center py-16 space-y-6">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-bold text-foreground">Talebiniz Alındı!</h1>
          <p className="text-muted-foreground">Talep No: <span className="font-bold text-primary">#{requestId}</span></p>
          <p className="text-muted-foreground">24 saat içinde sizinle iletişime geçeceğiz.</p>
          <Button variant="hero" onClick={() => navigate("/digitalhub/tekliflerim")}>Tekliflerimi Gör</Button>
        </div>
      </KobiLayout>
    );
  }

  return (
    <KobiLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Teklif Talebi Oluştur</h1>

        <Card>
          <CardHeader><CardTitle>Seçili Ürünler ({items.length})</CardTitle></CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <p className="text-muted-foreground text-sm">Sepetinizde ürün yok. Önce çözümler sayfasından ürün ekleyin.</p>
            ) : (
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                    <span className="font-medium text-foreground text-sm">{item.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{item.categoryLabel}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Card>
            <CardHeader><CardTitle>Notlar</CardTitle></CardHeader>
            <CardContent>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ek bilgi veya sorularınız..." className="w-full min-h-[100px] rounded-md border-2 border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none" />
            </CardContent>
          </Card>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={items.length === 0}>
            Teklif Talebi Gönder
          </Button>
        </form>
      </div>
    </KobiLayout>
  );
};

export default TeklifTalebi;
