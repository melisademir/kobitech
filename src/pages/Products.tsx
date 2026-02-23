import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Target, Package, FileText, TrendingUp, Settings,
  Search, Bell, ChevronDown, LogOut, User, DollarSign, Menu, X,
  Grid3X3, List,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { catalogProducts, catalogCategories, type CatalogProduct } from "@/data/catalog-products";
import ProductCatalogCard from "@/components/products/ProductCatalogCard";
import ProductDetailModal from "@/components/products/ProductDetailModal";
import SectorExamplesModal from "@/components/products/SectorExamplesModal";
import kobiLogo from "@/assets/logo-kobitech.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Target, label: "Müşteri Analizi", path: "/customer-analysis" },
  { icon: Package, label: "Param Ürünleri", path: "/products", badge: String(catalogProducts.length) },
  { icon: FileText, label: "Tekliflerim", path: "/proposals", badgeCount: 3 },
  { icon: TrendingUp, label: "Performansım", path: "/performance" },
  { icon: Settings, label: "Ayarlar", path: "/settings" },
];

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [detailProduct, setDetailProduct] = useState<CatalogProduct | null>(null);
  const [sectorProduct, setSectorProduct] = useState<CatalogProduct | null>(null);
  const dealerName = "Ahmet Yılmaz";

  const filtered = useMemo(() => {
    let items = catalogProducts;
    if (activeCategory !== "all") {
      items = items.filter(p => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const hasFilters = activeCategory !== "all" || searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border h-[70px] flex items-center px-6 shadow-card sticky top-0 z-40">
        <button className="lg:hidden mr-4 text-foreground" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
        <Link to="/dashboard" className="flex items-center gap-2 mr-8 shrink-0">
          <img src={kobiLogo} alt="KobiTECH" className="h-[30px] w-auto" />
          <span className="text-lg font-extrabold text-primary tracking-tight hidden sm:inline">KobiTECH</span>
        </Link>
        <div className="hidden md:flex flex-1 max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Müşteri veya ürün ara..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-background border-2 border-border text-sm focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <button className="relative text-muted-foreground hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">AY</div>
              <span className="hidden sm:inline text-sm font-semibold text-foreground">{dealerName}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-premium border border-border overflow-hidden z-50">
                  <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 text-foreground hover:text-primary transition-colors"><User className="h-4 w-4" /> Profilim</Link>
                  <Link to="/commissions" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 text-foreground hover:text-primary transition-colors"><DollarSign className="h-4 w-4" /> Komisyonlarım</Link>
                  <div className="border-t border-border" />
                  <button onClick={() => navigate("/kobi/login")} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-destructive/5 text-muted-foreground hover:text-destructive transition-colors w-full"><LogOut className="h-4 w-4" /> Çıkış Yap</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-[260px] bg-card border-r border-border shrink-0">
          <nav className="p-4 space-y-1 sticky top-[70px]">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && <span className="ml-auto text-xs text-muted-foreground">({item.badge})</span>}
                  {item.badgeCount && <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-[10px]">{item.badgeCount}</Badge>}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-secondary z-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
              <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} className="fixed left-0 top-0 bottom-0 w-[260px] bg-card z-50 lg:hidden shadow-premium-hover">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    <span className="font-extrabold text-primary">SALESPARTNER</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
                </div>
                <nav className="p-4 space-y-1">
                  {navItems.map(item => {
                    const active = location.pathname === item.path;
                    return (
                      <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-background"}`}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 overflow-x-hidden">
          {/* Page Header */}
          <div className="bg-card border-b border-border px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Ürün Kataloğu</h1>
                  <p className="text-muted-foreground mt-1">{catalogProducts.length} ürünü keşfedin, sektörel uyumları inceleyin</p>
                </div>
                <span className="bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full">{catalogProducts.length} Ürün</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-card border-b border-border px-6 lg:px-8 py-5 sticky top-[70px] z-10">
            <div className="max-w-7xl mx-auto space-y-3">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Ürün adı, kategori veya özellik ara..."
                    className="w-full h-12 pl-12 pr-4 rounded-full bg-card border-2 border-border text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {hasFilters && (
                    <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="text-sm text-muted-foreground border border-border rounded-lg px-3 py-2 hover:text-primary transition-colors">
                      Sıfırla
                    </button>
                  )}
                  <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background"}`}>
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background"}`}>
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {catalogCategories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeCategory === c.id
                        ? "bg-primary text-primary-foreground shadow-card"
                        : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {c.label} ({c.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid / List */}
          <div className="px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <span className="text-8xl opacity-20 mb-4">🔍</span>
                  <h2 className="text-xl font-bold text-muted-foreground mb-2">Aradığınız ürün bulunamadı</h2>
                  <p className="text-muted-foreground mb-6">Filtreleri temizleyin veya farklı arama yapın</p>
                  <button
                    onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                    className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                  >
                    Tüm Ürünleri Göster
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map(p => (
                    <ProductCatalogCard
                      key={p.id}
                      product={p}
                      onDetailClick={setDetailProduct}
                      onSectorExamplesClick={setSectorProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map(p => (
                    <div key={p.id} className="bg-card rounded-xl border border-border p-5 flex items-center gap-6 hover:shadow-card transition-shadow">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl shrink-0">
                        {({ odeme: "💳", finansman: "💰", muhasebe: "📊", "erp-isletme": "🏢", erp: "🏭", eticaret: "🌐", sigorta: "🛡️" } as Record<string, string>)[p.category] || "📦"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground">{p.name}</h3>
                          <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">{p.categoryLabel}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          {p.topSectors.slice(0, 3).map(s => (
                            <span key={s.name}>{s.name} %{s.score}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-primary">{p.priceLabel || `${p.priceMonthly.toLocaleString("tr-TR")} ₺/ay`}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => setDetailProduct(p)} className="text-xs text-primary font-bold hover:underline">Detay</button>
                          <button onClick={() => setSectorProduct(p)} className="text-xs text-accent font-bold hover:underline">Sektörel</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {detailProduct && <ProductDetailModal product={detailProduct} onClose={() => setDetailProduct(null)} />}
      {sectorProduct && <SectorExamplesModal product={sectorProduct} onClose={() => setSectorProduct(null)} />}
    </div>
  );
};

export default Products;
