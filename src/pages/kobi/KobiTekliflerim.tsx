import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KobiLayout from "@/components/layout/KobiLayout";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle2, XCircle, ChevronRight, Package } from "lucide-react";
import { motion } from "framer-motion";

const mockQuotes = [
  { id: "TT-12345", products: ["Param POS", "Univera Stokbar"], status: "pending" as const, date: "2026-02-18", sender: "" },
  { id: "TT-12340", products: ["Param Kart", "Finrota Netahsilat 2.0"], status: "pending" as const, date: "2026-02-15", sender: "Ahmet Yılmaz (Bayi)", price: "2.400₺/ay" },
  { id: "TT-12338", products: ["Nebim Winner"], status: "approved" as const, date: "2026-02-10", sender: "Admin", price: "4.200₺/ay" },
];

const tabs = [
  { id: "all", label: "Tümü", icon: FileText },
  { id: "pending", label: "Bekleyen", icon: Clock },
  { id: "approved", label: "Onaylandı", icon: CheckCircle2 },
  { id: "rejected", label: "Reddedildi", icon: XCircle },
];

const statusConfig: Record<string, { label: string; icon: typeof Clock; bgClass: string; textClass: string; dotClass: string }> = {
  pending: { label: "Bekleyen", icon: Clock, bgClass: "bg-warning/10", textClass: "text-warning", dotClass: "bg-warning" },
  approved: { label: "Onaylandı", icon: CheckCircle2, bgClass: "bg-success/10", textClass: "text-success", dotClass: "bg-success" },
  rejected: { label: "Reddedildi", icon: XCircle, bgClass: "bg-destructive/10", textClass: "text-destructive", dotClass: "bg-destructive" },
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
};

const KobiTekliflerim = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const filtered = activeTab === "all" ? mockQuotes : mockQuotes.filter(q => q.status === activeTab);

  const pendingCount = mockQuotes.filter(q => q.status === "pending").length;
  const approvedCount = mockQuotes.filter(q => q.status === "approved").length;

  return (
    <KobiLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Tekliflerim</h1>
          <p className="text-muted-foreground mt-1">Size gelen teklifleri buradan takip edebilirsiniz.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockQuotes.length}</p>
              <p className="text-xs text-muted-foreground">Toplam Teklif</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Bekleyen</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
              <p className="text-xs text-muted-foreground">Onaylanan</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(t => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  active
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Quote List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Bu kategoride teklif bulunmuyor.</p>
            </div>
          ) : filtered.map((q, index) => {
            const config = statusConfig[q.status];
            const StatusIcon = config.icon;
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/digitalhub/my-quotes/${q.id}`)}
                className="group rounded-2xl border border-border bg-card p-5 cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:border-primary/20"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left */}
                  <div className="flex gap-4 flex-1 min-w-0">
                    {/* Status indicator */}
                    <div className={`w-11 h-11 rounded-xl ${config.bgClass} flex items-center justify-center shrink-0`}>
                      <StatusIcon className={`w-5 h-5 ${config.textClass}`} />
                    </div>

                    <div className="space-y-2 min-w-0">
                      {/* ID + Status */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold text-foreground text-base">#{q.id}</span>
                        <Badge className={`${config.bgClass} ${config.textClass} border-0 font-medium text-xs px-2.5 py-0.5`}>
                          {config.label}
                        </Badge>
                      </div>

                      {/* Products as tags */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Package className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        {q.products.map((p, i) => (
                          <span key={i} className="text-xs bg-muted text-muted-foreground rounded-lg px-2.5 py-1 font-medium">
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* Meta */}
                      <p className="text-xs text-muted-foreground">
                        {formatDate(q.date)}
                        {q.sender && <span> · {q.sender}</span>}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price + Arrow */}
                  <div className="flex items-center gap-3 shrink-0">
                    {q.price && (
                      <span className="text-lg font-bold text-primary">{q.price}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </KobiLayout>
  );
};

export default KobiTekliflerim;
