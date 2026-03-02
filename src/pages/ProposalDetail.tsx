import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Building2, Package, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";

/* ───── Mock data (mirrors Proposals.tsx) ───── */
interface ProposalProduct {
  name: string;
  price: number;
  period: string;
}

interface ProposalDetail {
  id: string;
  customer: string;
  sector: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  products: ProposalProduct[];
  total: number;
  status: "pending" | "approved" | "rejected";
  date: string;
  period: string;
  assignedDealer: string | null;
  note: string;
  timeline: { date: string; event: string }[];
}

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "Bekleyen", className: "bg-warning/20 text-warning border-warning/30" },
  approved: { label: "Onaylandı", className: "bg-success/20 text-success border-success/30" },
  rejected: { label: "Reddedildi", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

const dealers: Record<string, string> = {
  d1: "Ahmet Yılmaz",
  d2: "Mehmet Kaya",
  d3: "Elif Demir",
  d4: "Zeynep Arslan",
};

const mockDetails: Record<string, ProposalDetail> = {
  "PROP-001": {
    id: "PROP-001",
    customer: "ABC Tekstil Ltd.",
    sector: "Tekstil",
    contactName: "Ali Veli",
    contactPhone: "+90 532 000 00 01",
    contactEmail: "ali@abctekstil.com",
    products: [
      { name: "Nebim Era", price: 3500, period: "Aylık" },
      { name: "Univera Stokbar", price: 2700, period: "Aylık" },
      { name: "Finrota Netahsilat", price: 2000, period: "Aylık" },
    ],
    total: 8200,
    status: "approved",
    date: "15 Şub 2026",
    period: "Aylık",
    assignedDealer: "d1",
    note: "Müşteri hızlı kurulum talep etti. 12 ay taahhüt yapıldı.",
    timeline: [
      { date: "15 Şub 2026", event: "Teklif oluşturuldu" },
      { date: "16 Şub 2026", event: "Müşteriye gönderildi" },
      { date: "18 Şub 2026", event: "Müşteri tarafından onaylandı" },
    ],
  },
  "PROP-002": {
    id: "PROP-002",
    customer: "XYZ Market",
    sector: "Perakende",
    contactName: "Ayşe Demir",
    contactPhone: "+90 533 000 00 02",
    contactEmail: "ayse@xyzmarket.com",
    products: [
      { name: "Param POS", price: 1800, period: "Aylık" },
      { name: "Univera Stokbar", price: 2200, period: "Aylık" },
    ],
    total: 4000,
    status: "pending",
    date: "14 Şub 2026",
    period: "Aylık",
    assignedDealer: "d1",
    note: "Deneme süreci sonrası karar verilecek.",
    timeline: [
      { date: "14 Şub 2026", event: "Teklif oluşturuldu" },
      { date: "14 Şub 2026", event: "Müşteriye gönderildi" },
    ],
  },
  "PROP-003": {
    id: "PROP-003",
    customer: "DEF Gıda A.Ş.",
    sector: "Gıda",
    contactName: "Mehmet Yıldız",
    contactPhone: "+90 534 000 00 03",
    contactEmail: "mehmet@defgida.com",
    products: [
      { name: "Univera Stokbar", price: 2200, period: "Yıllık" },
      { name: "Finrota Netahsilat", price: 1800, period: "Yıllık" },
      { name: "Param POS", price: 1500, period: "Yıllık" },
    ],
    total: 5500,
    status: "pending",
    date: "13 Şub 2026",
    period: "Yıllık",
    assignedDealer: "d2",
    note: "Yıllık ödeme planı tercih edildi.",
    timeline: [
      { date: "13 Şub 2026", event: "Teklif oluşturuldu" },
    ],
  },
  "PROP-004": {
    id: "PROP-004",
    customer: "GHI Lojistik",
    sector: "Lojistik",
    contactName: "Fatma Korkmaz",
    contactPhone: "+90 535 000 00 04",
    contactEmail: "fatma@ghilojistik.com",
    products: [
      { name: "Univera Enroute", price: 2250, period: "Aylık" },
      { name: "Param Mobil", price: 1500, period: "Aylık" },
    ],
    total: 3750,
    status: "rejected",
    date: "10 Şub 2026",
    period: "Aylık",
    assignedDealer: null,
    note: "Müşteri bütçe yetersizliği nedeniyle reddetti.",
    timeline: [
      { date: "10 Şub 2026", event: "Teklif oluşturuldu" },
      { date: "11 Şub 2026", event: "Müşteriye gönderildi" },
      { date: "13 Şub 2026", event: "Müşteri tarafından reddedildi" },
    ],
  },
  "PROP-005": {
    id: "PROP-005",
    customer: "JKL İnşaat",
    sector: "İnşaat",
    contactName: "Hasan Çelik",
    contactPhone: "+90 536 000 00 05",
    contactEmail: "hasan@jklinsaat.com",
    products: [
      { name: "Univera Quest", price: 2500, period: "Aylık" },
      { name: "Kredim Business", price: 1500, period: "Aylık" },
    ],
    total: 4000,
    status: "pending",
    date: "12 Şub 2026",
    period: "Aylık",
    assignedDealer: "d3",
    note: "",
    timeline: [
      { date: "12 Şub 2026", event: "Teklif oluşturuldu" },
    ],
  },
  "PROP-006": {
    id: "PROP-006",
    customer: "MNO E-ticaret",
    sector: "E-ticaret",
    contactName: "Zehra Aksoy",
    contactPhone: "+90 537 000 00 06",
    contactEmail: "zehra@mnoeticaret.com",
    products: [
      { name: "Web Plus", price: 1650, period: "Aylık" },
      { name: "Param Kart", price: 1200, period: "Aylık" },
      { name: "Param Mobil", price: 1300, period: "Aylık" },
    ],
    total: 4150,
    status: "approved",
    date: "8 Şub 2026",
    period: "Aylık",
    assignedDealer: null,
    note: "Kurulum başlatıldı.",
    timeline: [
      { date: "8 Şub 2026", event: "Teklif oluşturuldu" },
      { date: "9 Şub 2026", event: "Müşteriye gönderildi" },
      { date: "12 Şub 2026", event: "Müşteri tarafından onaylandı" },
    ],
  },
  "PROP-007": {
    id: "PROP-007",
    customer: "PQR Danışmanlık",
    sector: "Danışmanlık",
    contactName: "Burak Şahin",
    contactPhone: "+90 538 000 00 07",
    contactEmail: "burak@pqrdanismanlik.com",
    products: [
      { name: "Param DMS", price: 1800, period: "Yıllık" },
      { name: "Param Çağrı Merkezi", price: 1400, period: "Yıllık" },
    ],
    total: 3200,
    status: "approved",
    date: "5 Şub 2026",
    period: "Yıllık",
    assignedDealer: "d1",
    note: "Yıllık sözleşme imzalandı.",
    timeline: [
      { date: "5 Şub 2026", event: "Teklif oluşturuldu" },
      { date: "6 Şub 2026", event: "Müşteriye gönderildi" },
      { date: "10 Şub 2026", event: "Müşteri tarafından onaylandı" },
    ],
  },
};

/* ───── Page ───── */
const ProposalDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const proposal = id ? mockDetails[id] : null;

  if (!proposal) {
    return (
      <DashboardLayout>
        <div className="text-center py-16 space-y-4">
          <p className="text-5xl">📄</p>
          <p className="text-muted-foreground text-lg">Teklif bulunamadı.</p>
          <Button variant="outline" onClick={() => navigate("/sales/proposals")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Tekliflere Dön
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const st = statusMap[proposal.status];
  const periodLabel = proposal.period === "Aylık" ? "ay" : "yıl";

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/sales/proposals")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">Teklif #{proposal.id}</h1>
              <Badge variant="outline" className={`text-xs ${st.className}`}>{st.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{proposal.date}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/sales/proposals">Tüm Teklifler</Link>
          </Button>
        </div>

        {/* Top cards: Customer + Dealer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Müşteri Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Firma</span>
                <span className="font-medium text-foreground">{proposal.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sektör</span>
                <Badge variant="outline" className="text-[10px]">{proposal.sector}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Yetkili</span>
                <span className="font-medium text-foreground">{proposal.contactName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Telefon</span>
                <span className="text-foreground">{proposal.contactPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">E-posta</span>
                <span className="text-foreground">{proposal.contactEmail}</span>
              </div>
            </CardContent>
          </Card>

          {/* Assignment & Period */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-primary" /> Atama & Dönem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Atanan Bayi</span>
                <span className="font-medium text-foreground">
                  {proposal.assignedDealer ? dealers[proposal.assignedDealer] : <span className="italic text-muted-foreground">Atanmamış</span>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ödeme Dönemi</span>
                <span className="font-medium text-foreground">{proposal.period}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Oluşturulma</span>
                <span className="text-foreground">{proposal.date}</span>
              </div>
              {proposal.note && (
                <div className="pt-2 border-t border-border">
                  <p className="text-muted-foreground text-xs mb-1">Not</p>
                  <p className="text-foreground text-sm">{proposal.note}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" /> Ürünler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {proposal.products.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                  <span className="font-medium text-foreground text-sm">{p.name}</span>
                  <span className="text-sm font-semibold text-primary">
                    {p.price.toLocaleString("tr-TR")}₺<span className="text-xs font-normal text-muted-foreground">/{periodLabel}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
              <span className="font-bold text-foreground">Toplam</span>
              <span className="text-xl font-bold text-primary">
                {proposal.total.toLocaleString("tr-TR")}₺<span className="text-sm font-normal text-muted-foreground">/{periodLabel}</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Durum Geçmişi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />
              <div className="space-y-4">
                {proposal.timeline.map((t, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    <div className={`absolute left-[-15px] top-1.5 w-3 h-3 rounded-full border-2 ${i === proposal.timeline.length - 1 ? "bg-primary border-primary" : "bg-card border-border"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.event}</p>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProposalDetailPage;
