import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { featureFlagLabels } from "@/data/products";

interface Props {
  products: Product[];
  sector: string;
  onClose: () => void;
  onAddToProposal: (product: Product) => void;
  addedIds: string[];
}

const ComparisonModal = ({ products, sector, onClose, onAddToProposal, addedIds }: Props) => {
  const featureKeys = Object.keys(featureFlagLabels);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-card rounded-2xl shadow-premium-hover max-w-4xl w-full max-h-[85vh] overflow-auto"
      >
        <div className="sticky top-0 bg-card z-10 flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Ürün Karşılaştırma</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-6 w-6" /></button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-background border-b-[3px] border-primary">
                <th className="p-4 text-left text-sm font-bold text-muted-foreground w-40">Özellik</th>
                {products.map(p => (
                  <th key={p.id} className="p-4 text-center">
                    <p className="font-bold text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.categoryLabel}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Sector Match */}
              <tr className="bg-primary/5">
                <td className="p-4 text-sm font-bold text-foreground">Sektör Uyumu ({sector})</td>
                {products.map(p => {
                  const score = p.sectorMatch[sector] || 0;
                  return (
                    <td key={p.id} className="p-4 text-center">
                      <p className="font-bold text-primary text-lg">%{score}</p>
                      <div className="h-2 bg-border rounded-full mt-1 mx-auto w-24">
                        <div className="h-full gradient-primary rounded-full" style={{ width: `${score}%` }} />
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Price */}
              <tr>
                <td className="p-4 text-sm font-semibold text-foreground">Fiyat (Aylık)</td>
                {products.map(p => (
                  <td key={p.id} className="p-4 text-center font-bold text-foreground">{p.priceMonthly.toLocaleString("tr-TR")} ₺</td>
                ))}
              </tr>
              <tr className="bg-background">
                <td className="p-4 text-sm font-semibold text-foreground">Fiyat (Yıllık)</td>
                {products.map(p => (
                  <td key={p.id} className="p-4 text-center">
                    <span className="font-bold text-foreground">{p.priceYearly.toLocaleString("tr-TR")} ₺</span>
                    <span className="ml-1 text-xs text-success font-bold">(%10 tasarruf)</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-sm font-semibold text-foreground">Kurulum Süresi</td>
                {products.map(p => (
                  <td key={p.id} className="p-4 text-center text-sm text-muted-foreground">{p.setupDays} gün</td>
                ))}
              </tr>

              {/* Feature Flags */}
              {featureKeys.map((key, i) => (
                <tr key={key} className={i % 2 === 0 ? "bg-background" : ""}>
                  <td className="p-4 text-sm text-foreground">{featureFlagLabels[key]}</td>
                  {products.map(p => (
                    <td key={p.id} className="p-4 text-center">
                      {p.featureFlags[key]
                        ? <Check className="h-5 w-5 text-success mx-auto" />
                        : <X className="h-5 w-5 text-destructive mx-auto" />
                      }
                    </td>
                  ))}
                </tr>
              ))}

              {/* Rating */}
              <tr className="bg-background">
                <td className="p-4 text-sm font-semibold text-foreground">Değerlendirme</td>
                {products.map(p => (
                  <td key={p.id} className="p-4 text-center">
                    <span className="text-accent">{"⭐".repeat(Math.round(p.rating))}</span>
                    <span className="text-xs text-muted-foreground ml-1">{p.rating}/5</span>
                  </td>
                ))}
              </tr>

              {/* Add to Proposal */}
              <tr>
                <td className="p-4" />
                {products.map(p => (
                  <td key={p.id} className="p-4 text-center">
                    <Button
                      size="sm"
                      onClick={() => onAddToProposal(p)}
                      disabled={addedIds.includes(p.id)}
                      className={addedIds.includes(p.id) ? "bg-success hover:bg-success" : ""}
                    >
                      {addedIds.includes(p.id) ? "Eklendi ✓" : "Teklif Ekle"}
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ComparisonModal;
