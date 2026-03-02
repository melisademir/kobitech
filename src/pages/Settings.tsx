import { useState } from "react";
import { Save, Shield, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

const tabs = ["Profil Bilgileri", "Hesap Güvenliği", "Bildirim Tercihleri"];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState({
    company: "Yılmaz Teknoloji Ltd.", name: "Ahmet Yılmaz", email: "ahmet@yilmaztech.com",
    phone: "+90 532 123 4567", city: "İstanbul", address: "Kadıköy, Bağdat Cad. No:123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    proposalApproved: true, proposalViewed: true, customerStep: true, newProduct: true,
    weeklyReport: true, marketing: false,
    pushProposal: true, pushCustomer: true,
  });

  const handleSave = (section: string) => {
    toast({ title: `${section} güncellendi ✓`, duration: 2000 });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Ayarlar</h1>
          <p className="text-sm text-muted-foreground mt-1">Hesap ve profil ayarlarınızı yönetin</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-border">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === i ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 0 && (
          <div className="bg-card rounded-xl shadow-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Bayi Profili</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Şirket Adı", key: "company" },
                { label: "Yetkili Adı Soyadı", key: "name" },
                { label: "E-posta", key: "email" },
                { label: "Telefon", key: "phone" },
                { label: "Şehir", key: "city" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
                  <input
                    value={(profile as any)[f.key]}
                    onChange={e => setProfile(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full mt-1 px-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Adres</label>
              <textarea
                value={profile.address}
                onChange={e => setProfile(prev => ({ ...prev, address: e.target.value }))}
                rows={2}
                className="w-full mt-1 px-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary resize-y"
              />
            </div>
            <button onClick={() => handleSave("Profiliniz")} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <Save className="h-4 w-4" /> Bilgileri Kaydet
            </button>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Şifre Değiştir</h2>
              <div className="space-y-3 max-w-md">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Mevcut Şifre</label>
                  <div className="relative mt-1">
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary pr-10" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Yeni Şifre</label>
                  <input type="password" placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Yeni Şifre (Tekrar)</label>
                  <input type="password" placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary" />
                </div>
                <button onClick={() => handleSave("Şifreniz")} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90">
                  Şifreyi Güncelle
                </button>
              </div>
            </div>


            <div className="bg-card rounded-xl shadow-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Giriş Geçmişi</h2>
              <div className="space-y-2">
                {[
                  { device: "Chrome - Windows", location: "İstanbul, TR", time: "Bugün, 09:45", success: true },
                  { device: "Safari - iPhone", location: "İstanbul, TR", time: "Dün, 18:30", success: true },
                  { device: "Chrome - MacOS", location: "Ankara, TR", time: "14 Şub, 11:20", success: false },
                ].map((entry, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <Shield className={`h-5 w-5 ${entry.success ? "text-success" : "text-destructive"}`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{entry.device}</p>
                        <p className="text-[10px] text-muted-foreground">{entry.location} • {entry.time}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full ${entry.success ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                      {entry.success ? "Başarılı" : "Başarısız"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="bg-card rounded-xl shadow-card p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">E-posta Bildirimleri</h2>
              <div className="space-y-4">
                {[
                  { key: "proposalApproved", label: "Teklif onaylandığında", desc: "Müşteri teklifi onaylar onaylamaz bilgilendirme" },
                  { key: "proposalViewed", label: "Teklif görüntülendiğinde", desc: "Müşteri PDF'i açtığında bilgi" },
                  { key: "customerStep", label: "Müşteri dijital adım tamamladığında", desc: "Upsell fırsatı bildirimi" },
                  { key: "newProduct", label: "Yeni Param ürünü eklendiğinde", desc: "Katalog güncellemeleri" },
                  { key: "weeklyReport", label: "Haftalık performans özeti", desc: "Her Pazartesi rapor" },
                  { key: "marketing", label: "Pazarlama ve kampanyalar", desc: "Promosyonlar, duyurular" },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-[10px] text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch checked={(notifications as any)[n.key]} onCheckedChange={v => setNotifications(prev => ({ ...prev, [n.key]: v }))} />
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => handleSave("Bildirim tercihleri")} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90">
              Tercihleri Kaydet
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
