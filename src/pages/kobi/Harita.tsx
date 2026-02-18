import { useState } from "react";
import KobiLayout from "@/components/layout/KobiLayout";
import { motion } from "framer-motion";
import { Check, Lock, Play, ChevronRight } from "lucide-react";

const stations = [
  { id: 1, name: "STK/KAGIDER", icon: "🤝", desc: "Sivil toplum ve iş kadınları ağı", status: "completed" as const },
  { id: 2, name: "Şirket Kurulum", icon: "🌍", desc: "Global şirket kurulum hizmetleri", status: "completed" as const },
  { id: 3, name: "İnsan Kaynakları", icon: "👥", desc: "Kariyer.net ile İK çözümleri", status: "in-progress" as const },
  { id: 4, name: "E-ticaret Çözümleri", icon: "🛒", desc: "Online satış altyapısı", status: "locked" as const },
  { id: 5, name: "Muhasebe Çözümleri", icon: "📊", desc: "Finansal yönetim araçları", status: "locked" as const },
  { id: 6, name: "Çoklu Kanal Satış", icon: "📱", desc: "Omnichannel satış yönetimi", status: "locked" as const },
  { id: 7, name: "Kredi & Finansman", icon: "💰", desc: "İşletme finansmanı", status: "locked" as const },
  { id: 8, name: "Ödeme Çözümleri", icon: "💳", desc: "POS ve ödeme sistemleri", status: "locked" as const },
  { id: 9, name: "Dijital Çözümler", icon: "🏢", desc: "ERP/CRM sistemleri", status: "locked" as const },
];

const statusConfig = {
  completed: { bg: "bg-success/10 border-success", iconBg: "bg-success", text: "text-success", label: "Tamamlandı" },
  "in-progress": { bg: "bg-warning/10 border-warning", iconBg: "bg-warning", text: "text-warning", label: "Devam Ediyor" },
  locked: { bg: "bg-muted/50 border-border", iconBg: "bg-muted", text: "text-muted-foreground", label: "Kilitli" },
};

const Harita = () => {
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const completed = stations.filter(s => s.status === "completed").length;

  return (
    <KobiLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Dijital Dönüşüm Haritası 🗺️</h1>
          <p className="text-muted-foreground mt-2">Yolculuğunuzu takip edin ve yeni istasyonların kilidini açın</p>
        </div>

        {/* Progress */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-foreground">İlerleme</span>
            <span className="text-sm font-bold text-primary">{completed}/{stations.length} istasyon</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(completed / stations.length) * 100}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full gradient-primary rounded-full" />
          </div>
        </div>

        {/* Stations */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-border hidden md:block" />

          <div className="space-y-6">
            {stations.map((station, idx) => {
              const config = statusConfig[station.status];
              return (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => station.status !== "locked" && setSelectedStation(station.id === selectedStation ? null : station.id)}
                  className={`relative flex items-start gap-5 p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-card-hover ${config.bg} ${selectedStation === station.id ? "shadow-premium" : ""}`}
                >
                  {/* Status icon */}
                  <div className={`w-16 h-16 rounded-2xl ${config.iconBg} flex items-center justify-center text-3xl shrink-0 relative z-10`}>
                    {station.status === "completed" ? <Check className="h-8 w-8 text-success-foreground" /> : station.status === "locked" ? <Lock className="h-6 w-6 text-muted-foreground" /> : station.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-foreground">{station.name}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.text} ${config.iconBg}/20`}>{config.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{station.desc}</p>

                    {selectedStation === station.id && station.status !== "locked" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-3">Bu istasyondaki partnerler ve çözümler için detay sayfasını ziyaret edin.</p>
                        <button className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                          Detayları Gör <ChevronRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {station.status === "in-progress" && (
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                        <Play className="h-5 w-5 text-warning fill-warning" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </KobiLayout>
  );
};

export default Harita;
