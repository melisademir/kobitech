import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { Bundle } from "@/data/bundles";
import { motion } from "framer-motion";

interface Props {
  bundle: Bundle;
  onAddBundle: (bundle: Bundle) => void;
}

const BundleCard = ({ bundle, onAddBundle }: Props) => {
  const handleAdd = () => {
    onAddBundle(bundle);
    toast({
      title: `${bundle.productNames.length} ürün teklife eklendi ✓`,
      description: bundle.name,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      className="bg-card rounded-2xl border-2 border-primary shadow-card p-6 flex flex-col"
    >
      {/* Top Badge */}
      <span className="self-start gradient-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-4">
        {bundle.name}
      </span>

      {/* Product Icons Row */}
      <div className="flex gap-2 mb-4">
        {bundle.productNames.slice(0, 5).map((_, i) => (
          <div key={i} className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Package className="h-5 w-5 text-primary" />
          </div>
        ))}
        {bundle.productNames.length > 5 && (
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
            +{bundle.productNames.length - 5}
          </div>
        )}
      </div>

      {/* Product List */}
      <ul className="space-y-1 mb-4 flex-1">
        {bundle.productNames.slice(0, 3).map(p => (
          <li key={p} className="text-sm text-foreground">• {p}</li>
        ))}
        {bundle.productNames.length > 3 && (
          <li className="text-sm text-muted-foreground">• +{bundle.productNames.length - 3} ürün daha</li>
        )}
      </ul>

      <div className="border-t border-border pt-4 mt-auto">
        {/* Pricing */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{bundle.productNames.length} ürün</span>
          <Badge variant="success" className="text-xs">%{bundle.discount} paket indirimi</Badge>
        </div>
        <div className="flex items-end justify-between mb-3">
          <p className="text-sm text-muted-foreground line-through">{bundle.normalPrice.toLocaleString("tr-TR")} ₺/ay</p>
          <p className="text-2xl font-bold text-primary">{bundle.priceMonthly.toLocaleString("tr-TR")} ₺<span className="text-sm font-normal text-muted-foreground">/ay</span></p>
        </div>

        <Button onClick={handleAdd} variant="accent" className="w-full h-11">
          Paketi Ekle
        </Button>
      </div>
    </motion.div>
  );
};

export default BundleCard;
