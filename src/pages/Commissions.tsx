import { useState } from "react";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "@/hooks/use-toast";

interface Commission {
  id: string;
  customer: string;
  sector: string;
  proposalId: string;
  products: string[];
  saleAmount: number;
  rate: number;
  commission: number;
  paymentDate: string;
  status: "pending" | "paid" | "admin_review" | "rejected";
}

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "Bekleyen Komisyon", className: "bg-warning/20 text-warning" },
  paid: { label: "Ödendi", className: "bg-success/20 text-success" },
  admin_review: { label: "Admin Onayı Bekliyor", className: "bg-muted text-muted-foreground" },
  rejected: { label: "Reddedildi", className: "bg-destructive/20 text-destructive" },
};

const mockCommissions: Commission[] = [
  { id: "COM-001", customer: "ABC Tekstil Ltd.", sector: "Tekstil", proposalId: "PROP-001", products: ["Nebim Era", "Univera Stokbar", "Finrota Netahsilat"], saleAmount: 8200, rate: 17, commission: 1394, paymentDate: "15 Mar 2026", status: "pending" },
  { id: "COM-002", customer: "PQR Danışmanlık", sector: "Danışmanlık", proposalId: "PROP-007", products: ["Param DMS", "Param Çağrı Merkezi"], saleAmount: 3200, rate: 15, commission: 480, paymentDate: "15 Mar 2026", status: "pending" },
  { id: "COM-003", customer: "STU Perakende", sector: "Perakende", proposalId: "PROP-010", products: ["Param POS", "Univera Stokbar"], saleAmount: 4000, rate: 18, commission: 720, paymentDate: "15 Şub 2026", status: "paid" },
  { id: "COM-004", customer: "VWX Gıda", sector: "Gıda", proposalId: "PROP-009", products: ["Univera Stokbar", "Finrota Netahsilat"], saleAmount: 3700, rate: 15, commission: 555, paymentDate: "15 Şub 2026", status: "paid" },
  { id: "COM-005", customer: "MNO E-ticaret", sector: "E-ticaret", proposalId: "PROP-006", products: ["Web Plus", "Param Kart", "Param Mobil"], saleAmount: 4150, rate: 18, commission: 747, paymentDate: "15 Mar 2026", status: "admin_review" },
  { id: "COM-006", customer: "YZA Turizm", sector: "Turizm", proposalId: "PROP-012", products: ["Web Plus", "Param Kart"], saleAmount: 3200, rate: 17, commission: 544, paymentDate: "15 Oca 2026", status: "paid" },
];

const Commissions = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [bankEditing, setBankEditing] = useState(false);
  const [bankInfo, setBankInfo] = useState({ bank: "Ziraat Bankası", branch: "Kadıköy Şubesi", iban: "TR12 3456 7890 1234 5678 9012 34", holder: "Ahmet Yılmaz" });

  const filtered = statusFilter === "all" ? mockCommissions : mockCommissions.filter(c => c.status === statusFilter);

  const pending = mockCommissions.filter(c => c.status === "pending").reduce((s, c) => s + c.commission, 0);
  const paidThisMonth = mockCommissions.filter(c => c.status === "paid" && c.paymentDate.includes("Şub")).reduce((s, c) => s + c.commission, 0);
  const yearTotal = mockCommissions.filter(c => c.status === "paid").reduce((s, c) => s + c.commission, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">💰 Komisyon & Ödemeler</h1>
          <p className="text-sm text-muted-foreground mt-1">Komisyon kazançlarınızı ve ödeme detaylarını takip edin</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl shadow-card p-5 border-l-4 border-warning">
            <p className="text-xs text-muted-foreground">Bekleyen Komisyon</p>
            <p className="text-3xl font-bold text-warning mt-1">{pending.toLocaleString("tr-TR")}₺</p>
            <p className="text-[10px] text-muted-foreground">{mockCommissions.filter(c => c.status === "pending").length} ödeme bekliyor</p>
          </div>
          <div className="bg-card rounded-xl shadow-card p-5 border-l-4 border-success">
            <p className="text-xs text-muted-foreground">Bu Ay Ödenen</p>
            <p className="text-3xl font-bold text-success mt-1">{paidThisMonth.toLocaleString("tr-TR")}₺</p>
            <p className="text-[10px] text-muted-foreground">15 Şubat 2026'da ödendi</p>
          </div>
          <div className="bg-card rounded-xl shadow-card p-5 border-l-4 border-primary">
            <p className="text-xs text-muted-foreground">Yıl İçi Toplam</p>
            <p className="text-3xl font-bold text-primary mt-1">{yearTotal.toLocaleString("tr-TR")}₺</p>
            <p className="text-[10px] text-muted-foreground">2026 yılı</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: "Tümü" },
            { id: "pending", label: "Bekleyen" },
            { id: "paid", label: "Ödendi" },
            { id: "admin_review", label: "Admin Onayı" },
          ].map(f => (
            <button key={f.id} onClick={() => setStatusFilter(f.id)} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${statusFilter === f.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:border-primary"}`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Müşteri</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Ürünler</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Satış</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Oran</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Komisyon</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Ödeme Tarihi</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Durum</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => {
                  const st = statusMap[c.status];
                  return (
                    <tr key={c.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">
                        <p className="font-medium text-foreground">{c.customer}</p>
                        <Badge variant="outline" className="text-[10px] mt-0.5">{c.sector}</Badge>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell text-xs text-muted-foreground">{c.products[0]}{c.products.length > 1 ? ` +${c.products.length - 1}` : ""}</td>
                      <td className="px-4 py-4 text-right font-medium text-foreground">{c.saleAmount.toLocaleString("tr-TR")}₺</td>
                      <td className="px-4 py-4 text-right text-muted-foreground hidden md:table-cell">%{c.rate}</td>
                      <td className="px-4 py-4 text-right font-bold text-accent text-lg">{c.commission.toLocaleString("tr-TR")}₺</td>
                      <td className="px-4 py-4 text-muted-foreground text-xs hidden lg:table-cell">{c.paymentDate}</td>
                      <td className="px-4 py-4"><Badge className={`text-[10px] ${st.className}`}>{st.label}</Badge></td>
                      <td className="px-4 py-4">
                        {c.status === "paid" && (
                          <button onClick={() => toast({ title: "Fatura indiriliyor...", duration: 1500 })} className="text-primary hover:underline text-xs"><Download className="h-4 w-4" /></button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bank Info */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Banka Hesap Bilgilerim</h2>
            <button onClick={() => {
              if (bankEditing) toast({ title: "Bilgiler güncellendi ✓", duration: 2000 });
              setBankEditing(!bankEditing);
            }} className="text-sm text-primary font-medium hover:underline">
              {bankEditing ? "Kaydet" : "Düzenle"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Banka Adı", key: "bank" },
              { label: "Şube", key: "branch" },
              { label: "IBAN", key: "iban" },
              { label: "Hesap Sahibi", key: "holder" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-muted-foreground">{f.label}</label>
                {bankEditing ? (
                  <input value={(bankInfo as any)[f.key]} onChange={e => setBankInfo(prev => ({ ...prev, [f.key]: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary" />
                ) : (
                  <p className="text-sm font-medium text-foreground mt-1">{(bankInfo as any)[f.key]}</p>
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-4">Komisyon ödemeleriniz her ayın 15'inde bu hesaba yatırılır. Minimum ödeme tutarı: 500₺</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Commissions;
