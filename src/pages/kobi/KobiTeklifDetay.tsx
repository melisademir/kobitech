import { useParams, useNavigate } from "react-router-dom";
import KobiLayout from "@/components/layout/KobiLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Check, X } from "lucide-react";

const mockQuotes: Record<string, {
  id: string;
  products: { name: string; price: string }[];
  status: "pending" | "approved" | "rejected";
  date: string;
  sender: string;
  totalPrice: string;
  note: string;
}> = {
  "TT-12345": {
    id: "TT-12345",
    products: [
      { name: "Param POS", price: "800₺/ay" },
      { name: "Univera Stokbar", price: "1.200₺/ay" },
    ],
    status: "pending",
    date: "2026-02-18",
    sender: "",
    totalPrice: "",
    note: "Hızlı kurulum talep edildi.",
  },
  "TT-12340": {
    id: "TT-12340",
    products: [
      { name: "Param Kart", price: "900₺/ay" },
      { name: "Finrota Netahsilat 2.0", price: "1.500₺/ay" },
    ],
    status: "pending",
    date: "2026-02-15",
    sender: "Ahmet Yılmaz (Bayi)",
    totalPrice: "2.400₺/ay",
    note: "12 ay taahhüt ile özel fiyat sunulmuştur.",
  },
  "TT-12338": {
    id: "TT-12338",
    products: [
      { name: "Nebim Winner", price: "4.200₺/ay" },
    ],
    status: "approved",
    date: "2026-02-10",
    sender: "Admin",
    totalPrice: "4.200₺/ay",
    note: "Onaylanmış teklif. Kurulum süreci başlatıldı.",
  },
};

const statusConfig: Record<string, { label: string; variant: "outline" | "default" | "destructive"; color: string }> = {
  pending: { label: "Bekleyen", variant: "outline", color: "text-warning bg-warning/10" },
  approved: { label: "Onaylandı", variant: "default", color: "text-success bg-success/10" },
  rejected: { label: "Reddedildi", variant: "destructive", color: "text-destructive bg-destructive/10" },
};

const KobiTeklifDetay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quote = id ? mockQuotes[id] : null;

  if (!quote) {
    return (
      <KobiLayout>
        <div className="text-center py-16 space-y-4">
          <p className="text-muted-foreground text-lg">Teklif bulunamadı.</p>
          <Button variant="outline" onClick={() => navigate("/digitalhub/tekliflerim")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön
          </Button>
        </div>
      </KobiLayout>
    );
  }

  const config = statusConfig[quote.status];

  return (
    <KobiLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/digitalhub/tekliflerim")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Teklif #{quote.id}</h1>
            <p className="text-sm text-muted-foreground">{quote.date}</p>
          </div>
          <Badge className={config.color}>{config.label}</Badge>
        </div>

        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ürünler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quote.products.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <span className="font-medium text-foreground text-sm">{p.name}</span>
                <span className="text-sm font-semibold text-primary">{p.price}</span>
              </div>
            ))}
            {quote.totalPrice && (
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="font-bold text-foreground">Toplam</span>
                <span className="text-lg font-bold text-primary">{quote.totalPrice}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detaylar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quote.sender && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gönderen</span>
                <span className="font-medium text-foreground">{quote.sender}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tarih</span>
              <span className="font-medium text-foreground">{quote.date}</span>
            </div>
            {quote.note && (
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Not</p>
                <p className="text-sm text-foreground">{quote.note}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {quote.status === "pending" && (
            <>
              <Button variant="outline" className="gap-2">
                <MessageCircle className="w-4 h-4" /> Soru Sor
              </Button>
              <Button variant="hero" className="gap-2">
                <Check className="w-4 h-4" /> Onayla
              </Button>
              <Button variant="destructive" className="gap-2">
                <X className="w-4 h-4" /> Reddet
              </Button>
            </>
          )}
        </div>
      </div>
    </KobiLayout>
  );
};

export default KobiTeklifDetay;
