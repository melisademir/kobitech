import { X } from "lucide-react";
import { motion } from "framer-motion";
import type { CatalogProduct } from "@/data/catalog-products";

interface Props {
  product: CatalogProduct;
  onClose: () => void;
}

const ProductDetailModal = ({ product, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-5xl bg-card rounded-2xl shadow-premium-hover overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gradient-primary px-7 py-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-primary-foreground">{product.name}</h2>
            <span className="text-primary-foreground/80 text-sm border border-primary-foreground/30 rounded-full px-3 py-0.5 inline-block mt-1">
              {product.categoryLabel}
            </span>
          </div>
          <button onClick={onClose} className="text-primary-foreground hover:scale-110 transition-transform">
            <X className="h-8 w-8" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-7">
          <div className="space-y-6">
            <p className="text-foreground text-lg leading-relaxed">{product.description}</p>

            <div>
              <h3 className="text-primary font-bold text-lg mb-4">Temel Özellikler</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.featureDetails.map(f => (
                  <div key={f.name} className="bg-background rounded-lg p-4 flex gap-3">
                    <span className="text-2xl">{f.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">{f.name}</p>
                      <p className="text-muted-foreground text-xs">{f.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub Services */}
            {"subServices" in product && (product as any).subServices?.length > 0 && (
              <div>
                <h3 className="text-primary font-bold text-lg mb-4">Alt Ürünler & Hizmetler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(product as any).subServices.map((s: { name: string; description: string }) => (
                    <div key={s.name} className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                      <p className="font-bold text-foreground text-sm">{s.name}</p>
                      <p className="text-muted-foreground text-xs mt-1">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailModal;
