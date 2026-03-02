import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, UserPlus, Pencil, ChevronDown, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

/* ───── Types ───── */
interface Proposal {
  id: string;
  customer: string;
  sector: string;
  products: string[];
  total: number;
  
  status: "pending" | "approved" | "rejected" | "invited";
  date: string;
  period: string;
  assignedDealer?: string | null;
  assignedAt?: string | null;
}

/* ───── Mock data ───── */
const dealers = [
  { id: "d1", name: "Ahmet Yılmaz" },
  { id: "d2", name: "Mehmet Kaya" },
  { id: "d3", name: "Elif Demir" },
  { id: "d4", name: "Zeynep Arslan" },
];

const CURRENT_DEALER = "d1"; // Ahmet Yılmaz

const initialProposals: Proposal[] = [
  { id: "PROP-001", customer: "ABC Tekstil Ltd.", sector: "Tekstil", products: ["Nebim Era", "Univera Stokbar", "Finrota Netahsilat"], total: 8200, status: "approved", date: "15 Şub 2026", period: "Aylık", assignedDealer: "d1", assignedAt: "12 Şub 2026" },
  { id: "PROP-002", customer: "XYZ Market", sector: "Perakende", products: ["Param POS", "Univera Stokbar"], total: 4000, status: "pending", date: "14 Şub 2026", period: "Aylık", assignedDealer: "d1", assignedAt: "13 Şub 2026" },
  { id: "PROP-003", customer: "DEF Gıda A.Ş.", sector: "Gıda", products: ["Univera Stokbar", "Finrota Netahsilat", "Param POS"], total: 5500, status: "pending", date: "13 Şub 2026", period: "Yıllık", assignedDealer: "d2", assignedAt: "11 Şub 2026" },
  { id: "PROP-004", customer: "GHI Lojistik", sector: "Lojistik", products: ["Univera Enroute", "Param Mobil"], total: 3750, status: "rejected", date: "10 Şub 2026", period: "Aylık", assignedDealer: null, assignedAt: null },
  { id: "PROP-005", customer: "JKL İnşaat", sector: "İnşaat", products: ["Univera Quest", "Kredim Business"], total: 4000, status: "invited", date: "12 Şub 2026", period: "Aylık", assignedDealer: "d3", assignedAt: "10 Şub 2026" },
  { id: "PROP-006", customer: "MNO E-ticaret", sector: "E-ticaret", products: ["Web Plus", "Param Kart", "Param Mobil"], total: 4150, status: "approved", date: "8 Şub 2026", period: "Aylık", assignedDealer: null, assignedAt: null },
  { id: "PROP-007", customer: "PQR Danışmanlık", sector: "Danışmanlık", products: ["Param DMS", "Param Çağrı Merkezi"], total: 3200, status: "approved", date: "5 Şub 2026", period: "Yıllık", assignedDealer: "d1", assignedAt: "4 Şub 2026" },
];

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "Bekleyen", className: "bg-warning/20 text-warning border-warning/30" },
  approved: { label: "Onaylandı", className: "bg-success/20 text-success border-success/30" },
  rejected: { label: "Reddedildi", className: "bg-destructive/20 text-destructive border-destructive/30" },
  invited: { label: "Davet Gönderildi", className: "bg-info/20 text-info border-info/30" },
};

// Ordered status flow for advancing/reverting
const statusFlow: Proposal["status"][] = ["pending", "invited", "approved"];

const assignmentFilterOptions = [
  { id: "all", label: "Tümü" },
  { id: "unassigned", label: "Atanmamış" },
  { id: "assigned", label: "Atanmış" },
];

/* ───── Status Change Popover ───── */
const StatusChangePopover = ({
  currentStatus,
  onStatusChange,
}: {
  currentStatus: Proposal["status"];
  onStatusChange: (newStatus: Proposal["status"]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const allStatuses: Proposal["status"][] = ["pending", "invited", "approved", "rejected"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <ChevronDown className="h-3 w-3" /> Statü
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <p className="text-xs font-medium text-muted-foreground px-2 py-1.5 mb-1">Statü Güncelle</p>
        {allStatuses.map(s => {
          const config = statusMap[s];
          return (
            <button
              key={s}
              onClick={() => { onStatusChange(s); setOpen(false); }}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-muted transition-colors text-foreground"
            >
              {s === currentStatus && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
              <Badge variant="outline" className={`text-[10px] ${config.className}`}>{config.label}</Badge>
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

/* ───── Dealer Assignment Popover ───── */
const DealerAssignPopover = ({
  currentDealer,
  onAssign,
}: {
  currentDealer: string | null | undefined;
  onAssign: (dealerId: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const currentName = dealers.find(d => d.id === currentDealer)?.name;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {currentDealer ? (
          <Button variant="outline" size="sm" className="gap-1.5">
            <Pencil className="h-3 w-3" /> Tekrar Ata
          </Button>
        ) : (
          <Button variant="hero" size="sm" className="gap-1.5">
            <UserPlus className="h-3 w-3" /> Bayi Ata
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <p className="text-xs font-medium text-muted-foreground px-2 py-1.5 mb-1">Bayi Seçin</p>
        {dealers.map(d => (
          <button
            key={d.id}
            onClick={() => { onAssign(d.id); setOpen(false); }}
            className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-muted transition-colors text-foreground"
          >
            {d.id === currentDealer && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
            <span className={d.id === currentDealer ? "font-semibold" : ""}>{d.name}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

/* ───── Main Page ───── */
const Proposals = () => {
  // Mock role toggle — admin@admin.com = admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [assignmentFilter, setAssignmentFilter] = useState("all");
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);

  const handleAssign = (proposalId: string, dealerId: string) => {
    setProposals(prev =>
      prev.map(p =>
        p.id === proposalId
          ? { ...p, assignedDealer: dealerId, assignedAt: "Bugün" }
          : p,
      ),
    );
  };

  const handleStatusChange = (proposalId: string, newStatus: Proposal["status"]) => {
    setProposals(prev =>
      prev.map(p =>
        p.id === proposalId ? { ...p, status: newStatus } : p,
      ),
    );
    const label = statusMap[newStatus].label;
    toast.success(`Teklif statüsü "${label}" olarak güncellendi`);
  };

  // Filter logic
  let visible = proposals;
  if (!isAdmin) {
    visible = visible.filter(p => p.assignedDealer === CURRENT_DEALER);
  }
  if (statusFilter !== "all") {
    visible = visible.filter(p => p.status === statusFilter);
  }
  if (isAdmin && assignmentFilter === "unassigned") {
    visible = visible.filter(p => !p.assignedDealer);
  } else if (isAdmin && assignmentFilter === "assigned") {
    visible = visible.filter(p => !!p.assignedDealer);
  }

  const statItems = isAdmin
    ? [
        { label: "Toplam Teklif", value: proposals.length, color: "text-foreground" },
        { label: "Atanmamış", value: proposals.filter(p => !p.assignedDealer).length, color: "text-warning" },
        { label: "Onaylanan", value: proposals.filter(p => p.status === "approved").length, color: "text-success" },
        
      ]
    : [
        { label: "Tekliflerim", value: visible.length, color: "text-foreground" },
        { label: "Bekleyen", value: visible.filter(p => ["pending", "invited"].includes(p.status)).length, color: "text-warning" },
        { label: "Onaylanan", value: visible.filter(p => p.status === "approved").length, color: "text-success" },
        
      ];

  const statusTabs = [
    { id: "all", label: "Tümü" },
    { id: "pending", label: "Bekleyen" },
    { id: "approved", label: "Onaylandı" },
    { id: "rejected", label: "Reddedildi" },
    
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {isAdmin ? "Teklif Yönetimi" : "Tekliflerim"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isAdmin ? "Tüm teklifleri yönetin ve bayilere atayın" : "Size atanan teklifleri takip edin"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Role toggle (mock) */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary/40 transition-colors"
            >
              {isAdmin ? "👤 Bayi Görünümü" : "🛡️ Admin Görünümü"}
            </button>
            <Link
              to="/customer-analysis"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" /> Yeni Teklif
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((s, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {statusTabs.map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${statusFilter === f.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:border-primary"}`}
            >
              {f.label}
            </button>
          ))}
          {isAdmin && (
            <>
              <div className="w-px bg-border mx-1 self-stretch" />
              {assignmentFilterOptions.map(f => (
                <button
                  key={f.id}
                  onClick={() => setAssignmentFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${assignmentFilter === f.id ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground border border-border hover:border-accent"}`}
                >
                  {f.label}
                </button>
              ))}
            </>
          )}
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
                  
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Durum</th>
                  {isAdmin && <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Atanan Bayi</th>}
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Tarih</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(p => {
                  const st = statusMap[p.status];
                  const dealerName = dealers.find(d => d.id === p.assignedDealer)?.name;
                  return (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 font-medium text-primary">{p.id}</td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-foreground">{p.customer}</p>
                        <Badge variant="outline" className="text-[10px] mt-0.5">{p.sector}</Badge>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <p className="text-muted-foreground text-xs">{p.products[0]}{p.products.length > 1 ? ` +${p.products.length - 1}` : ""}</p>
                      </td>
                      <td className="px-4 py-4 font-bold text-foreground">
                        {p.total.toLocaleString("tr-TR")}₺
                        <span className="text-[10px] font-normal text-muted-foreground">/{p.period === "Aylık" ? "ay" : "yıl"}</span>
                      </td>
                      
                      <td className="px-4 py-4">
                        <Badge variant="outline" className={`text-[10px] ${st.className}`}>{st.label}</Badge>
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-4 hidden lg:table-cell">
                          {dealerName ? (
                            <div>
                              <p className="text-xs font-medium text-foreground">{dealerName}</p>
                              {p.assignedAt && <p className="text-[10px] text-muted-foreground">{p.assignedAt}</p>}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">Atanmamış</span>
                          )}
                        </td>
                      )}
                      <td className="px-4 py-4 text-muted-foreground text-xs hidden lg:table-cell">{p.date}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/proposals/${p.id}`}>Detay</Link>
                          </Button>
                          <StatusChangePopover
                            currentStatus={p.status}
                            onStatusChange={(newStatus) => handleStatusChange(p.id, newStatus)}
                          />
                          {isAdmin && (
                            <DealerAssignPopover
                              currentDealer={p.assignedDealer}
                              onAssign={(dealerId) => handleAssign(p.id, dealerId)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {visible.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">📄</p>
              <p className="text-muted-foreground">
                {isAdmin ? "Bu filtreye uygun teklif bulunamadı" : "Size atanmış teklif bulunmuyor"}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Proposals;
