import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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
const CW = 90; // cell width  px
const CH = 75; // cell height px
const T = 12; // tab radius  px
const COLS = 5;

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
edges: {top: number[];right: number[];bottom: number[];left: number[];})
: string {
  const pw = cs * CW;
  const ph = rs * CH;
  const cp = T * 1.55; // cubic-bezier control-point distance

  let d = `M ${px} ${py} `;

  // ── TOP edge: left → right ────────────────────────────────────────────────
  for (let c = 0; c < cs; c++) {
    const sx = px + c * CW;
    const mx = sx + CW / 2;
    const tv = edges.top[c] ?? 0;
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
    const sy = py + r * CH;
    const my = sy + CH / 2;
    const tv = edges.right[r] ?? 0;
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
    const sx = px + c * CW;
    const mx = sx + CW / 2;
    const tv = edges.bottom[c] ?? 0;
    const by = py + ph;
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
    const sy = py + r * CH;
    const my = sy + CH / 2;
    const tv = edges.left[r] ?? 0;
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
// Layout: 5-column × 4-row grid
//
// BIG pieces: Param(2×2), Univera(2×2), Nebim(1×2), Kredim(2×1), Finrota(2×1)
//
// Row 0: param(col0,cs2,rs2), ikas(col2,cs1),   kariyer(col3,cs1), google(col4,cs1)
// Row 1: [param cont],         tsoft(col2,cs1),  mukellef(col3,cs1), aras(col4,cs1)
// Row 2: kredim(col0,cs2,rs1), univera(col2,cs2,rs2),               nebim(col4,cs1,rs2)
// Row 3: finrota(col0,cs2,rs1),[univera cont],                       [nebim cont]
//
const pieces = [
// ── Param — BIG 2×2 ────────────────────────────────────────────────────────
{
  id: "param", col: 0, row: 0, cs: 2, rs: 2, color: "#4B0082",
  name: "Param", label: "Param", logo: logoParam,
  edges: { top: [0, 0], right: [1, -1], bottom: [1, -1], left: [0, 0] }
},
// ── Row 0 (small) ──────────────────────────────────────────────────────────
{
  id: "ikas", col: 2, row: 0, cs: 1, rs: 1, color: "#3B82F6",
  name: "ikas", label: "ikas", logo: logoIkas,
  edges: { top: [0], right: [1], bottom: [-1], left: [-1] }
},
{
  id: "kariyer", col: 3, row: 0, cs: 1, rs: 1, color: "#EA580C",
  name: "Kariyer.net", label: "Kariyer", logo: logoKariyer,
  edges: { top: [0], right: [-1], bottom: [1], left: [-1] }
},
{
  id: "google", col: 4, row: 0, cs: 1, rs: 1, color: "#4285F4",
  name: "Google", label: "Google", logo: logoGoogle,
  edges: { top: [0], right: [0], bottom: [-1], left: [1] }
},
// ── Row 1 (small) ──────────────────────────────────────────────────────────
{
  id: "tsoft", col: 2, row: 1, cs: 1, rs: 1, color: "#1a1a2e",
  name: "T-SOFT", label: "T-SOFT", logo: logoTsoft,
  edges: { top: [1], right: [1], bottom: [1], left: [1] }
},
{
  id: "mukellef", col: 3, row: 1, cs: 1, rs: 1, color: "#1E40AF",
  name: "Mükellef", label: "Mükellef", logo: logoMukellef,
  edges: { top: [-1], right: [-1], bottom: [-1], left: [-1] }
},
{
  id: "aras", col: 4, row: 1, cs: 1, rs: 1, color: "#10B981",
  name: "Aras", label: "Aras", logo: logoAras,
  edges: { top: [1], right: [0], bottom: [1], left: [1] }
},
// ── Kredim — BIG 2×1 ───────────────────────────────────────────────────────
{
  id: "kredim", col: 0, row: 2, cs: 2, rs: 1, color: "#26D07C",
  name: "Kredim", label: "Kredim", logo: logoKredim,
  edges: { top: [-1, 1], right: [-1], bottom: [1, -1], left: [0, 0] }
},
// ── Univera — BIG 2×2 ──────────────────────────────────────────────────────
{
  id: "univera", col: 2, row: 2, cs: 2, rs: 2, color: "#4D008C",
  name: "Univera", label: "Univera", logo: logoUnivera,
  edges: { top: [-1, 1], right: [1, -1], bottom: [-1, 1], left: [1, -1] }
},
// ── Nebim — BIG 1×2 ────────────────────────────────────────────────────────
{
  id: "nebim", col: 4, row: 2, cs: 1, rs: 2, color: "#00A2E1",
  name: "Nebim", label: "Nebim", logo: logoNebim,
  edges: { top: [-1], right: [0, 0], bottom: [0], left: [-1, 1] }
},
// ── Finrota — BIG 2×1 ──────────────────────────────────────────────────────
{
  id: "finrota", col: 0, row: 3, cs: 2, rs: 1, color: "#FF671D",
  name: "Finrota", label: "Finrota", logo: logoFinrotaNew,
  edges: { top: [-1, 1], right: [1], bottom: [0, 0], left: [0, 0] }
}];


// ─── Partner detail data ───────────────────────────────────────────────────────
const partnerDetails: Record<string, {
  category: string;leadership: string;description: string;features: string[];
  sectors: {name: string;stars: number;pct: number;}[];badge: string;
}> = {
  tsoft: { category: "E-Ticaret Çözümü", leadership: "25 Yıldır Türkiye'nin Önde Gelen E-ticaret Platformu", description: "Binlerce işletmeye güvenilir online satış altyapısı sağlıyoruz. Hızlı kurulum, kolay yönetim.", features: ["Hazır e-ticaret altyapısı", "Ödeme gateway entegrasyonu", "Kargo entegrasyonu (Aras, Yurtiçi)", "Stok senkronizasyonu", "SEO & performans optimize"], sectors: [{ name: "E-ticaret", stars: 5, pct: 95 }, { name: "Perakende", stars: 4, pct: 80 }], badge: "Platform İndirimi Mevcut" },
  qnb: { category: "Finansal Çözümler", leadership: "Türkiye'nin Önde Gelen Bankası", description: "Kurumsal bankacılık, ticari krediler, dış ticaret finansmanı. KOBİ'lere özel çözümler.", features: ["İşletme hesabı açılışı", "Dijital bankacılık paneli", "Kredi çözümleri", "Döviz işlemleri"], sectors: [{ name: "Finans", stars: 5, pct: 98 }, { name: "Ticaret", stars: 4, pct: 82 }], badge: "Özel Faiz Oranları" },
  ikas: { category: "E-Ticaret Altyapısı", leadership: "Türkiye'nin En Hızlı Büyüyen E-ticaret Platformu", description: "Sıfırdan e-ticaret sitenizi kurun, tüm satış kanallarınızı tek panelden yönetin. Kullanımı çok kolay.", features: ["Çok kanallı satış yönetimi", "Pazaryeri entegrasyonu", "Otomatik stok takibi", "Analitik dashboard"], sectors: [{ name: "E-ticaret", stars: 5, pct: 97 }, { name: "Toptancı", stars: 4, pct: 75 }], badge: "İlk 3 Ay Ücretsiz" },
  param: { category: "Ödeme Sistemleri", leadership: "Türkiye'nin En Büyük Sanal POS Altyapısı", description: "Fiziksel POS, sanal POS, mobil ödeme ile kolay ve güvenli ödeme alın. Tüm ödeme altyapınızı tek çözümde entegre edin.", features: ["Param POS (Fiziksel satış noktası)", "Param Kart (Online ödemeler)", "Param Mobil (QR ödeme)", "Taksit ve kampanya yönetimi"], sectors: [{ name: "Perakende", stars: 5, pct: 98 }, { name: "Restoran", stars: 5, pct: 95 }], badge: "Kurulum Ücretsiz" },
  kredim: { category: "Finansman Çözümleri", leadership: "Türkiye'nin İlk Dijital KOBİ Finansman Platformu", description: "Hızlı onay, esnek geri ödeme ile işletme sermayenizi güçlendirin. 500K'ya kadar kredi.", features: ["Hızlı kredi onayı (24 saat)", "Esnek vade seçenekleri", "KOBİ'ye özel oranlar", "Online başvuru"], sectors: [{ name: "Üretim", stars: 5, pct: 90 }, { name: "Ticaret", stars: 4, pct: 85 }], badge: "%0 Komisyon" },
  qf: { category: "Dijital Finans", leadership: "KOBİ'lerin Güvendiği Dijital Finans Platformu", description: "Dijital finans yönetimi, otomatik muhasebe ve gerçek zamanlı nakit akışı takibi ile finansal kontrolü ele alın.", features: ["Gerçek zamanlı nakit takibi", "Otomatik muhasebe", "Finansal raporlar", "Banka mutabakatı"], sectors: [{ name: "Finans", stars: 5, pct: 95 }, { name: "Hizmet", stars: 4, pct: 80 }], badge: "Ücretsiz Demo" },
  azalt: { category: "Maliyet Yönetimi", leadership: "Ortalama %23 Maliyet Tasarrufu Sağlayan Çözüm", description: "Operasyonel giderlerinizi analiz edin, israfı önleyin ve işletme maliyetlerinizi akıllı önerilerle azaltın.", features: ["Gider analizi & optimizasyon", "Tasarruf önerileri", "Bütçe planlama", "Maliyet raporları"], sectors: [{ name: "Üretim", stars: 5, pct: 92 }, { name: "Hizmet", stars: 4, pct: 78 }], badge: "Ort. %23 Tasarruf" },
  qes: { category: "E-Fatura Sistemi", leadership: "GİB Onaylı, Mevzuata %100 Uyumlu E-Fatura Sistemi", description: "E-fatura, e-arşiv ve e-irsaliye çözümleriyle faturalaşma süreçlerinizi tamamen otomatikleştirin.", features: ["E-fatura & e-arşiv", "GİB entegrasyonu", "Otomatik gönderim", "Yasal uyum garantisi"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 99 }, { name: "Üretim", stars: 5, pct: 95 }], badge: "Mevzuat Uyumlu" },
  aras: { category: "Kargo & Lojistik", leadership: "Türkiye'nin En Yaygın Lojistik Ağı", description: "1.800+ şube, 81 il kargo hizmeti. Uluslararası gönderim, hızlı teslimat, e-ticaret entegrasyonu.", features: ["Gönderi takibi (anlık)", "Toplu sevkiyat yönetimi", "E-ticaret entegrasyonu", "İndirimli tarifeler"], sectors: [{ name: "E-ticaret", stars: 5, pct: 96 }, { name: "Perakende", stars: 4, pct: 82 }], badge: "İndirimli Kargo" },
  google: { category: "Bulut & İşbirliği", leadership: "Dünya Çapında 3 Milyar Kullanıcı", description: "Email, Drive, Doküman, Takvim, Meet. İş iletişiminizi ve işbirliğinizi bulutta yönetin.", features: ["Gmail & Google Drive", "Meet video konferans", "Docs, Sheets, Slides", "Kurumsal güvenlik"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Hizmet", stars: 5, pct: 95 }], badge: "KOBİ'ye Özel Fiyat" },
  univera: { category: "ERP Yazılımı", leadership: "Kurumsal İşletmelerin Tercih Ettiği İş Yönetim Çözümleri", description: "Stok, tedarik, proje, döküman, çağrı merkezi — operasyonel mükemmelliği tek platformda.", features: ["Üretim & stok takibi", "Muhasebe modülü", "İK ve bordro yönetimi", "Raporlama & analitik"], sectors: [{ name: "Üretim", stars: 5, pct: 93 }, { name: "Ticaret", stars: 4, pct: 80 }], badge: "Ücretsiz Kurulum" },
  nebim: { category: "Perakende ERP", leadership: "Türkiye'de 40 Yıllık ERP Liderliği", description: "Nebim V3 ve Nebim Era ile üretimden finansa, stoktan satışa tüm işletme süreçlerinizi entegre yönetin.", features: ["Entegre ERP modülleri", "Sektöre özel çözümler", "Gerçek zamanlı raporlama", "Çoklu şube/depo yönetimi"], sectors: [{ name: "Üretim", stars: 5, pct: 97 }, { name: "Tekstil", stars: 5, pct: 97 }], badge: "Sektör Lideri" },
  kariyer: { category: "İK & İstihdam", leadership: "Türkiye'nin 1 Numaralı İş İlanı Sitesi", description: "Milyonlarca özgeçmiş, en geniş aday havuzu. Doğru elemanı hızlıca bulun, işe alım sürecinizi dijitalleştirin.", features: ["İş ilanı yayınlama", "CV havuzu erişimi", "İşveren markası yönetimi", "Aday takip sistemi"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 95 }, { name: "Hizmet", stars: 5, pct: 92 }], badge: "Öncelikli İlan" },
  mukellef: { category: "Global Şirket Kuruluşu", leadership: "Global Şirket Kuruluşunda Uzman", description: "Yurt dışı şirket kuruluşu, vergi danışmanlığı, uluslararası ticaret hukuku. 50+ ülkede tecrübe.", features: ["Yurt dışı şirket kuruluşu", "Vergi danışmanlığı", "Uluslararası ticaret hukuku", "50+ ülke tecrübesi"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 99 }, { name: "Hizmet", stars: 5, pct: 97 }], badge: "50+ Ülke" },
  ticimax: { category: "E-Ticaret Çözümleri", leadership: "20.000+ E-ticaret Sitesine Güç Veren Platform", description: "Kolay kurulum, sınırsız ürün, güçlü yönetim paneli. Büyümenize ölçeklenebilir altyapı.", features: ["Mobil uygulama dahil", "SEO optimizasyon araçları", "Çok kanallı satış", "30 gün ücretsiz deneme"], sectors: [{ name: "E-ticaret", stars: 5, pct: 94 }, { name: "Perakende", stars: 4, pct: 80 }], badge: "30 Gün Ücretsiz" },
  kolaybi: { category: "Ön Muhasebe", leadership: "KOBİ'lerin Tercihi Bulut Muhasebe Çözümü", description: "E-fatura, e-defter, tahsilat otomasyonu. Muhasebenizi her yerden yönetin, zamandan %60 tasarruf.", features: ["Fatura yönetimi", "Gider takibi & raporlama", "Stok sayımı & yönetimi", "Kasa takibi"], sectors: [{ name: "Küçük İşletme", stars: 5, pct: 98 }, { name: "Hizmet", stars: 5, pct: 94 }], badge: "Başlangıç Ücretsiz" },
  webplus: { category: "Web Çözümleri", leadership: "Hızlı ve SEO Uyumlu E-ticaret Altyapısı", description: "1.5 saniyede açılan, Google'da ilk sıralarda çıkan siteler. Ödeme-kargo hazır entegre.", features: ["Kurumsal web sitesi", "Dijital pazarlama", "SEO & Analytics", "Ücretsiz domain"], sectors: [{ name: "Tüm Sektörler", stars: 5, pct: 90 }, { name: "Hizmet", stars: 5, pct: 92 }], badge: "Ücretsiz Domain" },
  stokbar: { category: "Stok Yönetimi", leadership: "15.000+ İşletmenin Stok Yönetim Tercihi", description: "FIFO/LIFO takibi, çoklu depo, barkod, min-max uyarılar. Stok fire oranınızı %40 azaltın.", features: ["Barkodlu stok takibi", "Min-max uyarı sistemi", "Tedarikçi yönetimi", "Mobil uygulama dahil"], sectors: [{ name: "Perakende", stars: 5, pct: 95 }, { name: "Üretim", stars: 4, pct: 82 }], badge: "Mobil Uygulama" },
  finrota: { category: "Finansal Yönetim", leadership: "10.000+ İşletmenin Güvendiği Finansal Yönetim Çözümü", description: "Tahsilat, ödeme, banka mutabakatı otomasyonu. Nakit akışınızı tam kontrol altına alın.", features: ["Nakit akışı takibi", "Çek/senet yönetimi", "Banka mutabakatı", "Otomatik finansal raporlar"], sectors: [{ name: "Finans", stars: 5, pct: 94 }, { name: "Üretim", stars: 4, pct: 80 }], badge: "Otomatik Raporlar" },
  unidox: { category: "Dijital Arşiv", leadership: "Kurumsal Belge Yönetiminde KVKK Uyumlu Lider Çözüm", description: "Kurumsal belge yönetimi, dijital arşiv ve iş akışı otomasyonuyla evrak süreçlerinizi sıfır kağıtla yönetin.", features: ["Belge yönetimi sistemi", "Dijital arşiv çözümleri", "İş akışı otomasyonu", "KVKK uyumlu"], sectors: [{ name: "Kamu & Kurumsal", stars: 5, pct: 96 }, { name: "Hizmet", stars: 4, pct: 82 }], badge: "KVKK Uyumlu" },
  varuna: { category: "Lojistik Yazılımı", leadership: "Tedarik Zinciri Yönetiminde Sektör Lideri", description: "Tedarikçi yönetimi, satınalma, lojistik planlama. Maliyetleri %25 düşürün.", features: ["Filo yönetimi sistemi", "Rota optimizasyonu", "Teslimat takibi", "Yakıt tasarruf raporu"], sectors: [{ name: "Lojistik", stars: 5, pct: 97 }, { name: "E-ticaret", stars: 4, pct: 78 }], badge: "Yakıt Tasarrufu" },
  enroute: { category: "Dağıtım Optimizasyonu", leadership: "Saha Ekip Verimliliğinde %40 Artış Sağlayan Platform", description: "Akıllı dağıtım planlaması ve gerçek zamanlı görev yönetimiyle saha ekiplerinizin verimliliğini maksimize edin.", features: ["Akıllı dağıtım planlaması", "Saha ekip yönetimi", "Gerçek zamanlı takip", "Performans analitiği"], sectors: [{ name: "Lojistik", stars: 5, pct: 95 }, { name: "Hizmet", stars: 4, pct: 80 }], badge: "%40 Daha Verimli" }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

// ─── Partner right panel (Premium) ────────────────────────────────────────────
const PartnerPanel = ({ piece }: {piece: typeof pieces[0];}) => {
  const d = partnerDetails[piece.id];
  if (!d) return null;

  // Stagger animation variants for children
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" as const } }
  };

  return (
    <motion.div
      className="flex flex-col"
      variants={container}
      initial="hidden"
      animate="show">

      {/* Category badge */}
      <motion.div variants={item} className="mb-5">
        <span
          className="inline-flex items-center px-4 py-1.5 rounded-full font-semibold tracking-widest uppercase"
          style={{
            fontSize: "11px",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1.5px solid hsl(var(--border))",
            letterSpacing: "0.1em"
          }}>

          {d.category}
        </span>
      </motion.div>

      {/* Partner logo — centered */}
      <motion.div variants={item} className="flex justify-center mb-5">
        <div
          className="flex items-center justify-center overflow-hidden rounded-2xl bg-white"
          style={{
            width: 100,
            height: 60,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.07)",
            padding: "10px 14px"
          }}>

          {(piece as any).logo ?
          <img
            src={(piece as any).logo}
            alt={piece.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} /> :


          <span
            className="font-black text-center"
            style={{ color: piece.color, fontSize: "18px", letterSpacing: "-0.02em" }}>

              {piece.name}
            </span>
          }
        </div>
      </motion.div>

      {/* Partner name — dark foreground */}
      <motion.div variants={item} className="text-center mb-1">
        <h3
          className="font-black"
          style={{
            fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "hsl(var(--foreground))"
          }}>

          {piece.name}
        </h3>
      </motion.div>

      {/* Category subtitle */}
      <motion.div variants={item} className="text-center mb-6">
        <p style={{ fontSize: "16px", fontWeight: 500, color: "hsl(var(--muted-foreground))" }}>
          {d.category}
        </p>
      </motion.div>

      {/* Leadership statement box */}
      <motion.div
        variants={item}
        className="mb-5 rounded-xl"
        style={{
          background: "hsl(var(--primary) / 0.06)",
          borderLeft: "4px solid hsl(var(--primary))",
          padding: "16px 20px"
        }}>

        <p
          className="font-semibold"
          style={{
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
            lineHeight: 1.4,
            color: "hsl(var(--primary))"
          }}>

          {d.leadership}
        </p>
      </motion.div>

      {/* Description */}
      <motion.div variants={item} className="mb-6">
        <p
          style={{
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: 1.65,
            color: "hsl(var(--muted-foreground))",
            letterSpacing: "0.01em",
            maxWidth: "520px"
          }}>

          {d.description}
        </p>
      </motion.div>

      {/* Features */}
      <motion.div variants={item} className="mb-6">
        <p
          className="uppercase tracking-widest font-semibold mb-3"
          style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))" }}>

          Özellikler
        </p>
        <div className="flex flex-col gap-2.5">
          {d.features.map((f) =>
          <div key={f} className="flex items-center gap-2.5">
              <Check
              style={{
                width: 15,
                height: 15,
                color: "hsl(var(--primary))",
                strokeWidth: 2.8,
                flexShrink: 0
              }} />

              <span style={{ fontSize: "15px", fontWeight: 500, color: "hsl(var(--foreground))" }}>
                {f}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Platform badge */}
      {d.badge &&
      <motion.div variants={item} className="mb-5">
          










        </motion.div>
      }

      {/* CTA button — dark navy */}
      <motion.div variants={item}>
        <Link to="/kobi/urunler" className="block">
          <motion.button
            whileHover={{
              scale: 1.02,
              translateY: -2,
              boxShadow: "0 8px 28px rgba(15,15,30,0.35), 0 16px 40px rgba(15,15,30,0.18)"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center justify-center gap-2 w-full font-bold text-white"
            style={{
              height: "50px",
              padding: "0 40px",
              borderRadius: "25px",
              fontSize: "16px",
              letterSpacing: "0.01em",
              background: "hsl(258, 45%, 10%)",
              boxShadow: "0 4px 14px rgba(15,15,30,0.22)"
            }}>

            {piece.name} Çözümünü İncele
            <ArrowRight style={{ width: 18, height: 18 }} />
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>);

};

// ─── Logo / text fitting inside a piece ──────────────────────────────────────
function LogoText({ piece, cx, cy }: {piece: typeof pieces[0];cx: number;cy: number;}) {
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
          preserveAspectRatio="xMidYMid meet" />

      </g>);

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
        style={{ userSelect: "none", pointerEvents: "none" }}>

        {line1}
      </text>
      {line2 &&
      <text
        x={cx} y={startY + lineH}
        textAnchor="middle" dominantBaseline="middle"
        fill="#1a1a2e"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontWeight="800"
        fontSize={fontSize}
        letterSpacing="-0.3"
        style={{ userSelect: "none", pointerEvents: "none" }}>

          {line2}
        </text>
      }
    </g>);

}

// ─── SVG Puzzle component ─────────────────────────────────────────────────────
function PuzzleBoard({
  selectedId,
  onSelect,
  visible




}: {selectedId: string | null;onSelect: (id: string) => void;visible: boolean;}) {
  const GAP = 3;
  const SVG_W = COLS * CW + (COLS - 1) * GAP; // 5*90 + 4*3 = 462
  const SVG_H = 4 * CH + (4 - 1) * GAP; // 4*75 + 3*3 = 309
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      width="100%"
      style={{ display: "block", overflow: "visible" }}
      aria-label="Partner ekosistemi puzzle">

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
              gradientUnits="userSpaceOnUse">

              <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
            </linearGradient>);

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

        const pathD = puzzlePath(px, py, piece.cs, piece.rs, piece.edges);
        const isSel = selectedId === piece.id;
        const isHov = hovered === piece.id;

        return (
          <motion.g
            key={piece.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={visible ? {
              opacity: 1,
              scale: 1,
              filter: isSel ? "drop-shadow(0 0 8px hsl(268,72%,55%))" : "none"
            } : { opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.22 },
              scale: { duration: 0.5, delay: 0.04 + i * 0.035, ease: [0.22, 1, 0.36, 1] }
            }}
            style={{ cursor: "pointer", transformOrigin: `${cx}px ${cy}px` }}
            onClick={() => onSelect(piece.id)}
            onMouseEnter={() => setHovered(piece.id)}
            onMouseLeave={() => setHovered(null)}>

            {/* Selected pop-out lift */}
            <motion.g
              animate={isSel ? { y: -5 } : { y: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}>

              {/* Main fill — white */}
              <path d={pathD} fill="#FFFFFF" />

              {/* Bevel gradient overlay */}
              <path d={pathD} fill={`url(#bevel-${piece.id})`} />

              {/* Inner shadow cutline (thin dark edge) */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="1.5" />


              {/* Hover / selected highlight ring */}
              {(isHov || isSel) &&
              <path
                d={pathD}
                fill="none"
                stroke={isSel ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)"}
                strokeWidth={isSel ? 2.5 : 1.5} />

              }

              {/* Selected outer glow ring */}
              {isSel &&
              <path
                d={pathD}
                fill="none"
                stroke="hsl(268,72%,52%)"
                strokeWidth="4"
                strokeOpacity="0.7"
                style={{ filter: "blur(2px)" }} />

              }

              {/* Top-left corner light (bevel highlight) */}
              <clipPath id={`clip-${piece.id}`}>
                <path d={pathD} />
              </clipPath>
              <rect
                x={px} y={py} width={pw} height={6}
                fill="rgba(255,255,255,0.18)"
                clipPath={`url(#clip-${piece.id})`} />

              <rect
                x={px} y={py} width={6} height={ph}
                fill="rgba(255,255,255,0.12)"
                clipPath={`url(#clip-${piece.id})`} />


              {/* White logo text */}
              <LogoText piece={piece} cx={cx} cy={cy} />
            </motion.g>

            {/* Tooltip */}
            <AnimatePresence>
              {isHov &&
              <motion.g
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                style={{ pointerEvents: "none" }}>

                  <rect
                  x={cx - 52} y={py - 38}
                  width={104} height={32}
                  rx={8}
                  fill="white"
                  style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.14))" }} />

                  <text
                  x={cx} y={py - 25}
                  textAnchor="middle"
                  fill="#1a1a2e"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="700"
                  fontSize="11"
                  style={{ pointerEvents: "none" }}>

                    {piece.name}
                  </text>
                  <text
                  x={cx} y={py - 12}
                  textAnchor="middle"
                  fill="#666"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="500"
                  fontSize="9"
                  style={{ pointerEvents: "none" }}>

                    {partnerDetails[piece.id]?.category}
                  </text>
                  {/* arrow */}
                  <polygon
                  points={`${cx - 5},${py - 6} ${cx + 5},${py - 6} ${cx},${py - 1}`}
                  fill="white" />

                </motion.g>
              }
            </AnimatePresence>
          </motion.g>);

      })}
    </svg>);

}

// ─── Main component ────────────────────────────────────────────────────────────
const PartnerEcosystemSection = () => {
  const [selectedId, setSelectedId] = useState<string | null>("param");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.06 });

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
      style={{ background: "#F8F9FF" }}>

      <div className="max-w-[1340px] mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10">

          <h2 className="font-black text-foreground mx-auto"
          style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", lineHeight: 1.1, letterSpacing: "-0.035em", maxWidth: "640px" }}>
            Güçlü Partner Ekosistemi
          </h2>
          <p className="text-muted-foreground mt-3 mx-auto"
          style={{ maxWidth: "460px", fontSize: "1rem", lineHeight: 1.7 }}>
            Sektör lideri sağlayıcılar tek platformda; inceleme ve teklif süreci tek merkezden.
          </p>
        </motion.div>

        {/* Unified container card */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "40px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.03)",
            maxWidth: "1400px",
            margin: "0 auto"
          }}>

          <div className="flex flex-col lg:flex-row items-stretch gap-8 xl:gap-10 h-full">

            {/* LEFT: SVG Puzzle */}
            <motion.div
              className="w-full lg:w-[46%] flex-shrink-0 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}>

              {/* Puzzle fills remaining space */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full">
                  <PuzzleBoard selectedId={selectedId} onSelect={handleSelect} visible={visible} />
                </div>
              </div>

            </motion.div>

            {/* Divider */}
            <div className="hidden lg:block w-px self-stretch" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent)" }} />

            {/* RIGHT: Dynamic content panel */}
            <div className="w-full lg:flex-1 flex flex-col">
              <motion.div
                className="flex-1 rounded-2xl p-7 flex flex-col justify-start"
                style={{
                  background: "linear-gradient(145deg, #ffffff 0%, hsl(252,60%,98%) 100%)",
                  border: "1px solid rgba(0,0,0,0.04)"
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}>

                <AnimatePresence mode="wait">
                  {selectedPiece &&
                  <motion.div key={selectedPiece.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}>
                      <PartnerPanel piece={selectedPiece} />
                    </motion.div>
                  }
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default PartnerEcosystemSection;