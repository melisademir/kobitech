import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KobiLayout from "@/components/layout/KobiLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockQuotes = [
  { id: "TT-12345", products: ["Param POS", "Univera Stokbar"], status: "pending" as const, date: "2026-02-18", sender: "" },
  { id: "TT-12340", products: ["Param Kart", "Finrota Netahsilat 2.0"], status: "pending" as const, date: "2026-02-15", sender: "Ahmet Yılmaz (Bayi)", price: "2.400₺/ay" },
  { id: "TT-12338", products: ["Nebim Winner"], status: "approved" as const, date: "2026-02-10", sender: "Admin", price: "4.200₺/ay" },
];

const tabs = [
  { id: "all", label: "Tümü" },
  { id: "pending", label: "Bekleyen" },
  { id: "approved", label: "Onaylandı" },
  { id: "rejected", label: "Reddedildi" },
];

const statusConfig: Record<string, { label: string; variant: "outline" | "default" | "destructive"; color: string }> = {
  pending: { label: "Bekleyen", variant: "outline", color: "text-warning" },
  approved: { label: "Onaylandı", variant: "default", color: "text-success" },
  rejected: { label: "Reddedildi", variant: "destructive", color: "text-destructive" },
};

const KobiTekliflerim = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const filtered = activeTab === "all" ? mockQuotes : mockQuotes.filter(q => q.status === activeTab);

  return (
    <KobiLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Tekliflerim</h1>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === t.id ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary/30"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Bu kategoride teklif bulunmuyor.</div>
          ) : filtered.map(q => {
            const config = statusConfig[q.status];
            return (
              <Card key={q.id} className="hover:shadow-card-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground">#{q.id}</span>
                        <Badge variant={config.variant} className={config.color}>{config.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Ürünler: {q.products.join(", ")}</p>
                      <p className="text-xs text-muted-foreground">{q.date} {q.sender && `• Gönderen: ${q.sender}`}</p>
                      {q.price && <p className="text-lg font-bold text-primary">{q.price}</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/digitalhub/tekliflerim/${q.id}`)}>Detay</Button>
                      {q.status === "pending" && (
                        <>
                          <Button variant="outline" size="sm">Soru Sor</Button>
                          <Button variant="hero" size="sm">Onayla</Button>
                          <Button variant="destructive" size="sm">Reddet</Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </KobiLayout>
  );
};

export default KobiTekliflerim;
