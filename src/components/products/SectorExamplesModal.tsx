import { useState } from "react";
import { X, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { CatalogProduct } from "@/data/catalog-products";

interface Props {
  product: CatalogProduct;
  onClose: () => void;
}

const SectorExamplesModal = ({ product, onClose }: Props) => {
  const sectorKeys = Object.keys(product.sectorBenefits);
  const highAffinitySectors = product.topSectors.filter(s => s.score >= 80);
  const displaySectors = sectorKeys.length > 0 ? sectorKeys : highAffinitySectors.map(s => s.name);
  const [activeTab, setActiveTab] = useState(displaySectors[0] || "");

  const getSectorScore = (name: string) => product.topSectors.find(s => s.name === name)?.score || 0;

  if (displaySectors.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="fixed inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-2xl bg-card rounded-2xl shadow-premium-hover p-8 text-center"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="h-6 w-6" />
          </button>
          <p className="text-5xl mb-4">📊</p>
          <h2 className="text-xl font-bold text-foreground mb-2">{product.name} - Sektörel Örnekler</h2>
          <p className="text-muted-foreground">Bu ürün için henüz sektörel kullanım örnekleri eklenmemiştir.</p>
        </motion.div>
      </div>
    );
  }

  const currentBenefits = product.sectorBenefits[activeTab];
  const score = getSectorScore(activeTab);
  const stars = score >= 90 ? 5 : score >= 75 ? 4 : 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-4xl bg-card rounded-2xl shadow-premium-hover overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 py-5 border-b border-border flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-foreground">{product.name} - Sektörel Kullanım Örnekleri</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-6 w-6" /></button>
        </div>

        {/* Sector tabs */}
        <div className="flex border-b border-border overflow-x-auto shrink-0">
          {displaySectors.map(s => (
            <button
              key={s}
              onClick={() => setActiveTab(s)}
              className={`px-5 py-3 text-sm font-bold whitespace-nowrap border-b-[3px] transition-colors ${
                activeTab === s ? "border-b-primary text-primary" : "border-b-transparent text-muted-foreground hover:bg-primary/5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 p-7 space-y-6">
          {/* Hero */}
          <div className="gradient-primary rounded-xl p-6 text-primary-foreground">
            <h3 className="text-xl font-bold">{activeTab} Sektöründe {product.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className={`h-5 w-5 ${i <= stars ? "fill-white text-white" : "text-white/30"}`} />
                ))}
              </div>
              <span className="text-sm font-bold">%{score} Çok Uygun</span>
            </div>
          </div>

          {/* Usage bullets */}
          {currentBenefits && (
            <div>
              <h4 className="font-bold text-foreground mb-4">Nasıl Kullanılıyor?</h4>
              <div className="space-y-3">
                {currentBenefits.bullets.map(b => (
                  <div key={b.title} className="flex gap-3">
                    <span className="text-2xl">{b.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">{b.title}</p>
                      <p className="text-muted-foreground text-xs">{b.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success story */}
          {currentBenefits?.successStory && (
            <div>
              <h4 className="font-bold text-foreground mb-3">Başarı Hikayesi</h4>
              <div className="border-l-4 border-success bg-success/5 rounded-r-xl p-5">
                <p className="font-bold text-foreground">{currentBenefits.successStory.company} - {activeTab}</p>
                <p className="text-success font-bold text-lg mt-1">{currentBenefits.successStory.result}</p>
                <p className="text-muted-foreground text-sm mt-2">{currentBenefits.successStory.description}</p>
                {currentBenefits.successStory.quote && (
                  <p className="text-muted-foreground text-sm italic mt-3 border-l-2 border-border pl-3">
                    "{currentBenefits.successStory.quote}"
                  </p>
                )}
                <div className="flex gap-3 mt-4">
                  {currentBenefits.successStory.metrics.map(m => (
                    <span key={m.label} className="bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-lg">
                      {m.label}: {m.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Average metrics */}
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-5">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Ortalama Metrikler</p>
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-sm text-foreground">Ortalama ROI süresi:</span> <span className="font-bold text-foreground">6 ay</span></div>
              <div><span className="text-sm text-foreground">Verimlilik artışı:</span> <span className="font-bold text-success">%40</span></div>
              <div><span className="text-sm text-foreground">Müşteri memnuniyeti:</span> <span className="font-bold text-accent">{product.rating}/5 ⭐</span></div>
              <div><span className="text-sm text-foreground">Aktif kullanıcı oranı:</span> <span className="font-bold text-foreground">%96</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectorExamplesModal;
