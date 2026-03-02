import { useState } from "react";
import { Users, FileText, CheckCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";

const trendData = [
  { month: "Mar", sent: 8, approved: 3 },
  { month: "Nis", sent: 12, approved: 5 },
  { month: "May", sent: 10, approved: 6 },
  { month: "Haz", sent: 15, approved: 8 },
  { month: "Tem", sent: 14, approved: 7 },
  { month: "Ağu", sent: 11, approved: 5 },
  { month: "Eyl", sent: 18, approved: 10 },
  { month: "Eki", sent: 16, approved: 9 },
  { month: "Kas", sent: 20, approved: 11 },
  { month: "Ara", sent: 22, approved: 13 },
  { month: "Oca", sent: 19, approved: 10 },
  { month: "Şub", sent: 14, approved: 7 },
];

const topProducts = [
  { rank: "🥇", name: "Param POS", sales: 12, revenue: 102000 },
  { rank: "🥈", name: "Univera Stokbar", sales: 9, revenue: 64800 },
  { rank: "🥉", name: "Nebim Era", sales: 6, revenue: 324000 },
  { rank: "4", name: "Finrota Netahsilat", sales: 8, revenue: 57600 },
  { rank: "5", name: "Web Plus", sales: 5, revenue: 42000 },
];

const sectorPerf = [
  { sector: "Perakende", customers: 15, proposals: 22, approved: 11, rate: 50, avgAmount: 9500 },
  { sector: "Tekstil", customers: 10, proposals: 16, approved: 9, rate: 56, avgAmount: 12800 },
  { sector: "Gıda", customers: 8, proposals: 12, approved: 5, rate: 42, avgAmount: 8200 },
  { sector: "E-ticaret", customers: 6, proposals: 10, approved: 3, rate: 30, avgAmount: 7500 },
  { sector: "Lojistik", customers: 4, proposals: 6, approved: 3, rate: 50, avgAmount: 11000 },
];

const timePeriods = ["Bu Ay", "Son 3 Ay", "Son 6 Ay", "Bu Yıl", "Tüm Zamanlar"];

const Performance = () => {
  const [period, setPeriod] = useState("Bu Yıl");

  const rateColor = (r: number) => r > 50 ? "bg-success/20 text-success" : r >= 40 ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Performans Raporlarım</h1>
          <p className="text-sm text-muted-foreground mt-1">Satış performansınızı detaylı inceleyin</p>
        </div>

        {/* Period filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {timePeriods.map(t => (
            <button key={t} onClick={() => setPeriod(t)} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${period === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:border-primary"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Toplam Müşteri", value: "43", iconBg: "bg-primary/10", iconColor: "text-primary" },
            { icon: FileText, label: "Toplam Teklif", value: "87", iconBg: "bg-accent/10", iconColor: "text-accent" },
            { icon: CheckCircle, label: "Onaylanan", value: "52", iconBg: "bg-success/10", iconColor: "text-success" },
            { icon: TrendingUp, label: "Dönüşüm Oranı", value: "%60", iconBg: "bg-info/10", iconColor: "text-info" },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-5">
              <div className={`w-10 h-10 rounded-lg ${s.iconBg} flex items-center justify-center mb-3`}>
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Trend Chart */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-bold text-foreground mb-1">Performans Trendi</h2>
          <p className="text-xs text-muted-foreground mb-4">Son 12 aylık performans</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="sent" name="Gönderilen" stroke="hsl(16, 100%, 60%)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="approved" name="Onaylanan" stroke="hsl(160, 84%, 39%)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">🏆 En Çok Satan Ürünlerim</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Sıra</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Ürün</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Satış</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Toplam Tutar</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30">
                    <td className="px-3 py-3 text-lg">{p.rank}</td>
                    <td className="px-3 py-3 font-medium text-foreground">{p.name}</td>
                    <td className="px-3 py-3 text-right text-foreground">{p.sales}</td>
                    <td className="px-3 py-3 text-right font-bold text-foreground">{p.revenue.toLocaleString("tr-TR")}₺</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sector Performance */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sektörlere Göre Performansım</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Sektör</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Müşteri</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground hidden sm:table-cell">Teklif</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground hidden sm:table-cell">Onay</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Dönüşüm</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground hidden md:table-cell">Ort. Tutar</th>
                </tr>
              </thead>
              <tbody>
                {sectorPerf.map((s, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30">
                    <td className="px-3 py-3"><Badge variant="outline" className="text-xs">{s.sector}</Badge></td>
                    <td className="px-3 py-3 text-right text-foreground">{s.customers}</td>
                    <td className="px-3 py-3 text-right text-foreground hidden sm:table-cell">{s.proposals}</td>
                    <td className="px-3 py-3 text-right text-foreground hidden sm:table-cell">{s.approved}</td>
                    <td className="px-3 py-3 text-right"><Badge className={`text-[10px] ${rateColor(s.rate)}`}>%{s.rate}</Badge></td>
                    <td className="px-3 py-3 text-right font-bold text-foreground hidden md:table-cell">{s.avgAmount.toLocaleString("tr-TR")}₺</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Insight */}
          <div className="gradient-primary rounded-xl p-5 mt-6 flex gap-4 items-start">
            <span className="text-3xl">💡</span>
            <div>
              <p className="text-primary-foreground font-bold">Performans İçgörüsü</p>
              <p className="text-primary-foreground/90 text-sm mt-1">Tekstil sektöründe en yüksek dönüşüm oranınız var (%56). Bu sektöre odaklanın!</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
