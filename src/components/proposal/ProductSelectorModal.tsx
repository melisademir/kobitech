import { useState, useMemo } from "react";
import { X, Search, Check } from "lucide-react";
import { motion } from "framer-motion";
import { products, type Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "all", label: "Tümü" },
  { id: "odeme", label: "Ödeme" },
  { id: "finansman", label: "Finansman" },
  { id: "muhasebe", label: "Muhasebe" },
  { id: "erp", label: "ERP" },
  { id: "eticaret", label: "E-ticaret" },
];

interface Props {
  onClose: () => void;
  onAdd: (products: Product[]) => void;
  existingIds: string[];
}

const ProductSelectorModal = ({ onClose, onAdd, existingIds }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.categoryLabel.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || p.category === category || (category === "erp" && ["erp", "uretim", "proje", "stok", "lojistik", "destek", "dokuman", "tedarik"].includes(p.category));
      return matchSearch && matchCat && !existingIds.includes(p.id);
    });
  }, [search, category, existingIds]);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleAdd = () => {
    const toAdd = products.filter(p => selected.includes(p.id));
    onAdd(toAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Ürün Ekle</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-6 w-6" /></button>
        </div>

        <div className="p-4 border-b border-border space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Ürün ara..."
              className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background text-foreground"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${category === c.id ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground border border-border hover:border-primary"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map(p => (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${selected.includes(p.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
            >
              <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${selected.includes(p.id) ? "bg-primary" : "border-2 border-input"}`}>
                {selected.includes(p.id) && <Check className="h-4 w-4 text-primary-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{p.name}</p>
                <p className="text-xs text-muted-foreground truncate">{p.description}</p>
              </div>
              <Badge variant="outline" className="text-[10px] shrink-0">{p.categoryLabel}</Badge>
              <span className="text-sm font-bold text-primary shrink-0">{p.priceMonthly.toLocaleString("tr-TR")}₺</span>
            </button>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">Ürün bulunamadı</p>}
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{selected.length} ürün seçildi</p>
          <button
            onClick={handleAdd}
            disabled={selected.length === 0}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Seçilenleri Ekle
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductSelectorModal;
