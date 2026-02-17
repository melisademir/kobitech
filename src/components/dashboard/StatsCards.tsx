import { Users, FileText, CheckCircle, Coins, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Users,
    label: "Toplam Müşteri",
    value: "47",
    trend: "+5 bu ay",
    trendUp: true,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "border-t-primary",
  },
  {
    icon: FileText,
    label: "Bu Ay Teklif",
    value: "12",
    trend: "12 teklif gönderildi",
    trendUp: false,
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    borderColor: "border-t-accent",
  },
  {
    icon: CheckCircle,
    label: "Dönüşüm Oranı",
    value: "%42",
    trend: "5 teklif onaylandı",
    trendUp: false,
    iconBg: "bg-success/10",
    iconColor: "text-success",
    borderColor: "border-t-success",
  },
  {
    icon: Coins,
    label: "Bu Ay Komisyon",
    value: "₺8.450",
    trend: "+%15 geçen aya göre",
    trendUp: true,
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    borderColor: "border-t-accent",
  },
];

const StatsCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {stats.map((s, i) => (
      <motion.div
        key={s.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className={`bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow border-t-4 ${s.borderColor}`}
      >
        <div className={`w-14 h-14 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
          <s.icon className={`h-7 w-7 ${s.iconColor}`} />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.label}</p>
        <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
        <p className={`text-xs mt-2 flex items-center gap-1 ${s.trendUp ? "text-success" : "text-muted-foreground"}`}>
          {s.trendUp && <TrendingUp className="h-3 w-3" />}
          {s.trend}
        </p>
      </motion.div>
    ))}
  </div>
);

export default StatsCards;
