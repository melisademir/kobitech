import { useState } from "react";
import { Users, FileText, CheckCircle, TrendingUp, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";

const trendData = [
  { month: "Mar", sent: 8, approved: 3, commission: 4200 },
  { month: "Nis", sent: 12, approved: 5, commission: 7800 },
  { month: "May", sent: 10, approved: 6, commission: 9200 },
  { month: "Haz", sent: 15, approved: 8, commission: 12400 },
  { month: "Tem", sent: 14, approved: 7, commission: 10800 },
  { month: "Ağu", sent: 11, approved: 5, commission: 8500 },
  { month: "Eyl", sent: 18, approved: 10, commission: 15600 },
  { month: "Eki", sent: 16, approved: 9, commission: 14200 },
  { month: "Kas", sent: 20, approved: 11, commission: 16800 },
  { month: "Ara", sent: 22, approved: 13, commission: 19500 },
  { month: "Oca", sent: 19, approved: 10, commission: 15400 },
  { month: "Şub", sent: 14, approved: 7, commission: 11200 },
];

const topProducts = [
  { rank: "🥇", name: "Param POS", sales: 12, revenue: 102000, commission: 20400 },
  { rank: "🥈", name: "Univera Stokbar", sales: 9, revenue: 64800, commission: 9720 },
  { rank: "🥉", name: "Nebim Era", sales: 6, revenue: 324000, commission: 58320 },
  { rank: "4", name: "Finrota Netahsilat", sales: 8, revenue: 57600, commission: 8640 },
  { rank: "5", name: "Web Plus", sales: 5, revenue: 42000, commission: 6300 },
];

const sectorPerf = [
  { sector: "Perakende", customers: 15, proposals: 22, approved: 11, rate: 50, avgAmount: 9500, avgComm: 1425 },
  { sector: "Tekstil", customers: 10, proposals: 16, approved: 9, rate: 56, avgAmount: 12800, avgComm: 1920 },
  { sector: "Gıda", customers: 8, proposals: 12, approved: 5, rate: 42, avgAmount: 8200, avgComm: 1230 },
  { sector: "E-ticaret", customers: 6, proposals: 10, approved: 3, rate: 30, avgAmount: 7500, avgComm: 1125 },
  { sector: "Lojistik", customers: 4, proposals: 6, approved: 3, rate: 50, avgAmount: 11000, avgComm: 1870 },
];

const commissionData = trendData.map(d => ({ month: d.month, amount: d.commission }));

const timePeriods = ["Bu Ay", "Son 3 Ay", "Son 6 Ay", "Bu Yıl", "Tüm Zamanlar"];

const Performance = () => {
  const [period, setPeriod] = useState("Bu Yıl");

  const rateColor = (r: number) => r > 50 ? "bg-success/20 text-success" : r >= 40 ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Performans Raporlarım</h1>
          <p className="text-sm text-muted-foreground mt-1">Satış performansınızı ve kazançlarınızı detaylı inceleyin</p>
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { icon: Users, label: "Toplam Müşteri", value: "43", iconBg: "bg-primary/10", iconColor: "text-primary" },
            { icon: FileText, label: "Toplam Teklif", value: "87", iconBg: "bg-accent/10", iconColor: "text-accent" },
            { icon: CheckCircle, label: "Onaylanan", value: "52", iconBg: "bg-success/10", iconColor: "text-success" },
            { icon: TrendingUp, label: "Dönüşüm Oranı", value: "%60", iconBg: "bg-info/10", iconColor: "text-info" },
            { icon: DollarSign, label: "Toplam Komisyon", value: "145.600₺", iconBg: "bg-accent/10", iconColor: "text-accent" },
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
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="sent" name="Gönderilen" stroke="hsl(16, 100%, 60%)" strokeWidth={3} dot={{ r: 4 }} />
                <Line yAxisId="left" type="monotone" dataKey="approved" name="Onaylanan" stroke="hsl(160, 84%, 39%)" strokeWidth={3} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="commission" name="Komisyon (₺)" stroke="hsl(40, 100%, 58%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
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
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground hidden sm:table-cell">Toplam Tutar</th>
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground">Komisyon</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30">
                    <td className="px-3 py-3 text-lg">{p.rank}</td>
                    <td className="px-3 py-3 font-medium text-foreground">{p.name}</td>
                    <td className="px-3 py-3 text-right text-foreground">{p.sales}</td>
                    <td className="px-3 py-3 text-right text-foreground hidden sm:table-cell">{p.revenue.toLocaleString("tr-TR")}₺</td>
                    <td className="px-3 py-3 text-right font-bold text-accent">{p.commission.toLocaleString("tr-TR")}₺</td>
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
                  <th className="text-right px-3 py-2 font-medium text-muted-foreground hidden md:table-cell">Ort. Komisyon</th>
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
                    <td className="px-3 py-3 text-right font-bold text-accent hidden md:table-cell">{s.avgComm.toLocaleString("tr-TR")}₺</td>
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
              <p className="text-primary-foreground/90 text-sm mt-1">Tekstil sektöründe en yüksek dönüşüm oranınız var (%56). Bu sektöre odaklanın! Nebim Era satışlarınızdan en yüksek komisyonu kazanıyorsunuz (58.320₺).</p>
            </div>
          </div>
        </div>

        {/* Commission Summary */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">💰 Komisyon Durumu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-warning/5 border-l-4 border-warning rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Bekleyen Komisyon</p>
              <p className="text-2xl font-bold text-warning mt-1">12.500₺</p>
              <p className="text-[10px] text-muted-foreground">3 ödeme bekliyor</p>
            </div>
            <div className="bg-success/5 border-l-4 border-success rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Bu Ay Ödenen</p>
              <p className="text-2xl font-bold text-success mt-1">8.400₺</p>
              <p className="text-[10px] text-muted-foreground">15 Şubat 2026'da ödendi</p>
            </div>
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4">
              <p className="text-xs text-muted-foreground">Yıl İçi Toplam</p>
              <p className="text-2xl font-bold text-primary mt-1">145.600₺</p>
              <p className="text-[10px] text-muted-foreground">2026 yılı</p>
            </div>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commissionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} formatter={(val: number) => [`${val.toLocaleString("tr-TR")}₺`, "Komisyon"]} />
                <Bar dataKey="amount" fill="hsl(40, 100%, 58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
