import KobiLayout from "@/components/layout/KobiLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingCart, MessageCircle, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const KobiDashboard = () => {
  const { data } = useOnboarding();
  const businessName = data.businessName || "İşletme";

  return (
    <KobiLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Merhaba, {businessName}! 👋</h1>
          <p className="text-muted-foreground mt-1">Dijital dönüşüm yolculuğunuza devam edin</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Map, label: "Harita", desc: "Yolculuğunuzu görün", path: "/kobi/harita", color: "text-primary" },
            { icon: ShoppingCart, label: "Çözümler", desc: "21+ ürün keşfedin", path: "/kobi/urunler", color: "text-accent" },
            { icon: FileText, label: "Tekliflerim", desc: "Teklif durumları", path: "/kobi/tekliflerim", color: "text-warning" },
            { icon: MessageCircle, label: "Görüşmeler", desc: "Mesajlarınız", path: "/kobi/gorusmeler", color: "text-info" },
          ].map(s => (
            <Link key={s.label} to={s.path}>
              <Card className="hover:shadow-card-hover transition-shadow cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <s.icon className={`h-6 w-6 ${s.color}`} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{s.label}</p>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Aktif Projeleriniz</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Henüz aktif projeniz yok.</p>
              <Button asChild variant="hero" size="sm" className="mt-4">
                <Link to="/kobi/urunler">Çözümleri Keşfet</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Son Aktiviteler</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { text: "Hesabınız oluşturuldu", time: "Az önce", icon: "🎉" },
                { text: "Onboarding tamamlandı", time: "Az önce", icon: "✅" },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <span className="text-xl">{a.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </KobiLayout>
  );
};

export default KobiDashboard;
