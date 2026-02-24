import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Eylül", teklifler: 8, onaylanan: 3 },
  { month: "Ekim", teklifler: 12, onaylanan: 5 },
  { month: "Kasım", teklifler: 15, onaylanan: 7 },
  { month: "Aralık", teklifler: 10, onaylanan: 4 },
  { month: "Ocak", teklifler: 18, onaylanan: 8 },
  { month: "Şubat", teklifler: 12, onaylanan: 5 },
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
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 5%, 47%)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 91%)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            formatter={(value: number, name: string) => {
              if (name === "teklifler") return [value, "Gönderilen"];
              return [value, "Onaylanan"];
            }}
          />
          <Legend formatter={(value) => {
            if (value === "teklifler") return "Gönderilen Teklifler";
            return "Onaylanan Teklifler";
          }} />
          <Line type="monotone" dataKey="teklifler" stroke="hsl(16, 100%, 60%)" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="onaylanan" stroke="hsl(160, 84%, 39%)" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PerformanceChart;
