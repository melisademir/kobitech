import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import logoFinrota from "@/assets/logo-finrota.png";
import logoParam from "@/assets/logo-param.jpg";
import logoTsoft from "@/assets/logo-tsoft.png";
import logoNebim from "@/assets/logo-nebim.svg";
import logoUnivera from "@/assets/logo-univera.svg";
import logoFinrotaNew from "@/assets/logo-finrota-new.svg";
import logoKredim from "@/assets/logo-kredim.svg";
import logoAras from "@/assets/logo-aras.png";
import logoTicimax from "@/assets/logo-ticimax.png";
import logoGoogle from "@/assets/logo-google.png";
import logoIkas from "@/assets/logo-ikas.png";
import logoKariyer from "@/assets/logo-kariyer.png";
import logoMukellef from "@/assets/logo-mukellef.png";

// ─── Puzzle geometry ──────────────────────────────────────────────────────────
const CW = 90;   // cell width  px
const CH = 75;   // cell height px
const T  = 12;   // tab radius  px
const COLS = 6;

/**
 * Generate SVG path for one puzzle piece.
 *
 * edges.top / bottom: array length = colSpan, one value per column-cell on that edge
 * edges.left / right: array length = rowSpan, one value per row-cell on that edge
 * +1 = tab protrudes outward, -1 = blank indents inward, 0 = flat (boundary)
 */
function puzzlePath(
  px: number, py: number,
  cs: number, rs: number,
  edges: { top: number[]; right: number[]; bottom: number[]; left: number[] }
): string {
  const pw = cs * CW;
  const ph = rs * CH;
  const cp = T * 1.55; // cubic-bezier control-point distance

  let d = `M ${px} ${py} `;

  // ── TOP edge: left → right ────────────────────────────────────────────────
  for (let c = 0; c < cs; c++) {
    const sx  = px + c * CW;
    const mx  = sx + CW / 2;
    const tv  = edges.top[c] ?? 0;
    if (tv === 0) {
      d += `L ${sx + CW} ${py} `;
    } else {
      // tv=+1 → tab up (outward), tv=−1 → notch down (inward)
      d += `L ${mx - T} ${py} `;
      d += `C ${mx - T} ${py - tv * cp} ${mx + T} ${py - tv * cp} ${mx + T} ${py} `;
      d += `L ${sx + CW} ${py} `;
    }
  }

  // ── RIGHT edge: top → bottom ───────────────────────────────────────────────
  const rx = px + pw;
  for (let r = 0; r < rs; r++) {
    const sy  = py + r * CH;
    const my  = sy + CH / 2;
    const tv  = edges.right[r] ?? 0;
    if (tv === 0) {
      d += `L ${rx} ${sy + CH} `;
    } else {
      // tv=+1 → tab right (outward), tv=−1 → notch left (inward)
      d += `L ${rx} ${my - T} `;
      d += `C ${rx + tv * cp} ${my - T} ${rx + tv * cp} ${my + T} ${rx} ${my + T} `;
      d += `L ${rx} ${sy + CH} `;
    }
  }

  // ── BOTTOM edge: right → left ──────────────────────────────────────────────
  for (let c = cs - 1; c >= 0; c--) {
    const sx  = px + c * CW;
    const mx  = sx + CW / 2;
    const tv  = edges.bottom[c] ?? 0;
    const by  = py + ph;
    if (tv === 0) {
      d += `L ${sx} ${by} `;
    } else {
      // tv=+1 → tab down (outward), tv=−1 → notch up (inward)
      d += `L ${mx + T} ${by} `;
      d += `C ${mx + T} ${by + tv * cp} ${mx - T} ${by + tv * cp} ${mx - T} ${by} `;
      d += `L ${sx} ${by} `;
    }
  }

  // ── LEFT edge: bottom → top ────────────────────────────────────────────────
  for (let r = rs - 1; r >= 0; r--) {
    const sy  = py + r * CH;
    const my  = sy + CH / 2;
    const tv  = edges.left[r] ?? 0;
    if (tv === 0) {
      d += `L ${px} ${sy} `;
    } else {
      // tv=+1 → tab left (outward), tv=−1 → notch right (inward)
      d += `L ${px} ${my + T} `;
      d += `C ${px - tv * cp} ${my + T} ${px - tv * cp} ${my - T} ${px} ${my - T} `;
      d += `L ${px} ${sy} `;
    }
  }

  return d + "Z";
}

// ─── Partner piece definitions ────────────────────────────────────────────────
// Layout: 6-column × 5-row grid (540 × 375 px total)
//
// col/row are 0-indexed cell positions.
// edges: top[colSpan], right[rowSpan], bottom[colSpan], left[rowSpan]
// Rule: A.right[r] = -B.left[r] for adjacent pieces
//       A.bottom[c] = -C.top[c] for pieces above/below
//
const pieces = [
  // ── Row 0 ──────────────────────────────────────────────────────────────────
  {
    id: "tsoft",   col: 0, row: 0, cs: 2, rs: 2, color: "#1a1a2e",
    name: "T-SOFT", label: "T-SOFT", logo: logoTsoft,
    edges: { top: [0,0], right: [1,-1], bottom: [1,-1], left: [0,0] },
  },
  {
    id: "qnb",     col: 2, row: 0, cs: 1, rs: 1, color: "#0891B2",
    name: "QNB", label: "QNB",
    edges: { top: [0], right: [-1], bottom: [1], left: [-1] },
  },
  {
    id: "ikas",    col: 3, row: 0, cs: 2, rs: 1, color: "#3B82F6",
    name: "ikas", label: "ikas", logo: logoIkas,
    edges: { top: [0,0], right: [-1], bottom: [1,-1], left: [1] },
  },
  {
    id: "param",   col: 5, row: 0, cs: 1, rs: 2, color: "#4B0082",
    name: "Param", label: "Param", logo: logoParam,
    edges: { top: [0], right: [0,0], bottom: [-1], left: [1,-1] },
  },
  // ── Row 1 ──────────────────────────────────────────────────────────────────
  {
    id: "kredim",  col: 2, row: 1, cs: 1, rs: 1, color: "#26D07C",
    name: "Kredim", label: "Kredim", logo: logoKredim,
    edges: { top: [-1], right: [1], bottom: [1], left: [1] },
  },
  {
    id: "qf",      col: 3, row: 1, cs: 1, rs: 1, color: "#7C3AED",
    name: "QF", label: "QF",
    edges: { top: [-1], right: [1], bottom: [-1], left: [-1] },
  },
  {
    id: "azalt",   col: 4, row: 1, cs: 1, rs: 1, color: "#EF4444",
    name: "Azalt", label: "Azalt",
    edges: { top: [1], right: [1], bottom: [1], left: [-1] },
  },
  // ── Row 2 ──────────────────────────────────────────────────────────────────
  {
    id: "qes",     col: 0, row: 2, cs: 1, rs: 1, color: "#6B21A8",
    name: "QeS", label: "QeS",
    edges: { top: [-1], right: [1], bottom: [-1], left: [0] },
  },
  {
    id: "aras",    col: 1, row: 2, cs: 2, rs: 1, color: "#10B981",
    name: "Aras", label: "Aras", logo: logoAras,
    edges: { top: [1,-1], right: [-1], bottom: [1,-1], left: [-1] },
  },
  {
    id: "google",  col: 3, row: 2, cs: 1, rs: 1, color: "#4285F4",
    name: "Google", label: "Google", logo: logoGoogle,
    edges: { top: [1], right: [-1], bottom: [1], left: [1] },
  },
  {
    id: "univera", col: 4, row: 2, cs: 1, rs: 1, color: "#4D008C",
    name: "Univera", label: "Univera", logo: logoUnivera,
    edges: { top: [-1], right: [1], bottom: [-1], left: [1] },
  },
  {
    id: "nebim",   col: 5, row: 2, cs: 1, rs: 1, color: "#00A2E1",
    name: "Nebim", label: "Nebim", logo: logoNebim,
    edges: { top: [1], right: [0], bottom: [1], left: [-1] },
  },
  // ── Row 3 ──────────────────────────────────────────────────────────────────
  {
    id: "kariyer", col: 0, row: 3, cs: 1, rs: 1, color: "#EA580C",
    name: "Kariyer.net", label: "KR", logo: logoKariyer,
    edges: { top: [1], right: [-1], bottom: [-1], left: [0] },
  },
  {
    id: "mukellef",col: 1, row: 3, cs: 1, rs: 1, color: "#1E40AF",
    name: "Mükellef", label: "Mükellef", logo: logoMukellef,
    edges: { top: [-1], right: [1], bottom: [1], left: [1] },
  },
  {
    id: "ticimax", col: 2, row: 3, cs: 2, rs: 1, color: "#0EA5E9",
    name: "Ticimax", label: "Ticimax", logo: logoTicimax,
    edges: { top: [1,-1], right: [1], bottom: [-1,1], left: [-1] },
  },
  {
    id: "kolaybi", col: 4, row: 3, cs: 1, rs: 1, color: "#14B8A6",
    name: "KolayBi", label: "KolayBi",
    edges: { top: [1], right: [-1], bottom: [-1], left: [-1] },
  },
  {
    id: "webplus", col: 5, row: 3, cs: 1, rs: 1, color: "#9333EA",
    name: "Web Plus", label: "WP",
    edges: { top: [-1], right: [0], bottom: [1], left: [1] },
  },
  // ── Row 4 ──────────────────────────────────────────────────────────────────
  {
    id: "stokbar", col: 0, row: 4, cs: 2, rs: 1, color: "#059669",
    name: "Stokbar", label: "Stokbar",
    edges: { top: [1,-1], right: [-1], bottom: [0,0], left: [0] },
  },
  {
    id: "finrota", col: 2, row: 4, cs: 1, rs: 1, color: "#FF671D",
    name: "Finrota", label: "Finrota", logo: logoFinrotaNew,
    edges: { top: [1], right: [-1], bottom: [0], left: [1] },
  },
  {
    id: "unidox",  col: 3, row: 4, cs: 1, rs: 1, color: "#0F766E",
    name: "UniDOX", label: "UniDOX",
    edges: { top: [-1], right: [1], bottom: [0], left: [1] },
  },
  {
    id: "varuna",  col: 4, row: 4, cs: 1, rs: 1, color: "#DC2626",
    name: "Varuna", label: "Varuna",
    edges: { top: [1], right: [1], bottom: [0], left: [-1] },
  },
  {
    id: "enroute", col: 5, row: 4, cs: 1, rs: 1, color: "#7C3AED",
    name: "Enroute", label: "Enroute",
    edges: { top: [-1], right: [0], bottom: [0], left: [-1] },
  },
];

// ─── Partner detail data ───────────────────────────────────────────────────────
const partnerDetails: Record<string, {
  category: string; description: string; features: string[];
  sectors: { name: string; stars: number; pct: number }[]; badge: string;
}> = {
  tsoft:    { category:"E-Ticaret Çözümü",       description:"T-SOFT ile profesyonel e-ticaret sitenizi kurun. Ödeme, kargo, stok entegrasyonları hazır. Siparişlerinizi tek panelden yönetin.", features:["Hazır e-ticaret altyapısı","Ödeme gateway entegrasyonu","Kargo entegrasyonu (Aras, Yurtiçi)","Stok senkronizasyonu","SEO & performans optimize"], sectors:[{name:"E-ticaret",stars:5,pct:95},{name:"Perakende",stars:4,pct:80}], badge:"Platform İndirimi Mevcut" },
  qnb:      { category:"Finansal Çözümler",      description:"Kurumsal bankacılık, dijital ödeme altyapısı ve işletmelere özel finansal ürünler ile nakit akışınızı optimize edin.", features:["İşletme hesabı açılışı","Dijital bankacılık paneli","Kredi çözümleri","Döviz işlemleri"], sectors:[{name:"Finans",stars:5,pct:98},{name:"Ticaret",stars:4,pct:82}], badge:"Özel Faiz Oranları" },
  ikas:     { category:"E-Ticaret Altyapısı",    description:"Çok kanallı satış, otomatik stok yönetimi ve entegre pazaryeri çözümleriyle satışlarınızı büyütün. Trendyol, Hepsiburada dahil.", features:["Çok kanallı satış yönetimi","Pazaryeri entegrasyonu","Otomatik stok takibi","Analitik dashboard"], sectors:[{name:"E-ticaret",stars:5,pct:97},{name:"Toptancı",stars:4,pct:75}], badge:"İlk 3 Ay Ücretsiz" },
  param:    { category:"Ödeme Sistemleri",       description:"Fiziksel POS, sanal POS, mobil ödeme — tüm ödeme altyapınızı tek çözümde. Güvenli, hızlı, entegre.", features:["Param POS (Fiziksel satış noktası)","Param Kart (Online ödemeler)","Param Mobil (QR ödeme)","Taksit ve kampanya yönetimi"], sectors:[{name:"Perakende",stars:5,pct:98},{name:"Restoran",stars:5,pct:95}], badge:"Kurulum Ücretsiz" },
  kredim:   { category:"Finansman Çözümleri",    description:"KOBİ'lere özel esnek kredi imkânları, hızlı onay süreci ve rekabetçi faiz oranlarıyla büyümenizi destekler.", features:["Hızlı kredi onayı (24 saat)","Esnek vade seçenekleri","KOBİ'ye özel oranlar","Online başvuru"], sectors:[{name:"Üretim",stars:5,pct:90},{name:"Ticaret",stars:4,pct:85}], badge:"%0 Komisyon" },
  qf:       { category:"Dijital Finans",         description:"Dijital finans yönetimi, otomatik muhasebe ve gerçek zamanlı nakit akışı takibi ile finansal kontrolü ele alın.", features:["Gerçek zamanlı nakit takibi","Otomatik muhasebe","Finansal raporlar","Banka mutabakatı"], sectors:[{name:"Finans",stars:5,pct:95},{name:"Hizmet",stars:4,pct:80}], badge:"Ücretsiz Demo" },
  azalt:    { category:"Maliyet Yönetimi",       description:"Operasyonel giderlerinizi analiz edin, israfı önleyin ve işletme maliyetlerinizi akıllı önerilerle azaltın.", features:["Gider analizi & optimizasyon","Tasarruf önerileri","Bütçe planlama","Maliyet raporları"], sectors:[{name:"Üretim",stars:5,pct:92},{name:"Hizmet",stars:4,pct:78}], badge:"Ort. %23 Tasarruf" },
  qes:      { category:"E-Fatura Sistemi",       description:"GİB onaylı e-fatura, e-arşiv ve e-irsaliye çözümleriyle faturalaşma süreçlerinizi tamamen otomatikleştirin.", features:["E-fatura & e-arşiv","GİB entegrasyonu","Otomatik gönderim","Yasal uyum garantisi"], sectors:[{name:"Tüm Sektörler",stars:5,pct:99},{name:"Üretim",stars:5,pct:95}], badge:"Mevzuat Uyumlu" },
  aras:     { category:"Kargo & Lojistik",       description:"Türkiye'nin en geniş kargo ağıyla gönderi takibi, toplu sevkiyat ve e-ticaret entegrasyonu tek panelde.", features:["Gönderi takibi (anlık)","Toplu sevkiyat yönetimi","E-ticaret entegrasyonu","İndirimli tarifeler"], sectors:[{name:"E-ticaret",stars:5,pct:96},{name:"Perakende",stars:4,pct:82}], badge:"İndirimli Kargo" },
  google:   { category:"Bulut & İşbirliği",      description:"Google Workspace ile ekip iletişimini güçlendirin, belgelerinizi bulutta tutun ve verimliliğinizi artırın.", features:["Gmail & Google Drive","Meet video konferans","Docs, Sheets, Slides","Kurumsal güvenlik"], sectors:[{name:"Tüm Sektörler",stars:5,pct:95},{name:"Hizmet",stars:5,pct:95}], badge:"KOBİ'ye Özel Fiyat" },
  univera:  { category:"ERP Yazılımı",           description:"Üretim, satış, muhasebe ve İK modüllerini tek çatı altında toplayan entegre ERP çözümü.", features:["Üretim & stok takibi","Muhasebe modülü","İK ve bordro yönetimi","Raporlama & analitik"], sectors:[{name:"Üretim",stars:5,pct:93},{name:"Ticaret",stars:4,pct:80}], badge:"Ücretsiz Kurulum" },
  nebim:    { category:"Perakende ERP",          description:"İşletmenizi tek platformdan yönetin. Üretim, finans, stok, satış, İK — tüm modüller entegre.", features:["Entegre ERP modülleri","Sektöre özel çözümler","Gerçek zamanlı raporlama","Çoklu şube/depo yönetimi"], sectors:[{name:"Üretim",stars:5,pct:97},{name:"Tekstil",stars:5,pct:97}], badge:"Sektör Lideri" },
  kariyer:  { category:"İK & İstihdam",          description:"Türkiye'nin en büyük iş ilanı platformunda doğru yetenekleri işe alın, işveren markanızı güçlendirin.", features:["İş ilanı yayınlama","CV havuzu erişimi","İşveren markası yönetimi","Aday takip sistemi"], sectors:[{name:"Tüm Sektörler",stars:5,pct:95},{name:"Hizmet",stars:5,pct:92}], badge:"Öncelikli İlan" },
  mukellef: { category:"Muhasebe & Vergi",       description:"Bulut tabanlı muhasebe, otomatik vergi hesaplama ve e-beyanname ile vergi süreçlerinizi kolaylaştırın.", features:["Bulut muhasebe sistemi","Otomatik vergi hesaplama","E-beyanname gönderimi","Mali müşavirlik desteği"], sectors:[{name:"Tüm Sektörler",stars:5,pct:99},{name:"Hizmet",stars:5,pct:97}], badge:"Mali Müşavirlik" },
  ticimax:  { category:"E-Ticaret Çözümleri",   description:"Hazır e-ticaret altyapısı, mobil uygulama ve çok kanallı satış araçlarıyla online mağazanızı büyütün.", features:["Mobil uygulama dahil","SEO optimizasyon araçları","Çok kanallı satış","30 gün ücretsiz deneme"], sectors:[{name:"E-ticaret",stars:5,pct:94},{name:"Perakende",stars:4,pct:80}], badge:"30 Gün Ücretsiz" },
  kolaybi:  { category:"Ön Muhasebe",            description:"Fatura, gider, stok ve kasa yönetimini tek uygulamadan kolayca takip edin. Teknik bilgi gerekmez.", features:["Fatura yönetimi","Gider takibi & raporlama","Stok sayımı & yönetimi","Kasa takibi"], sectors:[{name:"Küçük İşletme",stars:5,pct:98},{name:"Hizmet",stars:5,pct:94}], badge:"Başlangıç Ücretsiz" },
  webplus:  { category:"Web Çözümleri",          description:"Kurumsal web sitesi, dijital pazarlama ve SEO hizmetleriyle online varlığınızı profesyonel bir seviyeye taşıyın.", features:["Kurumsal web sitesi","Dijital pazarlama","SEO & Analytics","Ücretsiz domain"], sectors:[{name:"Tüm Sektörler",stars:5,pct:90},{name:"Hizmet",stars:5,pct:92}], badge:"Ücretsiz Domain" },
  stokbar:  { category:"Stok Yönetimi",          description:"Barkodlu stok takibi, min-max uyarıları ve tedarikçi yönetimiyle depo süreçlerinizi dijitalleştirin.", features:["Barkodlu stok takibi","Min-max uyarı sistemi","Tedarikçi yönetimi","Mobil uygulama dahil"], sectors:[{name:"Perakende",stars:5,pct:95},{name:"Üretim",stars:4,pct:82}], badge:"Mobil Uygulama" },
  finrota:  { category:"Finansal Yönetim",       description:"Nakit akışı, çek/senet takibi ve banka mutabakasını otomatikleştiren akıllı finansal yönetim platformu.", features:["Nakit akışı takibi","Çek/senet yönetimi","Banka mutabakatı","Otomatik finansal raporlar"], sectors:[{name:"Finans",stars:5,pct:94},{name:"Üretim",stars:4,pct:80}], badge:"Otomatik Raporlar" },
  unidox:   { category:"Dijital Arşiv",          description:"Kurumsal belge yönetimi, dijital arşiv ve iş akışı otomasyonuyla evrak süreçlerinizi sıfır kağıtla yönetin.", features:["Belge yönetimi sistemi","Dijital arşiv çözümleri","İş akışı otomasyonu","KVKK uyumlu"], sectors:[{name:"Kamu & Kurumsal",stars:5,pct:96},{name:"Hizmet",stars:4,pct:82}], badge:"KVKK Uyumlu" },
  varuna:   { category:"Lojistik Yazılımı",      description:"Filo yönetimi, rota optimizasyonu ve teslimat takibiyle lojistik operasyonlarınızı verimli hale getirin.", features:["Filo yönetimi sistemi","Rota optimizasyonu","Teslimat takibi","Yakıt tasarruf raporu"], sectors:[{name:"Lojistik",stars:5,pct:97},{name:"E-ticaret",stars:4,pct:78}], badge:"Yakıt Tasarrufu" },
  enroute:  { category:"Dağıtım Optimizasyonu",  description:"Akıllı dağıtım planlaması ve gerçek zamanlı görev yönetimiyle saha ekiplerinizin verimliliğini maksimize edin.", features:["Akıllı dağıtım planlaması","Saha ekip yönetimi","Gerçek zamanlı takip","Performans analitiği"], sectors:[{name:"Lojistik",stars:5,pct:95},{name:"Hizmet",stars:4,pct:80}], badge:"%40 Daha Verimli" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const StarRow = ({ name, stars, pct }: { name: string; stars: number; pct: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-muted-foreground w-28 truncate font-medium">{name}</span>
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3 h-3"
          fill={i < stars ? "#FBBF24" : "none"}
          stroke={i < stars ? "#FBBF24" : "#D1D5DB"} strokeWidth={1.5} />
      ))}
    </div>
    <span className="text-xs font-bold text-muted-foreground">%{pct}</span>
  </div>
);

// ─── Partner right panel ───────────────────────────────────────────────────────
const PartnerPanel = ({ piece, onDeselect }: {
  piece: typeof pieces[0]; onDeselect: () => void;
}) => {
  const d = partnerDetails[piece.id];
  if (!d) return null;
  return (
    <div className="flex flex-col h-full justify-center">
      <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
        style={{ background: `${piece.color}22`, color: piece.color }}>
        {d.category.toUpperCase()}
      </span>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ background: piece.color, boxShadow: `0 8px 28px -6px ${piece.color}66` }}>
          {(piece as any).logo ? (
            <img src={(piece as any).logo} alt={piece.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-black text-white text-center leading-tight px-1"
              style={{ fontSize: piece.name.length > 6 ? "9px" : piece.name.length > 4 ? "11px" : "15px", letterSpacing: "-0.02em" }}>
              {piece.name}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-black text-foreground"
            style={{ fontSize: "clamp(1.8rem,2.8vw,2.4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            {piece.name}
          </h3>
          <p className="text-muted-foreground font-medium text-sm mt-0.5">{d.category}</p>
        </div>
      </div>
      <p className="text-foreground mb-5"
        style={{ fontSize: "0.975rem", lineHeight: 1.72, borderLeft: `3px solid ${piece.color}`, paddingLeft: "14px" }}>
        {d.description}
      </p>
      <div className="grid grid-cols-1 gap-1.5 mb-5">
        {d.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${piece.color}20` }}>
              <Check className="w-2.5 h-2.5" style={{ color: piece.color }} strokeWidth={3} />
            </div>
            <span className="text-sm text-foreground font-medium">{f}</span>
          </div>
        ))}
      </div>
      {d.sectors.length > 0 && (
        <div className="rounded-xl p-4 mb-5"
          style={{ background: "hsl(250,30%,98%)", border: "1px solid hsl(252,20%,90%)" }}>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2.5">En Uygun Sektörler</p>
          <div className="flex flex-col gap-1.5">
            {d.sectors.map((s) => <StarRow key={s.name} {...s} />)}
          </div>
        </div>
      )}
      <Link to="/kobi/urunler" className="block">
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: `0 12px 32px -8px ${piece.color}77` }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm w-full justify-center"
          style={{ background: piece.color, boxShadow: `0 4px 18px -6px ${piece.color}55` }}>
          {piece.name} Çözümünü İncele <ArrowRight className="w-4 h-4" />
        </motion.button>
      </Link>
    </div>
  );
};

// ─── Logo / text fitting inside a piece ──────────────────────────────────────
function LogoText({ piece, cx, cy }: { piece: typeof pieces[0]; cx: number; cy: number }) {
  const pieceW = piece.cs * CW;
  const pieceH = piece.rs * CH;
  const px = cx - pieceW / 2;
  const py = cy - pieceH / 2;

  // If piece has a logo image → fill the entire piece area, clipped to puzzle shape
  if ((piece as any).logo) {
    // Padding inside piece for contain-style logo
    const padding = Math.min(pieceW, pieceH) * 0.18;
    return (
      <g clipPath={`url(#clip-${piece.id})`} style={{ pointerEvents: "none" }}>
        {/* White background */}
        <rect x={px} y={py} width={pieceW} height={pieceH} fill="#FFFFFF" />
        {/* Logo contained with padding */}
        <image
          href={(piece as any).logo}
          x={px + padding}
          y={py + padding}
          width={pieceW - padding * 2}
          height={pieceH - padding * 2}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    );
  }

  // Fallback: text
  const name = piece.name;
  const words = name.split(" ");
  const line1 = words.length > 1 ? words.slice(0, Math.ceil(words.length / 2)).join(" ") : name;
  const line2 = words.length > 1 ? words.slice(Math.ceil(words.length / 2)).join(" ") : null;

  const area = pieceW * pieceH;
  const maxChars = Math.max(line1.length, (line2 || "").length);
  const baseFontSize = Math.min(
    pieceW * 0.8 / Math.max(maxChars * 0.55, 2),
    pieceH * 0.28,
    area > 10000 ? 22 : area > 6000 ? 16 : 12
  );
  const fontSize = Math.max(8, Math.min(baseFontSize, 18));
  const lineH = fontSize * 1.25;
  const totalH = line2 ? lineH * 2 : lineH;
  const startY = cy - totalH / 2 + lineH * 0.7;

  return (
    <g>
      <text
        x={cx} y={startY}
        textAnchor="middle" dominantBaseline="middle"
        fill="#1a1a2e"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontWeight="800"
        fontSize={fontSize}
        letterSpacing="-0.3"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {line1}
      </text>
      {line2 && (
        <text
          x={cx} y={startY + lineH}
          textAnchor="middle" dominantBaseline="middle"
          fill="#1a1a2e"
          fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
          fontWeight="800"
          fontSize={fontSize}
          letterSpacing="-0.3"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {line2}
        </text>
      )}
    </g>
  );
}

// ─── SVG Puzzle component ─────────────────────────────────────────────────────
function PuzzleBoard({
  selectedId,
  onSelect,
  visible,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  visible: boolean;
}) {
  const GAP = 3;
  const SVG_W = COLS * CW + (COLS - 1) * GAP;   // 540 + 15 = 555
  const SVG_H = 5 * CH + (5 - 1) * GAP;          // 375 + 12 = 387
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      width="100%"
      style={{ display: "block", overflow: "visible" }}
      aria-label="Partner ekosistemi puzzle"
    >
      <defs>
        {/* Bevel light gradient — applied as fill pattern to each piece */}
        {pieces.map((p) => {
          const gx = p.col * CW;
          const gy = p.row * CH;
          const gw = p.cs * CW;
          const gh = p.rs * CH;
          return (
            <linearGradient
              key={`grad-${p.id}`}
              id={`bevel-${p.id}`}
              x1={gx} y1={gy} x2={gx + gw} y2={gy + gh}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
              <stop offset="45%"  stopColor="rgba(255,255,255,0.04)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
            </linearGradient>
          );
        })}

        {/* Selected glow filter */}
        <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feFlood floodColor="hsl(268,72%,48%)" floodOpacity="0.9" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inner shadow filter for cutline depth */}
        <filter id="inner-shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feOffset dx="0" dy="1" />
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Render pieces */}
      {pieces.map((piece, i) => {
        const GAP = 3; // px gap between pieces
        const px = piece.col * CW + piece.col * GAP;
        const py = piece.row * CH + piece.row * GAP;
        const pw = piece.cs * CW;
        const ph = piece.rs * CH;
        const cx = px + pw / 2;
        const cy = py + ph / 2;

        const pathD  = puzzlePath(px, py, piece.cs, piece.rs, piece.edges);
        const isSel  = selectedId === piece.id;
        const isHov  = hovered === piece.id;

        return (
          <motion.g
            key={piece.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={visible ? {
              opacity: 1,
              scale: 1,
              filter: isSel ? "drop-shadow(0 0 8px hsl(268,72%,55%))" : "none",
            } : { opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.22 },
              scale:   { duration: 0.5, delay: 0.04 + i * 0.035, ease: [0.22, 1, 0.36, 1] },
            }}
            style={{ cursor: "pointer", transformOrigin: `${cx}px ${cy}px` }}
            onClick={() => onSelect(piece.id)}
            onMouseEnter={() => setHovered(piece.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Selected pop-out lift */}
            <motion.g
              animate={isSel ? { y: -5 } : { y: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              {/* Main fill — white */}
              <path d={pathD} fill="#FFFFFF" />

              {/* Bevel gradient overlay */}
              <path d={pathD} fill={`url(#bevel-${piece.id})`} />

              {/* Inner shadow cutline (thin dark edge) */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="1.5"
              />

              {/* Hover / selected highlight ring */}
              {(isHov || isSel) && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={isSel ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)"}
                  strokeWidth={isSel ? 2.5 : 1.5}
                />
              )}

              {/* Selected outer glow ring */}
              {isSel && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="hsl(268,72%,52%)"
                  strokeWidth="4"
                  strokeOpacity="0.7"
                  style={{ filter: "blur(2px)" }}
                />
              )}

              {/* Top-left corner light (bevel highlight) */}
              <clipPath id={`clip-${piece.id}`}>
                <path d={pathD} />
              </clipPath>
              <rect
                x={px} y={py} width={pw} height={6}
                fill="rgba(255,255,255,0.18)"
                clipPath={`url(#clip-${piece.id})`}
              />
              <rect
                x={px} y={py} width={6} height={ph}
                fill="rgba(255,255,255,0.12)"
                clipPath={`url(#clip-${piece.id})`}
              />

              {/* White logo text */}
              <LogoText piece={piece} cx={cx} cy={cy} />
            </motion.g>

            {/* Tooltip */}
            <AnimatePresence>
              {isHov && (
                <motion.g
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  style={{ pointerEvents: "none" }}
                >
                  <rect
                    x={cx - 52} y={py - 38}
                    width={104} height={32}
                    rx={8}
                    fill="white"
                    style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.14))" }}
                  />
                  <text
                    x={cx} y={py - 25}
                    textAnchor="middle"
                    fill="#1a1a2e"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontWeight="700"
                    fontSize="11"
                    style={{ pointerEvents: "none" }}
                  >
                    {piece.name}
                  </text>
                  <text
                    x={cx} y={py - 12}
                    textAnchor="middle"
                    fill="#666"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontWeight="500"
                    fontSize="9"
                    style={{ pointerEvents: "none" }}
                  >
                    {partnerDetails[piece.id]?.category}
                  </text>
                  {/* arrow */}
                  <polygon
                    points={`${cx - 5},${py - 6} ${cx + 5},${py - 6} ${cx},${py - 1}`}
                    fill="white"
                  />
                </motion.g>
              )}
            </AnimatePresence>
          </motion.g>
        );
      })}
    </svg>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
const PartnerEcosystemSection = () => {
  const [selectedId, setSelectedId] = useState<string | null>("param");
  const [visible,    setVisible]    = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.06 });

  useEffect(() => {
    if (inView) setTimeout(() => setVisible(true), 80);
  }, [inView]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const selectedPiece = selectedId ? pieces.find((p) => p.id === selectedId) ?? null : null;

  return (
    <section
      id="partner-ecosystem"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "#F8F9FF" }}
    >
      <div className="max-w-[1340px] mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/15 mb-4">
            Çözüm Ortakları
          </span>
          <h2 className="font-black text-foreground mx-auto"
            style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", lineHeight: 1.1, letterSpacing: "-0.035em", maxWidth: "640px" }}>
            Çözüm Ortaklarımız
          </h2>
          <p className="text-muted-foreground mt-3 mx-auto"
            style={{ maxWidth: "460px", fontSize: "1rem", lineHeight: 1.7 }}>
            Bir puzzle parçasına tıklayın — partnerinizi keşfedin
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div ref={sectionRef} className="flex flex-col-reverse lg:flex-row items-start gap-8 xl:gap-14">

          {/* LEFT: SVG Puzzle */}
          <motion.div
            className="w-full lg:w-[50%] flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <PuzzleBoard selectedId={selectedId} onSelect={handleSelect} visible={visible} />

            {/* Stats + CTA */}
            <div className="flex justify-center gap-8 md:gap-12 mt-8">
              {[
                { value: "50+", label: "Çözüm Ortağı" },
                { value: "21",  label: "Param Ürünü"  },
                { value: "10",  label: "Kategori"     },
              ].map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex flex-col items-center">
                  <span className="font-black text-primary"
                    style={{ fontSize: "clamp(1.5rem,2.2vw,1.9rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}>
              <Link to="/kobi/urunler">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 40px -6px rgba(109,40,217,0.52)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, hsl(268,72%,38%), hsl(268,72%,52%))", boxShadow: "0 6px 24px -4px rgba(109,40,217,0.38)" }}>
                  Çözüm Ortaklarını Keşfet <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: Dynamic content panel */}
          <div className="w-full lg:w-[50%] lg:sticky lg:top-24">
            <motion.div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: "white",
                boxShadow: "0 4px 40px -8px rgba(109,40,217,0.10), 0 1px 4px rgba(0,0,0,0.04)",
                border: "1px solid hsl(252,20%,92%)",
                minHeight: "540px",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                {selectedPiece && (
                  <motion.div key={selectedPiece.id}
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="h-full">
                    <PartnerPanel piece={selectedPiece} onDeselect={() => setSelectedId("param")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerEcosystemSection;
