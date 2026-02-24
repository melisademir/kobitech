import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Eylül", teklifler: 8, onaylanan: 3, komisyon: 12000 },
  { month: "Ekim", teklifler: 12, onaylanan: 5, komisyon: 18500 },
  { month: "Kasım", teklifler: 15, onaylanan: 7, komisyon: 24000 },
  { month: "Aralık", teklifler: 10, onaylanan: 4, komisyon: 15000 },
  { month: "Ocak", teklifler: 18, onaylanan: 8, komisyon: 32000 },
  { month: "Şubat", teklifler: 12, onaylanan: 5, komisyon: 22000 },
];

const PerformanceChart = () => (
  <div>
    <div className="mb-5">
      <h2 className="text-xl font-bold text-foreground">Performans Özeti</h2>
      <p className="text-sm text-muted-foreground">Son 6 aylık performansınız</p>
    </div>
    <div className="bg-card rounded-xl shadow-card p-6">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 5%, 47%)" />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(220, 5%, 47%)" />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(220, 5%, 47%)" tickFormatter={(v) => `₺${(v / 1000).toFixed(0)}K`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 91%)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            formatter={(value: number, name: string) => {
              if (name === "komisyon") return [`₺${value.toLocaleString("tr-TR")}`, "Komisyon"];
              if (name === "teklifler") return [value, "Gönderilen"];
              return [value, "Onaylanan"];
            }}
          />
          <Legend formatter={(value) => {
            if (value === "teklifler") return "Gönderilen Teklifler";
            if (value === "onaylanan") return "Onaylanan Teklifler";
            return "Komisyon (₺)";
          }} />
          <Line yAxisId="left" type="monotone" dataKey="teklifler" stroke="hsl(16, 100%, 60%)" strokeWidth={3} dot={{ r: 4 }} />
          <Line yAxisId="left" type="monotone" dataKey="onaylanan" stroke="hsl(160, 84%, 39%)" strokeWidth={3} dot={{ r: 4 }} />
          <Line yAxisId="right" type="monotone" dataKey="komisyon" stroke="hsl(40, 100%, 58%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PerformanceChart;
