import { Target, Package, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const QuickAccess = () => (
  <div>
    <h2 className="text-xl font-bold text-foreground mb-5">Hızlı Erişim</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Hero Card */}
      <motion.div whileHover={{ scale: 1.02 }} className="gradient-primary rounded-2xl p-8 text-primary-foreground flex flex-col justify-between min-h-[220px] shadow-premium">
        <Target className="h-16 w-16 opacity-80" />
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Yeni Müşteri Analizi</h3>
          <p className="text-primary-foreground/80 text-sm">Müşterinize özel ürün önerileri alın</p>
        </div>
        <Button asChild variant="secondary" className="w-fit bg-card/95 text-primary hover:bg-card font-bold">
          <Link to="/sales/customer-analysis">Analiz Başlat</Link>
        </Button>
      </motion.div>

      {/* Products Card */}
      <div className="bg-card rounded-2xl p-7 border-2 border-primary/20 hover:border-primary/40 transition-colors shadow-card flex flex-col justify-between min-h-[220px]">
        <div className="flex items-start justify-between">
          <Package className="h-14 w-14 text-primary" />
          <Badge>21 ürün</Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">Param Ürünleri</h3>
          <p className="text-sm text-muted-foreground">21 ürün kataloğu ve sektörel uyumlar</p>
        </div>
        <Button asChild variant="outline" className="w-fit">
          <Link to="/sales/products">Kataloğu Gör</Link>
        </Button>
      </div>

      {/* Pending Proposals Card */}
      <div className="bg-card rounded-2xl p-7 border-2 border-accent/40 shadow-card flex flex-col justify-between min-h-[220px]">
        <div className="flex items-start justify-between">
          <FileText className="h-14 w-14 text-accent" />
          <span className="text-2xl font-bold text-accent">3</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">Bekleyen Teklifler</h3>
          <p className="text-sm text-accent font-medium">3 teklif bekliyor</p>
        </div>
        <Button asChild variant="outline" className="w-fit">
          <Link to="/sales/proposals">Teklifleri Gör</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default QuickAccess;
