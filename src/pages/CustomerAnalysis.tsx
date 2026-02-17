import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { products, type Product } from "@/data/products";
import { getBundlesForSector, type Bundle } from "@/data/bundles";
import { sectorInsights, filterCategories } from "@/data/sectors";
import CustomerForm, { type CustomerProfile } from "@/components/customer-analysis/CustomerForm";
import ProductCard from "@/components/customer-analysis/ProductCard";
import BundleCard from "@/components/customer-analysis/BundleCard";
import ComparisonModal from "@/components/customer-analysis/ComparisonModal";
import StickyProposalBar from "@/components/customer-analysis/StickyProposalBar";
import { Badge } from "@/components/ui/badge";

const CustomerAnalysis = () => {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [proposalProducts, setProposalProducts] = useState<Product[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [otherExpanded, setOtherExpanded] = useState(false);
  const [barVisible, setBarVisible] = useState(true);
  const rightRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (p: CustomerProfile) => {
    setLoading(true);
    localStorage.setItem("proposal_customer", JSON.stringify({
      companyName: p.companyName, sector: p.sector, employeeSize: p.employeeSize,
      city: p.city, contactPerson: p.contactName, email: p.contactEmail, phone: p.contactPhone,
    }));
    setTimeout(() => {
      setProfile(p);
      setHasResults(true);
      setLoading(false);
      rightRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1000);
  };

  const addToProposal = (product: Product) => {
    if (!proposalProducts.find(p => p.id === product.id)) {
      setProposalProducts(prev => [...prev, product]);
      setBarVisible(true);
      toast({ title: `Teklife eklendi ✓ ${product.name}`, duration: 2000 });
    }
  };

  const addBundle = (bundle: Bundle) => {
    const newProducts = bundle.productIds
      .map(id => products.find(p => p.id === id)!)
      .filter(p => p && !proposalProducts.find(pp => pp.id === p.id));
    setProposalProducts(prev => [...prev, ...newProducts]);
    setBarVisible(true);
  };

  const toggleCompare = (id: string) => {
    setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  const scored = useMemo(() => {
    if (!profile) return [];
    return products
      .map(p => {
        const sectorScore = p.sectorMatch[profile.sector] || 30;
        const needScore = profile.needs.filter(n => p.needsMatch.includes(n)).length * 10;
        const sizeScore = p.idealSize.includes(profile.employeeSize) ? 10 : 0;
        const systemBonus = profile.existingSystems.includes("Hiçbiri yok") ? 5 : 0;
        const total = Math.min(sectorScore + needScore + sizeScore + systemBonus, 99);
        return { product: p, score: total };
      })
      .sort((a, b) => b.score - a.score);
  }, [profile]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return scored;
    const catMap: Record<string, string[]> = {
      odeme: ["odeme"], finansman: ["finansman"], muhasebe: ["muhasebe"],
      erp: ["erp", "uretim", "proje"], eticaret: ["eticaret"],
      diger: ["stok", "lojistik", "destek", "dokuman", "tedarik"],
    };
    const cats = catMap[activeFilter] || [];
    return scored.filter(s => cats.includes(s.product.category));
  }, [scored, activeFilter]);

  const high = filtered.filter(s => s.score >= 85);
  const medium = filtered.filter(s => s.score >= 60 && s.score < 85);
  const low = filtered.filter(s => s.score < 60);

  const bundles = profile ? getBundlesForSector(profile.sector) : [];
  const insight = profile ? sectorInsights[profile.sector] : null;
  const compareProducts = compareIds.map(id => products.find(p => p.id === id)!).filter(Boolean);
  const addedIds = proposalProducts.map(p => p.id);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-muted-foreground mb-2">
            <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>
            <span className="mx-2">&gt;</span>
            <span>Müşteri Analizi</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Müşteri Analizi</h1>
          <p className="text-muted-foreground mt-1">Müşteriniz hakkında bilgi vererek en uygun Param ürünlerini keşfedin</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[35%] shrink-0">
            <CustomerForm onSubmit={handleSubmit} hasResults={hasResults} loading={loading} />
          </div>

          <div ref={rightRef} className="flex-1 min-w-0">
            {!hasResults ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-[100px] opacity-20 mb-4">🎯</span>
                <h2 className="text-xl font-bold text-muted-foreground mb-2">Müşteri Bilgilerini Girerek Başlayın</h2>
                <p className="text-muted-foreground max-w-md">
                  Sol taraftan müşteri bilgilerini girin. Size sektör ve ihtiyaç bazlı en uygun Param ürünlerini önereceğiz.
                </p>
                <p className="text-sm text-muted-foreground mt-6">Ortalama analiz süresi: 2 saniye ⚡</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    <span className="text-primary">{profile?.sector?.toUpperCase()}</span> Sektörü için Param Ürün Önerileri
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">Müşteri profili ve ihtiyaçlarına göre akıllı öneriler</p>
                </div>

                {insight && (
                  <div className="gradient-primary rounded-xl p-5 flex gap-4 items-start">
                    <span className="text-4xl">{insight.icon}</span>
                    <div>
                      <p className="text-primary-foreground font-bold text-lg">{profile?.sector} Sektörü İçgörüleri</p>
                      <p className="text-primary-foreground/90 mt-1">{insight.insight}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {filterCategories.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        activeFilter === f.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-primary border-2 border-primary/30 hover:border-primary"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {compareIds.length >= 2 && (
                  <div className="bg-card border-2 border-primary rounded-xl p-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{compareIds.length} ürün karşılaştırma için seçildi</p>
                    <button
                      onClick={() => setShowComparison(true)}
                      className="px-4 py-2 rounded-lg border-2 border-primary text-primary text-sm font-bold hover:bg-primary/5"
                    >
                      Karşılaştır
                    </button>
                  </div>
                )}

                {bundles.length > 0 && activeFilter === "all" && (
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">💼 Hazır Paketler</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>{profile?.sector}</strong> sektörü için önceden hazırlanmış çözüm paketleri
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {bundles.map(b => <BundleCard key={b.id} bundle={b} onAddBundle={addBundle} />)}
                    </div>
                  </div>
                )}

                {bundles.length > 0 && activeFilter === "all" && (
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center"><span className="bg-background px-4 text-sm text-muted-foreground">veya bireysel ürünleri inceleyin</span></div>
                  </div>
                )}

                {high.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-success mb-1">⭐ Yükseklikle Önerilen</h3>
                    <p className="text-sm text-muted-foreground mb-4">Müşterinin sektörü ve ihtiyaçları için en uygun çözümler</p>
                    <div className="space-y-4">
                      {high.map(s => (
                        <ProductCard
                          key={s.product.id}
                          product={s.product}
                          sector={profile!.sector}
                          priority="high"
                          matchScore={s.score}
                          onAddToProposal={addToProposal}
                          onToggleCompare={toggleCompare}
                          isComparing={compareIds.includes(s.product.id)}
                          isAdded={addedIds.includes(s.product.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {medium.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-info mb-1">📘 Önerilen</h3>
                    <p className="text-sm text-muted-foreground mb-4">Müşteri için faydalı olabilecek ek çözümler</p>
                    <div className="space-y-4">
                      {medium.map(s => (
                        <ProductCard
                          key={s.product.id}
                          product={s.product}
                          sector={profile!.sector}
                          priority="medium"
                          matchScore={s.score}
                          onAddToProposal={addToProposal}
                          onToggleCompare={toggleCompare}
                          isComparing={compareIds.includes(s.product.id)}
                          isAdded={addedIds.includes(s.product.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {low.length > 0 && (
                  <div>
                    <button
                      onClick={() => setOtherExpanded(!otherExpanded)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary font-bold transition-colors"
                    >
                      📂 Diğer Param Ürünleri ({low.length} ürün)
                      {otherExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    <p className="text-xs text-muted-foreground mt-1">Düşük eşleşme - ihtiyaç halinde inceleyebilirsiniz</p>

                    <AnimatePresence>
                      {otherExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4 space-y-3"
                        >
                          {low.map(s => (
                            <div key={s.product.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between gap-4">
                              <div className="min-w-0">
                                <p className="font-medium text-muted-foreground">{s.product.name}</p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline" className="text-[10px]">{s.product.categoryLabel}</Badge>
                                  <span className="text-xs text-muted-foreground">%{s.score}</span>
                                </div>
                              </div>
                              <button className="text-xs text-primary hover:underline font-medium shrink-0">Detay</button>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <StickyProposalBar
        products={proposalProducts}
        onClear={() => { setProposalProducts([]); setBarVisible(true); }}
        visible={barVisible}
        onClose={() => setBarVisible(false)}
      />

      {showComparison && compareProducts.length >= 2 && (
        <ComparisonModal
          products={compareProducts}
          sector={profile?.sector || ""}
          onClose={() => setShowComparison(false)}
          onAddToProposal={addToProposal}
          addedIds={addedIds}
        />
      )}
    </div>
  );
};

export default CustomerAnalysis;
