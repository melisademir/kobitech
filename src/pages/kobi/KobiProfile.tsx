import KobiLayout from "@/components/layout/KobiLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, FileText, Download } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";

const KobiProfile = () => {
  const { data: onboardingData } = useOnboarding();
  const businessName = onboardingData.businessName || "Demo İşletme";
  const initials = businessName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const userId = "KOBİ-2024-048291";

  return (
    <KobiLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Profilim</h1>

        <Card>
          <CardHeader><CardTitle>İşletme Bilgileri</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">{initials}</div>
              <div>
                <p className="font-bold text-foreground text-lg">{businessName}</p>
                <p className="text-sm text-muted-foreground">{onboardingData.sector || "Perakende"} • {onboardingData.city || "İstanbul"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-background p-3 rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Kullanıcı No:</span>
              <span className="font-mono font-bold text-foreground text-sm">{userId}</span>
              <button onClick={() => navigator.clipboard.writeText(userId)} className="ml-auto text-primary hover:text-primary/80"><Copy className="h-4 w-4" /></button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Şirket Bilgileri</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-lg">
            {[
              { label: "İşletme Adı", value: businessName },
              { label: "Sektör", value: onboardingData.sector || "" },
              { label: "Şehir", value: onboardingData.city || "" },
              { label: "Telefon", value: onboardingData.phone || "" },
              { label: "Web Sitesi", value: "" },
            ].map(f => (
              <div key={f.label} className="space-y-1">
                <label className="text-sm font-medium text-foreground">{f.label}</label>
                <Input defaultValue={f.value} placeholder={f.label} className="h-11" />
              </div>
            ))}
            <Button variant="hero">Kaydet</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Görünürlük Ayarları</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Profil herkese açık", desc: "Bayiler profilinizi görebilir" },
              { label: "İletişim bilgileri görünsün", desc: "Telefon ve email paylaşılır" },
              { label: "Bildirim e-postaları", desc: "Yeni teklifler için email al" },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div>
                  <p className="font-medium text-foreground text-sm">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Sözleşmeler & Dökümanlar</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Kullanım Sözleşmesi.pdf", date: "2026-02-18" },
                { name: "KVKK Aydınlatma Metni.pdf", date: "2026-02-18" },
              ].map(doc => (
                <div key={doc.name} className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                  </div>
                  <button className="text-primary hover:text-primary/80"><Download className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4"><Download className="h-4 w-4 mr-2" /> Tümünü İndir</Button>
          </CardContent>
        </Card>
      </div>
    </KobiLayout>
  );
};

export default KobiProfile;
