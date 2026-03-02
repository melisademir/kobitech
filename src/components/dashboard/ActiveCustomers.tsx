import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const customers = [
  { name: "ABC Tekstil A.Ş.", sector: "Tekstil", readiness: 78, lastActivity: "2 gün önce" },
  { name: "XYZ Market Zinciri", sector: "Perakende", readiness: 92, lastActivity: "bugün" },
  { name: "DEF Gıda Ltd.", sector: "Gıda", readiness: 65, lastActivity: "5 gün önce" },
  { name: "GHI Teknoloji", sector: "Teknoloji", readiness: 45, lastActivity: "1 hafta önce" },
  { name: "JKL E-ticaret", sector: "E-ticaret", readiness: 88, lastActivity: "3 gün önce" },
];

const CircularProgress = ({ value }: { value: number }) => {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width="40" height="40" className="transform -rotate-90">
      <circle cx="20" cy="20" r={r} fill="none" stroke="hsl(220, 13%, 91%)" strokeWidth="3" />
      <circle cx="20" cy="20" r={r} fill="none" stroke="hsl(16, 100%, 60%)" strokeWidth="3" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="20" y="20" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[10px] font-bold" transform="rotate(90, 20, 20)">{value}%</text>
    </svg>
  );
};

const ActiveCustomers = () => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-foreground">Aktif Müşterilerim</h2>
      <button className="text-sm text-primary font-medium hover:underline">Tümünü Gör</button>
    </div>

    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="bg-background text-muted-foreground text-xs font-bold uppercase tracking-wider">
              <th className="text-left p-4">Şirket</th>
              <th className="text-left p-4">Sektör</th>
              
              <th className="text-left p-4">Son Aktivite</th>
              <th className="text-right p-4">Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.name} className="border-t border-border hover:bg-background/50 transition-colors">
                <td className="p-4 font-semibold text-foreground">{c.name}</td>
                <td className="p-4"><Badge>{c.sector}</Badge></td>
                
                <td className="p-4 text-sm text-muted-foreground">{c.lastActivity}</td>
                <td className="p-4 text-right">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to="/sales/customer-analysis">Teklif Hazırla</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {customers.map((c) => (
          <div key={c.name} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{c.name}</p>
                <Badge className="mt-1">{c.sector}</Badge>
              </div>
              
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{c.lastActivity}</span>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link to="/sales/customer-analysis">Teklif Hazırla</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ActiveCustomers;
