import { Star } from "lucide-react";
import type { CatalogProduct } from "@/data/catalog-products";

interface Props {
  product: CatalogProduct;
  onDetailClick: (product: CatalogProduct) => void;
  onSectorExamplesClick: (product: CatalogProduct) => void;
}

const getStars = (score: number) => {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  return 2;
};

const ProductCatalogCard = ({ product, onDetailClick, onSectorExamplesClick }: Props) => {
  const categoryIcons: Record<string, string> = {
    odeme: "💳", finansman: "💰", muhasebe: "📊", "erp-isletme": "🏢",
    erp: "🏭", eticaret: "🌐", sigorta: "🛡️",
  };

  return (
    <div className="bg-card rounded-2xl shadow-card hover:shadow-premium-hover border-t-4 border-t-primary p-7 transition-all duration-300 hover:scale-[1.02] flex flex-col">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-5xl">
          {categoryIcons[product.category] || "📦"}
        </div>
      </div>

      {/* Name & Category */}
      <h3 className="text-xl font-bold text-foreground text-center">{product.name}</h3>
      <div className="flex justify-center mt-2">
        <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase px-3 py-1 rounded-full">
          {product.categoryLabel}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm text-center mt-3 leading-relaxed flex-1">
        {product.description}
      </p>

      <div className="border-t border-border my-5" />

      {/* Top Sectors */}
      <div className="mb-5">
        <p className="text-xs font-bold text-foreground mb-3">En Uygun Sektörler</p>
        <div className="space-y-2">
          {product.topSectors.map(s => {
            const stars = getStars(s.score);
            return (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{s.name}</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`h-4 w-4 ${i <= stars ? "fill-accent text-accent" : "text-border"}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-bold ${stars === 5 ? "text-primary" : "text-muted-foreground"}`}>
                    %{s.score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div className="flex justify-center mb-5">
        <span className="gradient-primary text-primary-foreground text-sm font-bold px-5 py-2 rounded-full">
          {product.priceLabel || `${product.priceMonthly.toLocaleString("tr-TR")} ₺/ay`}
          {product.priceYearly ? ` • ${product.priceYearly.toLocaleString("tr-TR")} ₺/yıl` : ""}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onDetailClick(product)}
          className="flex-1 py-2.5 rounded-lg border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors"
        >
          Detaylı Bilgi
        </button>
        <button
          onClick={() => onSectorExamplesClick(product)}
          className="text-sm text-accent font-medium hover:underline"
        >
          Sektörel Örnekler
        </button>
      </div>
    </div>
  );
};

export default ProductCatalogCard;
