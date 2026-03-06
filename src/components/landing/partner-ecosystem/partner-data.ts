import logoParam from "@/assets/logo-param.svg";
import logoNebim from "@/assets/logo-nebim.svg";
import logoUnivera from "@/assets/logo-univera.svg";
import logoFinrotaNew from "@/assets/logo-finrota-new.svg";
import logoKredim from "@/assets/logo-kredim.svg";
import logoParamtech from "@/assets/logo-paramtech.png";

// ─── Piece type ───────────────────────────────────────────────────────────────
export interface PuzzlePiece {
  id: string;
  col: number;
  row: number;
  cs: number;
  rs: number;
  color: string;
  name: string;
  label: string;
  logo: string;
  darkBg?: boolean;
  edges: { top: number[]; right: number[]; bottom: number[]; left: number[] };
}

// ─── Partner piece definitions ────────────────────────────────────────────────
export const pieces: PuzzlePiece[] = [
  {
    id: "paramtech", col: 0, row: 0, cs: 2, rs: 2, color: "#1a1a2e",
    name: "ParamTech", label: "ParamTech", logo: logoParamtech,
    edges: { top: [0, 0], right: [1, -1], bottom: [1, -1], left: [0, 0] }
  },
  {
    id: "param", col: 2, row: 0, cs: 2, rs: 2, color: "#6B21A8",
    name: "Param", label: "Param", logo: logoParam,
    edges: { top: [0, 0], right: [1, -1], bottom: [-1, 1], left: [-1, 1] }
  },
  {
    id: "kredim", col: 0, row: 2, cs: 2, rs: 1, color: "#26D07C",
    name: "Kredim", label: "Kredim", logo: logoKredim,
    edges: { top: [1, -1], right: [1], bottom: [-1, 1], left: [0] }
  },
  {
    id: "nebim", col: 2, row: 2, cs: 1, rs: 2, color: "#00A2E1",
    name: "Nebim", label: "Nebim", logo: logoNebim,
    edges: { top: [-1], right: [0, 0], bottom: [0], left: [1, -1] }
  },
  {
    id: "finrota", col: 0, row: 3, cs: 2, rs: 1, color: "#FF671D",
    name: "Finrota", label: "Finrota", logo: logoFinrotaNew,
    edges: { top: [1, -1], right: [-1], bottom: [-1, 1], left: [0] }
  },
  {
    id: "univera", col: 2, row: 3, cs: 2, rs: 1, color: "#4D008C",
    name: "Univera", label: "Univera", logo: logoUnivera,
    edges: { top: [1, -1], right: [1, -1], bottom: [0, 0], left: [1, -1] }
  },
];

// ─── Partner detail data ───────────────────────────────────────────────────────
export interface PartnerDetail {
  category: string;
  leadership: string;
  description: string;
  features: string[];
  sectors: { name: string; stars: number; pct: number }[];
  badge: string;
  headline: string;
}

export const partnerDetails: Record<string, PartnerDetail> = {
  param: { category: "Ödeme Sistemleri", headline: "Param ile Kolay Ödeme", leadership: "Türkiye'nin En Büyük Sanal POS Altyapısı", description: "Fiziksel POS, sanal POS, mobil ödeme ile kolay ve güvenli ödeme alın. Tüm ödeme altyapınızı tek çözümde entegre edin.", features: ["Param POS (Fiziksel satış noktası)", "Param Kart (Online ödemeler)", "Param Mobil (QR ödeme)", "Taksit ve kampanya yönetimi"], sectors: [{ name: "Perakende", stars: 5, pct: 98 }, { name: "Restoran", stars: 5, pct: 95 }], badge: "Kurulum Ücretsiz" },
  kredim: { category: "Finansman Çözümleri", headline: "Kredim ile İşletme Finansmanı", leadership: "Türkiye'nin İlk Dijital KOBİ Finansman Platformu", description: "Hızlı onay, esnek geri ödeme ile işletme sermayenizi güçlendirin. 500K'ya kadar kredi.", features: ["Hızlı kredi onayı (24 saat)", "Esnek vade seçenekleri", "KOBİ'ye özel oranlar", "Online başvuru"], sectors: [{ name: "Üretim", stars: 5, pct: 90 }, { name: "Ticaret", stars: 4, pct: 85 }], badge: "%0 Komisyon" },
  univera: { category: "ERP Yazılımı", headline: "Univera ile İş Yönetimi", leadership: "Kurumsal İşletmelerin Tercih Ettiği İş Yönetim Çözümleri", description: "Stok, tedarik, proje, döküman, çağrı merkezi — operasyonel mükemmelliği tek platformda.", features: ["Üretim & stok takibi", "Muhasebe modülü", "İK ve bordro yönetimi", "Raporlama & analitik"], sectors: [{ name: "Üretim", stars: 5, pct: 93 }, { name: "Ticaret", stars: 4, pct: 80 }], badge: "Ücretsiz Kurulum" },
  nebim: { category: "Perakende ERP", headline: "Nebim ile Entegre ERP", leadership: "Türkiye'de 40 Yıllık ERP Liderliği", description: "Nebim V3 ve Nebim Era ile üretimden finansa, stoktan satışa tüm işletme süreçlerinizi entegre yönetin.", features: ["Entegre ERP modülleri", "Sektöre özel çözümler", "Gerçek zamanlı raporlama", "Çoklu şube/depo yönetimi"], sectors: [{ name: "Üretim", stars: 5, pct: 97 }, { name: "Tekstil", stars: 5, pct: 97 }], badge: "Sektör Lideri" },
  finrota: { category: "Finansal Yönetim", headline: "Finrota ile Nakit Yönetimi", leadership: "10.000+ İşletmenin Güvendiği Finansal Yönetim Çözümü", description: "Tahsilat, ödeme, banka mutabakatı otomasyonu. Nakit akışınızı tam kontrol altına alın.", features: ["Nakit akışı takibi", "Çek/senet yönetimi", "Banka mutabakatı", "Otomatik finansal raporlar"], sectors: [{ name: "Finans", stars: 5, pct: 94 }, { name: "Üretim", stars: 4, pct: 80 }], badge: "Otomatik Raporlar" },
  paramtech: { category: "Bulut Çözümleri", headline: "ParamTech Cloud ile Dijitalleşin", leadership: "KOBİ'ler İçin Kurumsal Bulut Altyapısı", description: "ParamTech Cloud ile işletmenizin tüm dijital ihtiyaçlarını tek platformda karşılayın. Güvenli, ölçeklenebilir ve yönetimi kolay bulut altyapısı.", features: ["Bulut sunucu yönetimi", "Veri yedekleme & güvenlik", "Ölçeklenebilir altyapı", "7/24 teknik destek"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Teknoloji", stars: 5, pct: 98 }], badge: "Cloud Çözümü" },
};
