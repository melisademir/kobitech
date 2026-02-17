import { FileText, CheckCircle, Coins, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  { icon: FileText, color: "bg-primary", text: "Teklif gönderildi", detail: "ABC Tekstil - Nebim Era + 2 ürün", time: "2 saat önce" },
  { icon: CheckCircle, color: "bg-success", text: "Teklif onaylandı!", detail: "XYZ Market - Param POS", time: "5 saat önce", highlight: true },
  { icon: Coins, color: "bg-accent", text: "Komisyon ödendi", detail: "₺2.475 - DEF Gıda", time: "dün" },
  { icon: UserPlus, color: "bg-info", text: "Yeni müşteri eklendi", detail: "GHI Perakende A.Ş.", time: "dün" },
  { icon: FileText, color: "bg-primary", text: "Teklif gönderildi", detail: "JKL Üretim - 3 ürün paketi", time: "2 gün önce" },
  { icon: CheckCircle, color: "bg-success", text: "Teklif onaylandı!", detail: "MNO Hizmet - Param Kasa", time: "3 gün önce", highlight: true },
  { icon: Coins, color: "bg-accent", text: "Komisyon ödendi", detail: "₺1.890 - PQR E-ticaret", time: "4 gün önce" },
  { icon: FileText, color: "bg-primary", text: "Teklif gönderildi", detail: "STU Teknoloji - 5 ürün", time: "5 gün önce" },
];

const RecentActivity = () => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-foreground">Son Aktiviteler</h2>
      <button className="text-sm text-primary font-medium hover:underline">Tümünü Gör</button>
    </div>

    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-5">
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 pl-1 relative cursor-pointer group ${
                a.highlight ? "bg-success/5 -mx-2 px-3 py-2 rounded-lg" : ""
              }`}
            >
              <div className={`w-12 h-12 rounded-full ${a.color} flex items-center justify-center shrink-0 z-10`}>
                <a.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className={`font-bold ${a.highlight ? "text-success" : "text-foreground"}`}>{a.text}</span>{" "}
                  <span className="text-muted-foreground">{a.detail}</span>
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{a.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default RecentActivity;
