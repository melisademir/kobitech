export interface Bundle {
  id: string;
  name: string;
  sector: string;
  tier: string;
  productIds: string[];
  productNames: string[];
  discount: number;
  priceMonthly: number;
  normalPrice: number;
}

export const bundles: Bundle[] = [
  // PERAKENDE
  { id: "perakende-baslangic", name: "Perakende Başlangıç", sector: "Perakende", tier: "Başlangıç", productIds: ["param-pos", "univera-stokbar", "finrota-netahsilat"], productNames: ["Param POS", "Univera Stokbar", "Finrota Netahsilat"], discount: 10, priceMonthly: 7650, normalPrice: 8500 },
  { id: "perakende-pro", name: "Perakende Pro", sector: "Perakende", tier: "Pro", productIds: ["param-pos", "param-kart", "univera-stokbar", "nebim-v3", "finrota-netahsilat"], productNames: ["Param POS", "Param Kart", "Univera Stokbar", "Nebim V3", "Finrota Netahsilat"], discount: 15, priceMonthly: 12070, normalPrice: 14200 },
  // TEKSTİL
  { id: "tekstil-baslangic", name: "Tekstil Başlangıç", sector: "Tekstil", tier: "Başlangıç", productIds: ["nebim-v3", "univera-stokbar", "finrota-netahsilat"], productNames: ["Nebim V3", "Univera Stokbar", "Finrota Netahsilat"], discount: 10, priceMonthly: 5850, normalPrice: 6500 },
  { id: "tekstil-uretim", name: "Tekstil Üretim Paketi", sector: "Tekstil", tier: "Üretim", productIds: ["nebim-era", "univera-stokbar", "univera-varuna", "finrota-netahsilat", "kredim-business"], productNames: ["Nebim Era", "Univera Stokbar", "Univera Varuna", "Finrota Netahsilat", "Kredim Business"], discount: 15, priceMonthly: 14280, normalPrice: 16800 },
  // ÜRETİM
  { id: "uretim-temel", name: "Üretim Temel", sector: "Üretim", tier: "Temel", productIds: ["nebim-era", "univera-stokbar", "finrota-netahsilat"], productNames: ["Nebim Era", "Univera Stokbar", "Finrota Netahsilat"], discount: 10, priceMonthly: 10080, normalPrice: 11200 },
  { id: "uretim-tam", name: "Üretim Tam Çözüm", sector: "Üretim", tier: "Tam Çözüm", productIds: ["nebim-era", "univera-varuna", "univera-stokbar", "finrota-netahsilat", "kredim-business"], productNames: ["Nebim Era", "Univera Varuna", "Univera Stokbar", "Finrota Netahsilat", "Kredim Business"], discount: 15, priceMonthly: 16575, normalPrice: 19500 },
  // E-TİCARET
  { id: "eticaret-baslangic", name: "E-ticaret Başlangıç", sector: "E-ticaret", tier: "Başlangıç", productIds: ["web-plus", "param-kart", "finrota-netahsilat"], productNames: ["Web Plus", "Param Kart", "Finrota Netahsilat"], discount: 10, priceMonthly: 5220, normalPrice: 5800 },
  { id: "eticaret-buyume", name: "E-ticaret Büyüme", sector: "E-ticaret", tier: "Büyüme", productIds: ["web-plus", "param-kart", "param-mobil", "univera-stokbar", "nebim-v3"], productNames: ["Web Plus", "Param Kart", "Param Mobil", "Univera Stokbar", "Nebim V3"], discount: 15, priceMonthly: 10625, normalPrice: 12500 },
  // GIDA
  { id: "gida-baslangic", name: "Gıda Başlangıç", sector: "Gıda", tier: "Başlangıç", productIds: ["univera-stokbar", "param-pos", "finrota-netahsilat"], productNames: ["Univera Stokbar", "Param POS", "Finrota Netahsilat"], discount: 10, priceMonthly: 4950, normalPrice: 5500 },
  { id: "gida-pro", name: "Gıda Pro", sector: "Gıda", tier: "Pro", productIds: ["univera-stokbar", "param-pos", "nebim-v3", "finrota-netahsilat", "univera-varuna"], productNames: ["Univera Stokbar", "Param POS", "Nebim V3", "Finrota Netahsilat", "Univera Varuna"], discount: 15, priceMonthly: 12750, normalPrice: 15000 },
  // LOJİSTİK
  { id: "lojistik-baslangic", name: "Lojistik Temel", sector: "Lojistik", tier: "Temel", productIds: ["univera-enroute", "param-mobil", "finrota-netahsilat"], productNames: ["Univera Enroute", "Param Mobil", "Finrota Netahsilat"], discount: 10, priceMonthly: 4725, normalPrice: 5250 },
  // İNŞAAT
  { id: "insaat-baslangic", name: "İnşaat Proje Paketi", sector: "İnşaat", tier: "Proje", productIds: ["univera-quest", "univera-stokbar", "finrota-netahsilat"], productNames: ["Univera Quest", "Univera Stokbar", "Finrota Netahsilat"], discount: 10, priceMonthly: 6210, normalPrice: 6900 },
  // HİZMET
  { id: "hizmet-baslangic", name: "Hizmet Başlangıç", sector: "Hizmet", tier: "Başlangıç", productIds: ["finrota-netahsilat", "param-cagri", "param-dms"], productNames: ["Finrota Netahsilat", "Param Çağrı Merkezi", "Param DMS"], discount: 10, priceMonthly: 4230, normalPrice: 4700 },
  // RESTORAN
  { id: "restoran-baslangic", name: "Restoran Başlangıç", sector: "Restoran/Kafe", tier: "Başlangıç", productIds: ["param-pos", "univera-stokbar", "finrota-netahsilat"], productNames: ["Param POS", "Univera Stokbar", "Finrota Netahsilat"], discount: 10, priceMonthly: 4950, normalPrice: 5500 },
];

export function getBundlesForSector(sector: string): Bundle[] {
  return bundles.filter((b) => b.sector === sector);
}
