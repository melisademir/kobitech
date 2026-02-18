import KobiLayout from "@/components/layout/KobiLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

const notifications = [
  { id: 1, text: "Teklif talebiniz alındı", time: "Az önce", icon: "📄", read: false },
  { id: 2, text: "Hoş geldiniz! Dijital dönüşüm yolculuğunuza başlayın", time: "Az önce", icon: "🎉", read: false },
];

const KobiBildirimler = () => (
  <KobiLayout>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Bildirimler</h1>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>Bildirim yok</p>
          </div>
        ) : notifications.map(n => (
          <Card key={n.id} className={!n.read ? "border-l-4 border-l-primary" : ""}>
            <CardContent className="p-4 flex items-center gap-4">
              <span className="text-xl">{n.icon}</span>
              <div className="flex-1">
                <p className={`text-sm ${n.read ? "text-muted-foreground" : "font-medium text-foreground"}`}>{n.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </KobiLayout>
);

export default KobiBildirimler;
