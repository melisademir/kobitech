import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Download, MoreHorizontal, Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Proposal {
  id: string;
  customer: string;
  sector: string;
  products: string[];
  total: number;
  commission: number;
  status: "pending" | "approved" | "rejected" | "viewed" | "manual" | "invited";
  date: string;
  period: string;
}

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "Bekleyen", className: "bg-warning/20 text-warning border-warning/30" },
  approved: { label: "Onaylandı ve Ödendi", className: "bg-success/20 text-success border-success/30" },
  rejected: { label: "Reddedildi", className: "bg-destructive/20 text-destructive border-destructive/30" },
  viewed: { label: "Görüntülendi", className: "bg-info/20 text-info border-info/30" },
  manual: { label: "Manuel Onaylandı", className: "bg-primary/20 text-primary border-primary/30" },
  invited: { label: "Davet Gönderildi", className: "bg-info/20 text-info border-info/30" },
};

const mockProposals: Proposal[] = [
  { id: "PROP-001", customer: "ABC Tekstil Ltd.", sector: "Tekstil", products: ["Nebim Era", "Univera Stokbar", "Finrota Netahsilat"], total: 8200, commission: 1394, status: "approved", date: "15 Şub 2026", period: "Aylık" },
  { id: "PROP-002", customer: "XYZ Market", sector: "Perakende", products: ["Param POS", "Univera Stokbar"], total: 4000, commission: 700, status: "pending", date: "14 Şub 2026", period: "Aylık" },
  { id: "PROP-003", customer: "DEF Gıda A.Ş.", sector: "Gıda", products: ["Univera Stokbar", "Finrota Netahsilat", "Param POS"], total: 5500, commission: 880, status: "viewed", date: "13 Şub 2026", period: "Yıllık" },
  { id: "PROP-004", customer: "GHI Lojistik", sector: "Lojistik", products: ["Univera Enroute", "Param Mobil"], total: 3750, commission: 637, status: "rejected", date: "10 Şub 2026", period: "Aylık" },
  { id: "PROP-005", customer: "JKL İnşaat", sector: "İnşaat", products: ["Univera Quest", "Kredim Business"], total: 4000, commission: 640, status: "invited", date: "12 Şub 2026", period: "Aylık" },
  { id: "PROP-006", customer: "MNO E-ticaret", sector: "E-ticaret", products: ["Web Plus", "Param Kart", "Param Mobil"], total: 4150, commission: 747, status: "manual", date: "8 Şub 2026", period: "Aylık" },
  { id: "PROP-007", customer: "PQR Danışmanlık", sector: "Danışmanlık", products: ["Param DMS", "Param Çağrı Merkezi"], total: 3200, commission: 480, status: "approved", date: "5 Şub 2026", period: "Yıllık" },
];

const Proposals = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all" ? mockProposals : mockProposals.filter(p => p.status === statusFilter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Tekliflerim</h1>
            <p className="text-sm text-muted-foreground mt-1">Oluşturduğunuz teklifleri takip edin</p>
          </div>
          <Link to="/customer-analysis" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Yeni Teklif
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Toplam Teklif", value: mockProposals.length, color: "text-foreground" },
            { label: "Bekleyen", value: mockProposals.filter(p => ["pending", "viewed", "invited"].includes(p.status)).length, color: "text-warning" },
            { label: "Onaylanan", value: mockProposals.filter(p => ["approved", "manual"].includes(p.status)).length, color: "text-success" },
            { label: "Toplam Komisyon", value: `${mockProposals.filter(p => ["approved", "manual"].includes(p.status)).reduce((s, p) => s + p.commission, 0).toLocaleString("tr-TR")}₺`, color: "text-accent" },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: "Tümü" },
            { id: "pending", label: "Bekleyen" },
            { id: "viewed", label: "Görüntülendi" },
            { id: "approved", label: "Onaylandı" },
            { id: "rejected", label: "Reddedildi" },
            { id: "manual", label: "Manuel" },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${statusFilter === f.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:border-primary"}`}
            >
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
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Teklif #</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Müşteri</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Ürünler</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tutar</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Komisyon</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Durum</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const st = statusMap[p.status];
                  return (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer">
                      <td className="px-4 py-4 font-medium text-primary">{p.id}</td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-foreground">{p.customer}</p>
                        <Badge variant="outline" className="text-[10px] mt-0.5">{p.sector}</Badge>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <p className="text-muted-foreground text-xs">{p.products[0]}{p.products.length > 1 ? ` +${p.products.length - 1}` : ""}</p>
                      </td>
                      <td className="px-4 py-4 font-bold text-foreground">{p.total.toLocaleString("tr-TR")}₺<span className="text-[10px] font-normal text-muted-foreground">/{p.period === "Aylık" ? "ay" : "yıl"}</span></td>
                      <td className="px-4 py-4 hidden sm:table-cell font-bold text-accent">{p.commission.toLocaleString("tr-TR")}₺</td>
                      <td className="px-4 py-4"><Badge variant="outline" className={`text-[10px] ${st.className}`}>{st.label}</Badge></td>
                      <td className="px-4 py-4 text-muted-foreground text-xs hidden lg:table-cell">{p.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">📄</p>
              <p className="text-muted-foreground">Bu filtreye uygun teklif bulunamadı</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Proposals;
