import { FileText, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface Props {
  products: Product[];
  onClear: () => void;
  visible: boolean;
  onClose: () => void;
}

const StickyProposalBar = ({ products: proposalProducts, onClear, visible, onClose }: Props) => {
  const saveAndNavigate = () => {
    localStorage.setItem("proposal_products", JSON.stringify(proposalProducts.map(p => p.id)));
  };

  return (
  <AnimatePresence>
    {visible && proposalProducts.length > 0 && (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 gradient-primary shadow-premium-hover"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <FileText className="h-7 w-7 text-primary-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-primary-foreground font-bold text-sm">{proposalProducts.length} ürün teklife eklendi</p>
              <p className="text-primary-foreground/70 text-xs truncate">
                {proposalProducts.slice(0, 2).map(p => p.name).join(", ")}
                {proposalProducts.length > 2 && ` +${proposalProducts.length - 2}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild className="bg-card text-primary hover:bg-card/90 font-bold shadow-premium h-11 px-6" onClick={saveAndNavigate}>
              <Link to="/proposal-builder">
                Teklif Oluştur <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <button onClick={onClear} className="text-primary-foreground/70 hover:text-primary-foreground text-xs underline">
              Temizle
            </button>
            <button onClick={onClose} className="text-primary-foreground/60 hover:text-primary-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};

export default StickyProposalBar;
