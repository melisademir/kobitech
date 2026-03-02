import { useState } from "react";
import { Check, X, FileText, CheckCircle, Users, Bell as BellIcon } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Notification {
  id: string;
  type: "proposal" | "approval" | "customer" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
  highlight?: string;
}

const typeConfig: Record<string, { icon: React.ReactNode; bg: string }> = {
  proposal: { icon: <FileText className="h-5 w-5" />, bg: "bg-primary/10 text-primary" },
  approval: { icon: <CheckCircle className="h-5 w-5" />, bg: "bg-success/10 text-success" },
  
  customer: { icon: <Users className="h-5 w-5" />, bg: "bg-info/10 text-info" },
  system: { icon: <BellIcon className="h-5 w-5" />, bg: "bg-muted text-muted-foreground" },
};

const mockNotifications: Notification[] = [
  { id: "1", type: "approval", title: "Teklif onaylandı!", description: "ABC Tekstil - Nebim Era + 2 ürün", time: "2 saat önce", read: false, highlight: "success" },
  { id: "2", type: "customer", title: "Müşteri dijital adım tamamladı", description: "XYZ Market E-ticaret adımını tamamladı. Param Kart önerebilirsiniz", time: "5 saat önce", read: false, highlight: "info" },
  { id: "3", type: "system", title: "Sistem güncellemesi", description: "Yeni özellikler eklendi", time: "Dün", read: false, highlight: "accent" },
  { id: "4", type: "proposal", title: "Teklif görüntülendi", description: "DEF Gıda teklifinizi açtı", time: "Dün", read: true },
  { id: "5", type: "customer", title: "Yeni müşteri kaydoldu", description: "GHI Ltd. Dijital Esnaf'a katıldı", time: "2 gün önce", read: true },
  { id: "6", type: "system", title: "Yeni Param ürünü eklendi", description: "Param Analytics artık katalogda! Keşfedin.", time: "3 gün önce", read: true },
  { id: "7", type: "approval", title: "Teklif onaylandı", description: "PQR Danışmanlık - Param DMS + Çağrı Merkezi", time: "5 gün önce", read: true },
  { id: "8", type: "proposal", title: "Teklif süresi dolmak üzere", description: "JKL İnşaat teklifiniz 3 gün sonra geçerliliğini yitirecek", time: "1 hafta önce", read: true },
];

const Notifications = () => {
  const [items, setItems] = useState(mockNotifications);
  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));
  const deleteItem = (id: string) => setItems(prev => prev.filter(n => n.id !== id));

  const unreadCount = items.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Bildirimler</h1>
            <p className="text-sm text-muted-foreground mt-1">{unreadCount} okunmamış bildirim</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sm text-primary font-medium hover:underline">
              Tümünü Okundu İşaretle
            </button>
          )}
        </div>

        {/* List */}
        <div className="space-y-2">
          {items.map(n => {
            const config = typeConfig[n.type];
            return (
              <div
                key={n.id}
                className={`relative bg-card rounded-xl p-4 flex items-start gap-4 transition-all hover:shadow-card group ${!n.read ? "border-l-4 border-primary shadow-card" : "border border-border"}`}
              >
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                </div>
                <button onClick={() => deleteItem(n.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0">
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl block mb-3">🔔</span>
              <p className="text-muted-foreground font-medium">Henüz bildiriminiz yok</p>
              <p className="text-xs text-muted-foreground mt-1">Teklifleriniz onaylandığında burada göreceksiniz</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
