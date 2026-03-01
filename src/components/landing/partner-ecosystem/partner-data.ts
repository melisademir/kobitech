import logoFinrota from "@/assets/logo-finrota.png";
import logoParam from "@/assets/logo-param.jpg";
import logoTsoft from "@/assets/logo-tsoft.svg";
import logoNebim from "@/assets/logo-nebim.svg";
import logoUnivera from "@/assets/logo-univera.svg";
import logoFinrotaNew from "@/assets/logo-finrota-new.svg";
import logoKredim from "@/assets/logo-kredim.svg";
import logoAras from "@/assets/logo-aras.svg";
import logoTicimax from "@/assets/logo-ticimax.png";
import logoGoogle from "@/assets/logo-google.png";
import logoIkas from "@/assets/logo-ikas.png";
import logoWorkcube from "@/assets/logo-workcube.png";
import logoMukellef from "@/assets/logo-mukellef.svg";
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
    id: "aras", col: 4, row: 0, cs: 1, rs: 2, color: "#10B981",
    name: "Aras", label: "Aras", logo: logoAras,
    edges: { top: [0], right: [0, 0], bottom: [-1], left: [-1, 1] }
  },
  {
    id: "ikas", col: 0, row: 2, cs: 1, rs: 1, color: "#3B82F6",
    name: "ikas", label: "ikas", logo: logoIkas,
    edges: { top: [-1], right: [1], bottom: [-1], left: [0] }
  },
  {
    id: "tsoft", col: 1, row: 2, cs: 1, rs: 1, color: "#1a1a2e",
    name: "T-SOFT", label: "T-SOFT", logo: logoTsoft,
    edges: { top: [1], right: [-1], bottom: [1], left: [-1] }
  },
  {
    id: "mukellef", col: 2, row: 2, cs: 1, rs: 2, color: "#1E40AF",
    name: "Mükellef", label: "Mükellef", logo: logoMukellef,
    edges: { top: [1], right: [1, -1], bottom: [-1], left: [1, -1] }
  },
  {
    id: "workcube", col: 3, row: 2, cs: 1, rs: 2, color: "#1DA1D4",
    name: "Workcube", label: "Workcube", logo: logoWorkcube,
    edges: { top: [-1], right: [1, -1], bottom: [1], left: [-1, 1] }
  },
  {
    id: "google", col: 4, row: 2, cs: 1, rs: 1, color: "#4285F4",
    name: "Google", label: "Google", logo: logoGoogle,
    edges: { top: [1], right: [0], bottom: [1], left: [-1] }
  },
  {
    id: "kredim", col: 0, row: 3, cs: 2, rs: 1, color: "#26D07C",
    name: "Kredim", label: "Kredim", logo: logoKredim,
    edges: { top: [1, -1], right: [1], bottom: [-1, 1], left: [0] }
  },
  {
    id: "nebim", col: 4, row: 3, cs: 1, rs: 3, color: "#00A2E1",
    name: "Nebim", label: "Nebim", logo: logoNebim,
    edges: { top: [-1], right: [0, 0, 0], bottom: [0], left: [1, -1, 1] }
  },
  {
    id: "finrota", col: 0, row: 4, cs: 2, rs: 1, color: "#FF671D",
    name: "Finrota", label: "Finrota", logo: logoFinrotaNew,
    edges: { top: [1, -1], right: [-1], bottom: [-1, 1], left: [0] }
  },
  {
    id: "univera", col: 2, row: 4, cs: 2, rs: 2, color: "#4D008C",
    name: "Univera", label: "Univera", logo: logoUnivera,
    edges: { top: [1, -1], right: [1, -1], bottom: [0, 0], left: [1, -1] }
  },
  {
    id: "ticimax", col: 0, row: 5, cs: 2, rs: 1, color: "#6366F1",
    name: "Ticimax", label: "Ticimax", logo: logoTicimax,
    edges: { top: [1, -1], right: [1], bottom: [0, 0], left: [0] }
  }
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
  tsoft: { category: "E-Ticaret Çözümü", headline: "T-SOFT ile Güçlü E-Ticaret", leadership: "25 Yıldır Türkiye'nin Önde Gelen E-ticaret Platformu", description: "Binlerce işletmeye güvenilir online satış altyapısı sağlıyoruz. Hızlı kurulum, kolay yönetim.", features: ["Hazır e-ticaret altyapısı", "Ödeme gateway entegrasyonu", "Kargo entegrasyonu (Aras, Yurtiçi)", "Stok senkronizasyonu", "SEO & performans optimize"], sectors: [{ name: "E-ticaret", stars: 5, pct: 95 }, { name: "Perakende", stars: 4, pct: 80 }], badge: "Platform İndirimi Mevcut" },
  ikas: { category: "E-Ticaret Altyapısı", headline: "ikas ile Hızlı E-Ticaret", leadership: "Türkiye'nin En Hızlı Büyüyen E-ticaret Platformu", description: "Sıfırdan e-ticaret sitenizi kurun, tüm satış kanallarınızı tek panelden yönetin. Kullanımı çok kolay.", features: ["Çok kanallı satış yönetimi", "Pazaryeri entegrasyonu", "Otomatik stok takibi", "Analitik dashboard"], sectors: [{ name: "E-ticaret", stars: 5, pct: 97 }, { name: "Toptancı", stars: 4, pct: 75 }], badge: "İlk 3 Ay Ücretsiz" },
  param: { category: "Ödeme Sistemleri", headline: "Param ile Kolay Ödeme", leadership: "Türkiye'nin En Büyük Sanal POS Altyapısı", description: "Fiziksel POS, sanal POS, mobil ödeme ile kolay ve güvenli ödeme alın. Tüm ödeme altyapınızı tek çözümde entegre edin.", features: ["Param POS (Fiziksel satış noktası)", "Param Kart (Online ödemeler)", "Param Mobil (QR ödeme)", "Taksit ve kampanya yönetimi"], sectors: [{ name: "Perakende", stars: 5, pct: 98 }, { name: "Restoran", stars: 5, pct: 95 }], badge: "Kurulum Ücretsiz" },
  kredim: { category: "Finansman Çözümleri", headline: "Kredim ile İşletme Finansmanı", leadership: "Türkiye'nin İlk Dijital KOBİ Finansman Platformu", description: "Hızlı onay, esnek geri ödeme ile işletme sermayenizi güçlendirin. 500K'ya kadar kredi.", features: ["Hızlı kredi onayı (24 saat)", "Esnek vade seçenekleri", "KOBİ'ye özel oranlar", "Online başvuru"], sectors: [{ name: "Üretim", stars: 5, pct: 90 }, { name: "Ticaret", stars: 4, pct: 85 }], badge: "%0 Komisyon" },
  aras: { category: "Kargo & Lojistik", headline: "Aras ile Hızlı Teslimat", leadership: "Türkiye'nin En Yaygın Lojistik Ağı", description: "1.800+ şube, 81 il kargo hizmeti. Uluslararası gönderim, hızlı teslimat, e-ticaret entegrasyonu.", features: ["Gönderi takibi (anlık)", "Toplu sevkiyat yönetimi", "E-ticaret entegrasyonu", "İndirimli tarifeler"], sectors: [{ name: "E-ticaret", stars: 5, pct: 96 }, { name: "Perakende", stars: 4, pct: 82 }], badge: "İndirimli Kargo" },
  google: { category: "Bulut & İşbirliği", headline: "Google ile Dijitalleşme", leadership: "Dünya Çapında 3 Milyar Kullanıcı", description: "Email, Drive, Doküman, Takvim, Meet. İş iletişiminizi ve işbirliğinizi bulutta yönetin.", features: ["Gmail & Google Drive", "Meet video konferans", "Docs, Sheets, Slides", "Kurumsal güvenlik"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Hizmet", stars: 5, pct: 95 }], badge: "KOBİ'ye Özel Fiyat" },
  univera: { category: "ERP Yazılımı", headline: "Univera ile İş Yönetimi", leadership: "Kurumsal İşletmelerin Tercih Ettiği İş Yönetim Çözümleri", description: "Stok, tedarik, proje, döküman, çağrı merkezi — operasyonel mükemmelliği tek platformda.", features: ["Üretim & stok takibi", "Muhasebe modülü", "İK ve bordro yönetimi", "Raporlama & analitik"], sectors: [{ name: "Üretim", stars: 5, pct: 93 }, { name: "Ticaret", stars: 4, pct: 80 }], badge: "Ücretsiz Kurulum" },
  nebim: { category: "Perakende ERP", headline: "Nebim ile Entegre ERP", leadership: "Türkiye'de 40 Yıllık ERP Liderliği", description: "Nebim V3 ve Nebim Era ile üretimden finansa, stoktan satışa tüm işletme süreçlerinizi entegre yönetin.", features: ["Entegre ERP modülleri", "Sektöre özel çözümler", "Gerçek zamanlı raporlama", "Çoklu şube/depo yönetimi"], sectors: [{ name: "Üretim", stars: 5, pct: 97 }, { name: "Tekstil", stars: 5, pct: 97 }], badge: "Sektör Lideri" },
  workcube: { category: "İK & İş Yönetimi", headline: "Workcube HR ile Ekibine Yön Ver", leadership: "Türkiye'nin Kapsamlı İK Yönetim Platformu", description: "İşe alımdan emekliliğe kadar tüm İK süreçlerinizi tek çatı altında yönetin. Maaş, izin, mesai, bordro ve özlük dosyalarını güvenle takip edin.", features: ["Bordro ve puantaj yönetimi", "İzin ve mesai takibi", "Özlük dosyası yönetimi", "Rol bazlı yetkilendirme"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Hizmet", stars: 5, pct: 92 }], badge: "Kapsamlı İK Çözümü" },
  mukellef: { category: "Global Şirket Kuruluşu", headline: "Mükellef ile Globalleşme", leadership: "Global Şirket Kuruluşunda Uzman", description: "Yurt dışı şirket kuruluşu, vergi danışmanlığı, uluslararası ticaret hukuku. 50+ ülkede tecrübe.", features: ["Yurt dışı şirket kuruluşu", "Vergi danışmanlığı", "Uluslararası ticaret hukuku", "50+ ülke tecrübesi"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 99 }, { name: "Hizmet", stars: 5, pct: 97 }], badge: "50+ Ülke" },
  ticimax: { category: "E-Ticaret Çözümleri", headline: "Ticimax ile Online Satış", leadership: "20.000+ E-ticaret Sitesine Güç Veren Platform", description: "Kolay kurulum, sınırsız ürün, güçlü yönetim paneli. Büyümenize ölçeklenebilir altyapı.", features: ["Mobil uygulama dahil", "SEO optimizasyon araçları", "Çok kanallı satış", "30 gün ücretsiz deneme"], sectors: [{ name: "E-ticaret", stars: 5, pct: 94 }, { name: "Perakende", stars: 4, pct: 80 }], badge: "30 Gün Ücretsiz" },
  finrota: { category: "Finansal Yönetim", headline: "Finrota ile Nakit Yönetimi", leadership: "10.000+ İşletmenin Güvendiği Finansal Yönetim Çözümü", description: "Tahsilat, ödeme, banka mutabakatı otomasyonu. Nakit akışınızı tam kontrol altına alın.", features: ["Nakit akışı takibi", "Çek/senet yönetimi", "Banka mutabakatı", "Otomatik finansal raporlar"], sectors: [{ name: "Finans", stars: 5, pct: 94 }, { name: "Üretim", stars: 4, pct: 80 }], badge: "Otomatik Raporlar" },
  paramtech: { category: "Bulut Çözümleri", headline: "ParamTech Cloud ile Dijitalleşin", leadership: "KOBİ'ler İçin Kurumsal Bulut Altyapısı", description: "ParamTech Cloud ile işletmenizin tüm dijital ihtiyaçlarını tek platformda karşılayın. Güvenli, ölçeklenebilir ve yönetimi kolay bulut altyapısı.", features: ["Bulut sunucu yönetimi", "Veri yedekleme & güvenlik", "Ölçeklenebilir altyapı", "7/24 teknik destek"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Teknoloji", stars: 5, pct: 98 }], badge: "Cloud Çözümü" },
};
