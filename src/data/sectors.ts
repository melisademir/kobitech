export interface SectorInsight {
  sector: string;
  icon: string;
  insight: string;
  stat: string;
}

export const sectorInsights: Record<string, SectorInsight> = {
  Tekstil: { sector: "Tekstil", icon: "🧵", insight: "Tekstil sektöründeki işletmelerin %92'si ERP sistemi kullanıyor. Üretim verimliliği için kritik.", stat: "%92" },
  Perakende: { sector: "Perakende", icon: "🛒", insight: "Perakende sektöründeki işletmelerin %85'i POS sistemi kullanıyor. Hızlı kasa = mutlu müşteri.", stat: "%85" },
  "E-ticaret": { sector: "E-ticaret", icon: "🌐", insight: "E-ticaret sektöründeki işletmelerin %95'i ödeme entegrasyonu kullanıyor. Online satış için şart.", stat: "%95" },
  Üretim: { sector: "Üretim", icon: "🏭", insight: "Üretim sektöründeki işletmelerin %88'i stok yönetimi kullanıyor. Fire azaltımı için kritik.", stat: "%88" },
  Gıda: { sector: "Gıda", icon: "🍽️", insight: "Gıda sektöründeki işletmelerin %90'ı FIFO takipli stok kullanıyor. Gıda güvenliği standartı.", stat: "%90" },
  "Restoran/Kafe": { sector: "Restoran/Kafe", icon: "☕", insight: "Restoran sektöründeki işletmelerin %92'si POS sistemi kullanıyor. Masa yönetimi entegre olmalı.", stat: "%92" },
  Lojistik: { sector: "Lojistik", icon: "🚛", insight: "Lojistik sektöründeki işletmelerin %87'si rota optimizasyonu kullanıyor. Yakıt tasarrufu %25'e ulaşıyor.", stat: "%87" },
  Hizmet: { sector: "Hizmet", icon: "💼", insight: "Hizmet sektöründeki işletmelerin %82'si CRM ve tahsilat sistemi kullanıyor. Müşteri takibi kritik.", stat: "%82" },
  Sağlık: { sector: "Sağlık", icon: "🏥", insight: "Sağlık sektöründeki işletmelerin %88'i döküman yönetimi kullanıyor. Hasta kayıtları dijital olmalı.", stat: "%88" },
  Eğitim: { sector: "Eğitim", icon: "📚", insight: "Eğitim sektöründeki işletmelerin %75'i dijital döküman yönetimi kullanıyor. Öğrenci takibi kritik.", stat: "%75" },
  İnşaat: { sector: "İnşaat", icon: "🏗️", insight: "İnşaat sektöründeki işletmelerin %85'i proje yönetim sistemi kullanıyor. Hakediş takibi şart.", stat: "%85" },
  Turizm: { sector: "Turizm", icon: "✈️", insight: "Turizm sektöründeki işletmelerin %80'i rezervasyon ve ödeme sistemi kullanıyor.", stat: "%80" },
  Otomotiv: { sector: "Otomotiv", icon: "🚗", insight: "Otomotiv sektöründeki işletmelerin %86'sı ERP ve tedarik zinciri yönetimi kullanıyor.", stat: "%86" },
  Teknoloji: { sector: "Teknoloji", icon: "💻", insight: "Teknoloji sektöründeki işletmelerin %90'ı CRM ve proje yönetimi kullanıyor.", stat: "%90" },
  Danışmanlık: { sector: "Danışmanlık", icon: "📊", insight: "Danışmanlık sektöründeki işletmelerin %85'i döküman ve sözleşme yönetimi kullanıyor.", stat: "%85" },
  Diğer: { sector: "Diğer", icon: "📦", insight: "İşletmenizin ihtiyaçlarına göre en uygun çözümleri sunuyoruz.", stat: "%80" },
};

export const sectorIcons: Record<string, string> = {
  Perakende: "🛒", Üretim: "🏭", Gıda: "🍽️", Tekstil: "🧵", "E-ticaret": "🌐",
  Hizmet: "💼", Sağlık: "🏥", Eğitim: "📚", İnşaat: "🏗️", Lojistik: "🚛",
  Turizm: "✈️", "Restoran/Kafe": "☕", Otomotiv: "🚗", Teknoloji: "💻",
  Danışmanlık: "📊", Diğer: "📦",
};

export const sectorList = [
  "Perakende", "Üretim", "Gıda", "Tekstil", "E-ticaret", "Hizmet",
  "Sağlık", "Eğitim", "İnşaat", "Lojistik", "Turizm", "Restoran/Kafe",
  "Otomotiv", "Teknoloji", "Danışmanlık", "Diğer",
];

export const needsList = [
  "Ödeme sistemleri (POS, kart, mobil)",
  "E-ticaret altyapısı (web, online satış)",
  "Muhasebe çözümleri (fatura, tahsilat)",
  "Stok yönetimi (envanter, depo)",
  "Üretim planlaması (üretim, kalite)",
  "Satış noktası yönetimi (mağaza, şube)",
  "Finansman (kredi, sermaye)",
  "Çağrı merkezi (müşteri hizmetleri)",
  "Döküman yönetimi (arşiv, belge)",
  "ERP sistemi (entegre yönetim)",
  "Rota/Filo yönetimi (lojistik)",
  "Tedarik zinciri (tedarikçi yönetimi)",
];

export const existingSystemsList = [
  "Muhasebe yazılımı var",
  "POS sistemi var",
  "Stok sistemi var",
  "E-ticaret sitesi var",
  "ERP sistemi var",
  "CRM sistemi var",
  "Ödeme altyapısı var",
  "Hiçbiri yok",
];

export const employeeSizes = [
  "1-5 kişi", "6-10 kişi", "11-25 kişi", "26-50 kişi", "51-100 kişi", "100+ kişi",
];

export const turkishCities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep",
  "Mersin", "Diyarbakır", "Kayseri", "Eskişehir", "Samsun", "Denizli", "Trabzon",
  "Malatya", "Sakarya", "Manisa", "Balıkesir", "Kocaeli",
];

export const filterCategories = [
  { id: "all", label: "Tümü" },
  { id: "odeme", label: "Ödeme Çözümleri" },
  { id: "finansman", label: "Finansman" },
  { id: "muhasebe", label: "Muhasebe & Finans" },
  { id: "erp", label: "ERP & İşletme" },
  { id: "eticaret", label: "E-ticaret" },
  { id: "diger", label: "Diğer" },
];
