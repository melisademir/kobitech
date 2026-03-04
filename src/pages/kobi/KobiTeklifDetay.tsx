import { useParams, useNavigate, Link } from "react-router-dom";
import KobiLayout from "@/components/layout/KobiLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Clock, CheckCircle2, XCircle, Package, CalendarDays, User, StickyNote, Copy, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockQuotes: Record<string, {
  id: string;
  products: { name: string; description: string; productId?: string }[];
  status: "pending" | "approved" | "rejected";
  date: string;
  sender: string;
  note: string;
}> = {
  "TT-12345": {
    id: "TT-12345",
    products: [
      { name: "Param POS", description: "Yeni nesil yazarkasa POS. Hızlı ödeme, kampanya, stok senkronizasyon.", productId: "param-fiziki-pos" },
      { name: "Univera Stokbar", description: "Gelişmiş stok ve depo yönetimi. Barkod, FIFO, parti takibi.", productId: "univera-stokbar" },
    ],
    status: "pending",
    date: "2026-02-18",
    sender: "",
    note: "Hızlı kurulum talep edildi.",
  },
  "TT-12340": {
    id: "TT-12340",
    products: [
      { name: "Param Kart", description: "Sanal ve fiziksel kart çözümleri. Online ödeme entegrasyonu.", productId: "param-kart" },
      { name: "Finrota Netahsilat 2.0", description: "Tahsilat ve ödeme yönetimi. Fatura, cari hesap, banka entegrasyonu.", productId: "finrota-netahsilat" },
    ],
    status: "pending",
    date: "2026-02-15",
    sender: "Ahmet Yılmaz (Bayi)",
    note: "12 ay taahhüt ile özel fiyat sunulmuştur.",
  },
  "TT-12338": {
    id: "TT-12338",
    products: [
      { name: "Nebim Winner", description: "Kurumsal ERP çözümü. Üretim, stok, satış, finans modülleri entegre.", productId: "nebim-winner" },
    ],
    status: "approved",
    date: "2026-02-10",
    sender: "Admin",
    note: "Onaylanmış teklif. Kurulum süreci başlatıldı.",
  },
};

const statusConfig: Record<string, { label: string; description: string; icon: typeof Clock; bgClass: string; textClass: string; borderClass: string }> = {
  pending: { label: "Bekleyen", description: "Ekibimiz işletmenize en uygun teklifi sunmak için size mail veya telefon yoluyla ulaşacak.", icon: Clock, bgClass: "bg-warning/10", textClass: "text-warning", borderClass: "border-warning/20" },
  approved: { label: "Onaylandı", description: "Teklifiniz onaylanmış durumda", icon: CheckCircle2, bgClass: "bg-success/10", textClass: "text-success", borderClass: "border-success/20" },
  rejected: { label: "Reddedildi", description: "Teklifiniz reddedildi", icon: XCircle, bgClass: "bg-destructive/10", textClass: "text-destructive", borderClass: "border-destructive/20" },
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
};

const KobiTeklifDetay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quote = id ? mockQuotes[id] : null;

  if (!quote) {
    return (
      <KobiLayout>
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg font-medium">Teklif bulunamadı.</p>
          <Button variant="outline" onClick={() => navigate("/digitalhub/my-quotes")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Tekliflerime Dön
          </Button>
        </div>
      </KobiLayout>
    );
  }

  const config = statusConfig[quote.status];
  const StatusIcon = config.icon;

  return (
    <KobiLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb-style back nav */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => navigate("/digitalhub/my-quotes")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Tekliflerime Dön
          </button>
        </motion.div>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`rounded-2xl border ${config.borderClass} ${config.bgClass} p-5`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${config.bgClass} border ${config.borderClass} flex items-center justify-center shrink-0`}>
              <StatusIcon className={`w-6 h-6 ${config.textClass}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold text-foreground">#{quote.id}</h1>
                <Badge className={`${config.bgClass} ${config.textClass} border-0 font-semibold text-xs`}>
                  {config.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(quote.id);
                toast.success("Teklif numarası kopyalandı");
              }}
              className="shrink-0 p-2 rounded-lg hover:bg-background/60 text-muted-foreground hover:text-foreground transition-colors"
              title="Teklif numarasını kopyala"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 px-1">
            <Package className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Teklif Beklenen Ürünler
            </h2>
            <span className="text-xs text-muted-foreground">({quote.products.length})</span>
          </div>

          <div className="space-y-3">
            {quote.products.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 hover:border-primary/20 hover:shadow-card-hover transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-bold text-foreground">{p.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-10">
                      {p.description}
                    </p>
                  </div>
                  {p.productId && (
                    <Link
                      to={`/digitalhub/products?product=${p.productId}`}
                      className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 px-3 py-2 rounded-xl transition-all"
                    >
                      Detay <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card divide-y divide-border"
        >
          <div className="flex items-center gap-3 px-5 py-4">
            <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">Tarih</span>
            <span className="text-sm font-semibold text-foreground ml-auto">{formatDate(quote.date)}</span>
          </div>

          {quote.sender && (
            <div className="flex items-center gap-3 px-5 py-4">
              <User className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">Gönderen</span>
              <span className="text-sm font-semibold text-foreground ml-auto">{quote.sender}</span>
            </div>
          )}

          {quote.note && (
            <div className="px-5 py-4 space-y-2">
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Not</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed bg-muted/50 rounded-xl px-4 py-3">
                {quote.note}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </KobiLayout>
  );
};

export default KobiTeklifDetay;
