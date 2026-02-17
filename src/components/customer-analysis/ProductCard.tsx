import { useState } from "react";
import { Plus, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  sector: string;
  priority: "high" | "medium" | "low";
  matchScore: number;
  onAddToProposal: (product: Product) => void;
  onToggleCompare: (productId: string) => void;
  isComparing: boolean;
  isAdded: boolean;
}

const priorityConfig = {
  high: { label: "ÖNCELİK: YÜKSEK", color: "bg-success text-success-foreground", border: "border-l-success" },
  medium: { label: "ÖNCELİK: ORTA", color: "bg-info text-info-foreground", border: "border-l-info" },
  low: { label: "ÖNCELİK: DÜŞÜK", color: "bg-muted text-muted-foreground", border: "border-l-muted" },
};

const ProductCard = ({ product, sector, priority, matchScore, onAddToProposal, onToggleCompare, isComparing, isAdded }: Props) => {
  const [reasonsOpen, setReasonsOpen] = useState(false);
  const config = priorityConfig[priority];
  const sectorBenefit = product.sectorBenefits[sector] || product.description;
  const progressColor = priority === "high" ? "gradient-primary" : priority === "medium" ? "bg-info" : "bg-muted";

  const reasons = [
    { title: "Sektör dominansı", desc: `${sector} sektöründe %${matchScore} işletme bu tür ürünü kullanıyor`, sub: "En yaygın kullanılan çözüm" },
    ...(product.needsMatch.length > 0 ? [{ title: "İhtiyaç eşleşme", desc: `${product.needsMatch[0]} ihtiyacını karşılıyor`, sub: "Doğrudan ihtiyacı karşılıyor" }] : []),
    { title: "İşletme büyüklüğü uyumu", desc: `${product.idealSize.join(", ")} çalışanlı işletmeler için optimize`, sub: "En yüksek ROI bu büyüklükte" },
    { title: "Kanıtlanmış başarı", desc: `${sector} sektöründe ortalama %${Math.floor(matchScore * 0.45)} verimlilik artışı`, sub: "6 ay içinde geri ödeme" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card rounded-2xl shadow-card hover:shadow-premium transition-all duration-200 p-6 border-l-[6px] ${config.border}`}
      whileHover={{ scale: 1.005 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
        <Badge className="text-[10px]">{product.categoryLabel}</Badge>
      </div>

      {/* Priority & Sector Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${config.color}`}>
          {config.label}
        </span>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-premium">
          ✓ {sector} için ideal
        </span>
      </div>

      {/* Match Score */}
      <div className="mb-4">
        <span className="text-lg font-bold text-primary">Eşleşme: %{matchScore}</span>
        <div className="mt-1.5 h-3 bg-border rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${progressColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${matchScore}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Why Recommended - Accordion */}
      <div className="mb-4">
        <button
          onClick={() => setReasonsOpen(!reasonsOpen)}
          className={`text-sm font-medium ${priority === "medium" ? "text-info" : "text-primary"} hover:underline flex items-center gap-1`}
        >
          Neden öneriliyor? {reasonsOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
        <AnimatePresence>
          {reasonsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 bg-primary/5 rounded-lg p-4 space-y-3">
                {reasons.map((r, i) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-2"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{r.title}: <span className="font-normal">{r.desc}</span></p>
                      <p className="text-xs text-muted-foreground">{r.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Key Features */}
      <div className="mb-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Temel Özellikler</p>
        <div className="grid grid-cols-2 gap-1.5">
          {product.features.slice(0, 4).map(f => (
            <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="h-3 w-3 text-primary" /> {f}
            </div>
          ))}
        </div>
      </div>

      {/* Sector Benefit Box */}
      {priority === "high" && (
        <div className="mb-4 bg-success/90 rounded-xl p-4 shadow-card">
          <p className="text-[10px] font-bold text-success-foreground uppercase tracking-wider mb-1">SEKTÖRE ÖZEL FAYDA</p>
          <p className="text-sm text-success-foreground font-medium leading-relaxed">{sectorBenefit}</p>
        </div>
      )}

      {/* Pricing */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 border-primary text-foreground">
          Fiyat: {product.priceMonthly.toLocaleString("tr-TR")} ₺/ay
        </span>
        {product.platformDiscount && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-success text-success-foreground">
            + %{product.platformDiscount} platform indirimi
          </span>
        )}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-muted-foreground bg-muted">
          Kurulum: {product.setupDays} gün
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="outline" size="sm">Detaylı Bilgi</Button>
        <Button
          size="sm"
          onClick={() => onAddToProposal(product)}
          disabled={isAdded}
          className={isAdded ? "bg-success hover:bg-success" : ""}
        >
          {isAdded ? <><Check className="h-4 w-4" /> Eklendi</> : <><Plus className="h-4 w-4" /> Teklif Ekle</>}
        </Button>
        <label className="flex items-center gap-2 ml-auto cursor-pointer">
          <Checkbox
            checked={isComparing}
            onCheckedChange={() => onToggleCompare(product.id)}
            className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <span className="text-xs text-muted-foreground">Karşılaştır</span>
        </label>
      </div>
    </motion.div>
  );
};

export default ProductCard;
