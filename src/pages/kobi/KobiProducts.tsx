import { useState } from "react";
import KobiLayout from "@/components/layout/KobiLayout";
import { catalogProducts, type CatalogProduct } from "@/data/catalog-products";
import { Star, ShoppingCart, Info, X, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const goalTabs = [
  { id: "all", label: "Tümü" },
  { id: "tesvikler", label: "Teşviklerden Yararlan" },
  { id: "eticaret", label: "E-Ticarete Açıl" },
  { id: "odeme", label: "Ödeme Al" },
  { id: "finans", label: "Paranı Yönet" },
  { id: "uretim", label: "Üretimini Optimize Et" },
  { id: "stok", label: "Stoğunu Kontrol Et" },
  { id: "global", label: "Global Aç" },
  { id: "ekip", label: "Ekibini Güçlendir" },
  { id: "yonetim", label: "İşlerini Yönet" },
  { id: "koruma", label: "Kendini Koru" },
];

const tabCategoryMap: Record<string, string[]> = {
  all: [],
  odeme: ["odeme"],
  finans: ["finansman", "muhasebe"],
  stok: ["erp-isletme"],
  uretim: ["erp"],
  eticaret: ["eticaret"],
  yonetim: ["erp-isletme", "erp"],
  tesvikler: ["finansman"],
  global: ["eticaret"],
  ekip: ["erp-isletme"],
  koruma: ["sigorta", "muhasebe"],
};

const getStars = (score: number) => score >= 90 ? 5 : score >= 75 ? 4 : score >= 60 ? 3 : 2;

const KobiProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const { items, addItem, removeItem, isInCart, count } = useCart();
  const { data: onboardingData } = useOnboarding();
  const navigate = useNavigate();

  const filtered = activeTab === "all"
    ? catalogProducts
    : catalogProducts.filter(p => (tabCategoryMap[activeTab] || []).includes(p.category));

  const handleTeklifTalebi = () => {
    setCartOpen(false);
    setAuthPromptOpen(true);
  };

  const handleLoginSignup = () => {
    setAuthPromptOpen(false);
    // Navigate to signup with redirect back to teklif-talebi
    navigate("/kobi/signup?redirect=/kobi/teklif-talebi");
  };

  const handleSendToEmail = () => {
    setAuthPromptOpen(false);
    const email = onboardingData.email;
    if (email) {
      toast.success(`Teklif detayları ${email} adresine gönderilecek`, {
        description: "En kısa sürede size dönüş yapacağız.",
      });
    } else {
      // If no email in context, go to teklif-talebi form
      navigate("/kobi/teklif-talebi");
    }
  };

  return (
    <KobiLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Çözümler</h1>
            <p className="text-muted-foreground mt-1">İşletmenize uygun dijital çözümleri keşfedin</p>
          </div>
          <Button variant="outline" onClick={() => setCartOpen(true)} className="relative">
            <ShoppingCart className="h-5 w-5 mr-2" /> Sepetim
            {count > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">{count}</span>}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {goalTabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === t.id ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary/30"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-card rounded-2xl shadow-card hover:shadow-card-hover border border-border p-6 transition-all flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase px-2 py-1 rounded-full">{product.categoryLabel}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{product.description}</p>

              <div className="space-y-2 mb-4">
                {product.topSectors.slice(0, 3).map(s => {
                  const stars = getStars(s.score);
                  return (
                    <div key={s.name} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.name}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className={`h-3 w-3 ${i <= stars ? "fill-accent text-accent" : "text-border"}`} />
                        ))}
                        <span className="text-xs font-bold text-muted-foreground ml-1">%{s.score}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-xs text-muted-foreground mb-4">⏱ Kurulum: {product.setupDays} gün</div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1"><Info className="h-4 w-4 mr-1" /> Detaylı Bilgi</Button>
                <Button
                  variant={isInCart(product.id) ? "secondary" : "hero"}
                  size="sm"
                  className="flex-1"
                  onClick={() => isInCart(product.id) ? removeItem(product.id) : addItem(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" /> {isInCart(product.id) ? "Sepetten Çıkar" : "Sepete Ekle"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-secondary z-50" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card z-50 shadow-premium-hover flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">Sepetim ({count})</h2>
                <button onClick={() => setCartOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Sepetiniz boş</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border">
                        <div className="flex-1">
                          <p className="font-bold text-foreground text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.categoryLabel}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80 text-xs font-medium">Kaldır</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {items.length > 0 && (
                <div className="p-6 border-t border-border space-y-4">
                  <div className="bg-accent/10 text-accent p-3 rounded-lg text-sm text-center font-medium">
                    💡 Fiyatlar size özel teklif ile belirlenecek
                  </div>
                  <Button variant="hero" className="w-full" onClick={handleTeklifTalebi}>
                    Teklif Talebi Oluştur
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setCartOpen(false)}>
                    Alışverişe Devam
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Prompt Dialog */}
      <AnimatePresence>
        {authPromptOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-secondary z-[60]"
              onClick={() => setAuthPromptOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            >
              <div className="bg-card rounded-2xl shadow-premium border border-border max-w-md w-full p-8 space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                    <LogIn className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Giriş Yapmanız Gerekiyor</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Teklif yanıtı geldiğinde takip edebilmek için giriş yapmalısınız.
                  </p>
                </div>

                {onboardingData.email && (
                  <div className="bg-muted/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground">Kayıtlı e-posta</p>
                    <p className="text-sm font-medium text-foreground">{onboardingData.email}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <Button variant="hero" className="w-full" size="lg" onClick={handleLoginSignup}>
                    <LogIn className="h-4 w-4 mr-2" /> Kayıt Ol / Giriş Yap
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" onClick={handleSendToEmail}>
                    <Mail className="h-4 w-4 mr-2" /> Teklifi Mailime Gönder
                  </Button>
                </div>

                <button
                  onClick={() => setAuthPromptOpen(false)}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Vazgeç
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </KobiLayout>
  );
};

export default KobiProducts;
