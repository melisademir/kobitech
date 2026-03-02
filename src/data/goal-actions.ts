export interface ActionItem {
  id: string;
  text: string;
  helper: string;
}

export interface GoalPlan {
  key: string;
  name: string;
  icon: string;
  category: string;
  categoryColor: string;
  actions: ActionItem[];
  solutions: { name: string; link: string }[];
}

export const goalPlans: GoalPlan[] = [
  {
    key: "İhracat yapmak",
    name: "İhracat yapmak",
    icon: "🌍",
    category: "Global Aç",
    categoryColor: "hsl(217, 91%, 60%)",
    actions: [
      { id: "ihracat-1", text: "Yurt dışı şirket kuruluşunu başlat", helper: "Tahmini süre: 2 hafta" },
      { id: "ihracat-2", text: "Gümrük ve lojistik süreçlerini ayarla", helper: "Tahmini süre: 1 hafta" },
      { id: "ihracat-3", text: "Ürün kataloğunu yabancı dile çevir", helper: "Tahmini süre: 3 gün" },
      { id: "ihracat-4", text: "Uluslararası ödeme altyapısı kur", helper: "Tahmini süre: 1 hafta" },
      { id: "ihracat-5", text: "İhracat finansmanı temin et", helper: "Tahmini süre: 2 hafta" },
    ],
    solutions: [
      { name: "Global Kurulum Çözümü", link: "/digitalhub/urunler" },
      { name: "Uluslararası Lojistik", link: "/digitalhub/urunler" },
      { name: "Multi-currency Ödeme", link: "/digitalhub/urunler" },
    ],
  },
  {
    key: "Maliyetleri azaltmak",
    name: "Maliyetleri azaltmak",
    icon: "📉",
    category: "Teşviklerden Yararlan",
    categoryColor: "hsl(160, 84%, 39%)",
    actions: [
      { id: "maliyet-1", text: "Fire oranını analiz et ve raporla", helper: "Tahmini süre: 3 gün" },
      { id: "maliyet-2", text: "Ödeme süreçlerini otomatikleştir", helper: "Tahmini süre: 1 hafta" },
      { id: "maliyet-3", text: "Muhasebe otomasyonuna geç", helper: "Tahmini süre: 2 hafta" },
      { id: "maliyet-4", text: "Devlet teşvik ve desteklerini araştır", helper: "Tahmini süre: 1 hafta" },
      { id: "maliyet-5", text: "Operasyonel verimlilik analizi yap", helper: "Tahmini süre: 1 hafta" },
    ],
    solutions: [
      { name: "Muhasebe Otomasyon Çözümü", link: "/digitalhub/urunler" },
      { name: "Teşvik Danışmanlığı", link: "/digitalhub/urunler" },
      { name: "Verimlilik Analiz Aracı", link: "/digitalhub/urunler" },
    ],
  },
  {
    key: "Satışları artırmak",
    name: "Satışları artırmak",
    icon: "📈",
    category: "E-Ticarete Açıl",
    categoryColor: "hsl(268, 70%, 35%)",
    actions: [
      { id: "satis-1", text: "E-ticaret satış kanalı aç", helper: "Tahmini süre: 2 hafta" },
      { id: "satis-2", text: "Online ödeme sistemini kur", helper: "Tahmini süre: 1 hafta" },
      { id: "satis-3", text: "Dijital pazarlama stratejisi oluştur", helper: "Tahmini süre: 1 hafta" },
      { id: "satis-4", text: "Çoklu satış kanalı entegrasyonu yap", helper: "Tahmini süre: 2 hafta" },
      { id: "satis-5", text: "CRM sistemi kur", helper: "Tahmini süre: 2 hafta" },
      { id: "satis-6", text: "Satış ekibini güçlendir", helper: "Tahmini süre: 1 hafta" },
    ],
    solutions: [
      { name: "E-ticaret Platformu", link: "/digitalhub/urunler" },
      { name: "CRM Çözümü", link: "/digitalhub/urunler" },
      { name: "Dijital Pazarlama Aracı", link: "/digitalhub/urunler" },
    ],
  },
  {
    key: "E-ticarete geçmek",
    name: "E-ticarete geçmek",
    icon: "🛒",
    category: "E-Ticarete Açıl",
    categoryColor: "hsl(268, 70%, 35%)",
    actions: [
      { id: "eticaret-1", text: "E-ticaret platformu seç ve kur", helper: "Tahmini süre: 2 hafta" },
      { id: "eticaret-2", text: "Ürün fotoğrafları ve açıklamaları hazırla", helper: "Tahmini süre: 1 hafta" },
      { id: "eticaret-3", text: "Online ödeme sistemi entegre et", helper: "Tahmini süre: 1 hafta" },
      { id: "eticaret-4", text: "Kargo firmalarıyla anlaşma yap", helper: "Tahmini süre: 1 hafta" },
      { id: "eticaret-5", text: "Stok-site entegrasyonu sağla", helper: "Tahmini süre: 2 hafta" },
      { id: "eticaret-6", text: "SEO ve dijital pazarlamaya başla", helper: "Tahmini süre: 1 hafta" },
      { id: "eticaret-7", text: "Sosyal medya satış kanallarını aktive et", helper: "Tahmini süre: 3 gün" },
    ],
    solutions: [
      { name: "E-ticaret Altyapısı", link: "/digitalhub/urunler" },
      { name: "Online Ödeme Sistemi", link: "/digitalhub/urunler" },
      { name: "Kargo Entegrasyonu", link: "/digitalhub/urunler" },
      { name: "SEO Aracı", link: "/digitalhub/urunler" },
    ],
  },
  {
    key: "Operasyonları otomatikleştirmek",
    name: "Operasyonları otomatikleştirmek",
    icon: "⚙️",
    category: "İşlerini Yönet",
    categoryColor: "hsl(33, 100%, 57%)",
    actions: [
      { id: "otomasyon-1", text: "ERP sistemi seç ve kuruluma başla", helper: "Tahmini süre: 3 hafta" },
      { id: "otomasyon-2", text: "Stok yönetimini otomatikleştir", helper: "Tahmini süre: 2 hafta" },
      { id: "otomasyon-3", text: "Muhasebe süreçlerini dijitalleştir", helper: "Tahmini süre: 2 hafta" },
      { id: "otomasyon-4", text: "Ödeme işlemlerini otomatize et", helper: "Tahmini süre: 1 hafta" },
      { id: "otomasyon-5", text: "Fatura-tahsilat otomasyonu kur", helper: "Tahmini süre: 1 hafta" },
      { id: "otomasyon-6", text: "Döküman yönetimini dijitalleştir", helper: "Tahmini süre: 1 hafta" },
      { id: "otomasyon-7", text: "Raporlama dashboard'larını oluştur", helper: "Tahmini süre: 1 hafta" },
    ],
    solutions: [
      { name: "ERP Çözümü", link: "/digitalhub/urunler" },
      { name: "Fatura Otomasyon Sistemi", link: "/digitalhub/urunler" },
      { name: "Raporlama Aracı", link: "/digitalhub/urunler" },
    ],
  },
  {
    key: "Ekibi büyütmek",
    name: "Ekibi büyütmek",
    icon: "👥",
    category: "Ekibini Güçlendir",
    categoryColor: "hsl(280, 60%, 50%)",
    actions: [
      { id: "ekip-1", text: "İş ilanlarını yayınla", helper: "Tahmini süre: 2 gün" },
      { id: "ekip-2", text: "İK yönetim sistemi kur", helper: "Tahmini süre: 2 hafta" },
      { id: "ekip-3", text: "İşe alım süreçlerini dijitalleştir", helper: "Tahmini süre: 1 hafta" },
      { id: "ekip-4", text: "Çalışan eğitim programları başlat", helper: "Tahmini süre: 2 hafta" },
      { id: "ekip-5", text: "Performans değerlendirme sistemi kur", helper: "Tahmini süre: 2 hafta" },
      { id: "ekip-6", text: "Organizasyon şemasını netleştir", helper: "Tahmini süre: 3 gün" },
    ],
    solutions: [
      { name: "İK Yönetim Platformu", link: "/digitalhub/urunler" },
      { name: "Eğitim Portalı", link: "/digitalhub/urunler" },
      { name: "Performans Takip Aracı", link: "/digitalhub/urunler" },
    ],
  },
  {
    key: "Ödeme süreçleri",
    name: "Ödeme süreçlerini iyileştirmek",
    icon: "💳",
    category: "Ödeme Al",
    categoryColor: "hsl(0, 84%, 60%)",
    actions: [
      { id: "odeme-1", text: "Fiziksel POS sistemi kur", helper: "Tahmini süre: 3 gün" },
      { id: "odeme-2", text: "Online ödeme altyapısı oluştur", helper: "Tahmini süre: 1 hafta" },
      { id: "odeme-3", text: "Mobil ödeme çözümünü entegre et", helper: "Tahmini süre: 1 hafta" },
      { id: "odeme-4", text: "Ödeme mutabakatı otomasyonu", helper: "Tahmini süre: 1 hafta" },
      { id: "odeme-5", text: "Taksit ve kampanya yönetimi başlat", helper: "Tahmini süre: 3 gün" },
      { id: "odeme-6", text: "Ödeme raporlama sistemini kur", helper: "Tahmini süre: 1 hafta" },
    ],
    solutions: [
      { name: "POS Çözümü", link: "/digitalhub/urunler" },
      { name: "Online Ödeme Altyapısı", link: "/digitalhub/urunler" },
      { name: "Mobil Ödeme Sistemi", link: "/digitalhub/urunler" },
    ],
  },
  {
    key: "Stok/Lojistik",
    name: "Stok/Lojistik yönetimi",
    icon: "📦",
    category: "Stoğunu Kontrol Et",
    categoryColor: "hsl(200, 70%, 50%)",
    actions: [
      { id: "stok-1", text: "Stok yönetim sistemi kur", helper: "Tahmini süre: 2 hafta" },
      { id: "stok-2", text: "FIFO/LIFO takibini başlat", helper: "Tahmini süre: 1 hafta" },
      { id: "stok-3", text: "Depo yönetimini dijitalleştir", helper: "Tahmini süre: 2 hafta" },
      { id: "stok-4", text: "Tedarik zinciri optimizasyonu yap", helper: "Tahmini süre: 2 hafta" },
      { id: "stok-5", text: "Rota planlama sistemi kur", helper: "Tahmini süre: 1 hafta" },
      { id: "stok-6", text: "Min-max stok uyarıları aktive et", helper: "Tahmini süre: 3 gün" },
      { id: "stok-7", text: "Fire analizi ve raporlama başlat", helper: "Tahmini süre: 1 hafta" },
    ],
    solutions: [
      { name: "Stok Yönetim Sistemi", link: "/digitalhub/urunler" },
      { name: "Depo Yönetim Çözümü", link: "/digitalhub/urunler" },
      { name: "Lojistik Optimizasyon Aracı", link: "/digitalhub/urunler" },
    ],
  },
  {
    key: "Diğer",
    name: "Diğer / Bilmiyorum",
    icon: "✨",
    category: "Kendini Koru",
    categoryColor: "hsl(168, 76%, 42%)",
    actions: [
      { id: "diger-1", text: "Dijital olgunluk seviyeni ölç", helper: "Tahmini süre: 1 gün" },
      { id: "diger-2", text: "Sektör best practice'lerini öğren", helper: "Tahmini süre: 3 gün" },
      { id: "diger-3", text: "Öncelikli alanları belirle", helper: "Tahmini süre: 2 gün" },
      { id: "diger-4", text: "Pilot proje seç ve başla", helper: "Tahmini süre: 1 hafta" },
    ],
    solutions: [
      { name: "Dijital Olgunluk Analizi", link: "/digitalhub/urunler" },
      { name: "Danışmanlık Hizmeti", link: "/digitalhub/urunler" },
    ],
  },
];

export const allGoals = [
  { name: "İhracat yapmak", icon: "🌍" },
  { name: "Maliyetleri azaltmak", icon: "📉" },
  { name: "Satışları artırmak", icon: "📈" },
  { name: "E-ticarete geçmek", icon: "🛒" },
  { name: "Operasyonları otomatikleştirmek", icon: "⚙️" },
  { name: "Ekibi büyütmek", icon: "👥" },
  { name: "Ödeme süreçleri", icon: "💳" },
  { name: "Stok/Lojistik", icon: "📦" },
  { name: "Diğer", icon: "✨" },
];
