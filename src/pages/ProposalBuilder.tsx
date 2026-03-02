import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, X, Edit2, Save, FileText, Mail, Target, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { products, type Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import ProductSelectorModal from "@/components/proposal/ProductSelectorModal";
import DijitalEsnafModal from "@/components/proposal/DijitalEsnafModal";

interface ProposalItem {
  product: Product;
  quantity: number;
  yearly: boolean;
}

const starIcons = (score: number) => {
  const s = score >= 90 ? 5 : score >= 75 ? 4 : score >= 60 ? 3 : score >= 40 ? 2 : 1;
  return "⭐".repeat(s) + "☆".repeat(5 - s);
};

const ProposalBuilder = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ProposalItem[]>([]);
  const [editing, setEditing] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [showEsnaf, setShowEsnaf] = useState(false);
  const [dealerDiscount, setDealerDiscount] = useState(0);
  const [timeline, setTimeline] = useState("Hemen (1 hafta içinde kurulum başlar)");
  const [notes, setNotes] = useState("");
  const [services, setServices] = useState({ setup: true, training: true, priority: false, migration: false });

  // Customer info
  const [customer, setCustomer] = useState({
    companyName: "", sector: "", employeeSize: "", city: "",
    contactPerson: "", email: "", phone: "",
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("proposal_products");
      const storedCustomer = localStorage.getItem("proposal_customer");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const found = ids.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
        setItems(found.map(p => ({ product: p, quantity: 1, yearly: false })));
      }
      if (storedCustomer) {
        setCustomer(prev => ({ ...prev, ...JSON.parse(storedCustomer) }));
      }
    } catch { /* ignore */ }
  }, []);

  const updateItem = (id: string, update: Partial<ProposalItem>) => {
    setItems(prev => prev.map(it => it.product.id === id ? { ...it, ...update } : it));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(it => it.product.id !== id));
    toast({ title: "Ürün çıkarıldı", duration: 1500 });
  };

  const addProducts = (newProducts: Product[]) => {
    const newItems = newProducts.map(p => ({ product: p, quantity: 1, yearly: false }));
    setItems(prev => [...prev, ...newItems]);
    toast({ title: `${newProducts.length} ürün eklendi ✓`, duration: 2000 });
  };

  // Calculations
  const subtotal = useMemo(() => items.reduce((s, it) => {
    const price = it.yearly ? it.product.priceYearly : it.product.priceMonthly;
    return s + price * it.quantity;
  }, 0), [items]);

  const platformDiscountRate = 20;
  const packageDiscountRate = items.length >= 5 ? 15 : items.length >= 3 ? 10 : items.length >= 2 ? 5 : 0;
  const sectorCampaignRate = 5; // active campaign

  const platformDiscount = subtotal * platformDiscountRate / 100;
  const packageDiscount = subtotal * packageDiscountRate / 100;
  const sectorDiscount = subtotal * sectorCampaignRate / 100;
  const dealerDiscountAmount = subtotal * dealerDiscount / 100;
  const totalDiscount = platformDiscount + packageDiscount + sectorDiscount + dealerDiscountAmount;

  const serviceCost = (services.setup ? 0 : 0) + (services.training ? 0 : 0) + (services.priority ? 2500 : 0) + (services.migration ? 3500 : 0);
  const total = subtotal - totalDiscount + serviceCost;
  const savingsPercent = subtotal > 0 ? Math.round((totalDiscount / subtotal) * 100) : 0;


  const isMonthly = items.some(it => !it.yearly);
  const priceSuffix = isMonthly ? "/ay" : "/yıl";

  const handleDownloadPDF = () => {
    toast({ title: "PDF oluşturuluyor...", duration: 2000 });
    setTimeout(() => toast({ title: "PDF indirildi ✓", description: "Teklif PDF olarak hazırlandı.", duration: 3000 }), 2000);
  };

  const handleSendEmail = () => {
    if (!customer.email) {
      toast({ title: "E-posta adresi gerekli", description: "Müşteri bilgilerinden e-posta adresini doldurun.", variant: "destructive", duration: 3000 });
      return;
    }
    toast({ title: "E-posta gönderiliyor...", duration: 1500 });
    setTimeout(() => toast({ title: "E-posta gönderildi ✓", description: `Teklif ${customer.email} adresine gönderildi.`, duration: 3000 }), 1500);
  };

  const handleSaveDraft = () => {
    toast({ title: "Taslak kaydedildi ✓", duration: 2000 });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-muted-foreground mb-2">
            <Link to="/customer-analysis" className="text-primary hover:underline">Müşteri Analizi</Link>
            <span className="mx-2">&gt;</span>
            <span>Teklif Oluştur</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Teklif Oluştur</h1>
            <Badge variant="outline" className="text-muted-foreground">Adım 1/2</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT: Content */}
          <div className="w-full lg:w-[60%] space-y-6">
            {/* Customer Info */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Müşteri Bilgileri</h2>
                <button onClick={() => setEditing(!editing)} className="text-primary hover:opacity-80 transition-opacity">
                  {editing ? <Save className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "companyName", label: "Şirket Adı", required: true },
                  { key: "contactPerson", label: "İletişim Kişisi", required: true },
                  { key: "email", label: "E-posta", required: true },
                  { key: "phone", label: "Telefon" },
                  { key: "city", label: "Şehir" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-medium text-muted-foreground">
                      {f.label} {f.required && <span className="text-destructive">*</span>}
                    </label>
                    {editing ? (
                      <input
                        value={(customer as any)[f.key]}
                        onChange={e => setCustomer(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className={`w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary ${f.required && !(customer as any)[f.key] ? "border-primary" : "border-input"}`}
                      />
                    ) : (
                      <p className="text-sm font-medium text-foreground mt-1">{(customer as any)[f.key] || <span className="text-muted-foreground italic">Belirtilmedi</span>}</p>
                    )}
                  </div>
                ))}
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Sektör</label>
                  <Badge className="bg-primary text-primary-foreground mt-1 block w-fit">{customer.sector || "Belirtilmedi"}</Badge>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Çalışan Sayısı</label>
                  <p className="text-sm font-medium text-foreground mt-1">{customer.employeeSize || "Belirtilmedi"}</p>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-foreground">Seçili Ürünler</h2>
                  <Badge className="bg-primary text-primary-foreground text-xs">{items.length} ürün</Badge>
                </div>
              </div>

              {items.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Henüz ürün eklenmedi</p>
              ) : (
                <div className="space-y-3">
                  {items.map(it => {
                    const sectorScore = customer.sector ? (it.product.sectorMatch[customer.sector] || 0) : 0;
                    return (
                      <motion.div
                        key={it.product.id}
                        layout
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-border rounded-xl p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex flex-wrap items-start gap-4">
                          <div className="flex-1 min-w-[200px]">
                            <p className="font-bold text-foreground">{it.product.name}</p>
                            <Badge variant="outline" className="text-[10px] mt-1">{it.product.categoryLabel}</Badge>
                            {customer.sector && sectorScore >= 80 && (
                              <Badge className="ml-1 bg-primary/10 text-primary border-primary/20 text-[10px] mt-1">✓ {customer.sector} için ideal</Badge>
                            )}
                            {customer.sector && sectorScore > 0 && (
                              <p className="text-xs text-muted-foreground mt-1">{starIcons(sectorScore)} %{sectorScore}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => setItems(prev => prev.map(x => x.product.id === it.product.id ? { ...x, yearly: false } : x))}
                              className={`px-3 py-1 rounded-l-lg text-xs font-medium border transition-all ${!it.yearly ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-input"}`}
                            >Aylık</button>
                            <button
                              onClick={() => setItems(prev => prev.map(x => x.product.id === it.product.id ? { ...x, yearly: true } : x))}
                              className={`px-3 py-1 rounded-r-lg text-xs font-medium border transition-all ${it.yearly ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-input"}`}
                            >Yıllık</button>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="font-bold text-foreground">
                              {(it.yearly ? it.product.priceYearly : it.product.priceMonthly).toLocaleString("tr-TR")}₺
                              <span className="text-xs font-normal text-muted-foreground">{it.yearly ? "/yıl" : "/ay"}</span>
                            </p>
                            {it.yearly && <p className="text-[10px] text-success font-medium">2 ay bedava</p>}
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => updateItem(it.product.id, { quantity: Math.max(1, it.quantity - 1) })}
                              className="w-7 h-7 rounded border border-input flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary"
                            ><Minus className="h-3 w-3" /></button>
                            <span className="w-8 text-center text-sm font-medium text-foreground">{it.quantity}</span>
                            <button
                              onClick={() => updateItem(it.product.id, { quantity: Math.min(99, it.quantity + 1) })}
                              className="w-7 h-7 rounded border border-input flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary"
                            ><Plus className="h-3 w-3" /></button>
                          </div>

                          <p className="font-bold text-foreground shrink-0 w-24 text-right">
                            {((it.yearly ? it.product.priceYearly : it.product.priceMonthly) * it.quantity).toLocaleString("tr-TR")}₺
                          </p>

                          <button onClick={() => removeItem(it.product.id)} className="text-destructive hover:text-destructive/80 shrink-0">
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={() => setShowSelector(true)}
                className="w-full mt-4 py-4 border-2 border-dashed border-primary/40 rounded-xl text-primary font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all"
              >
                + Başka Ürün Ekle
              </button>
            </div>

            {/* Discounts */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">İndirimler & Kampanyalar</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Platform Standart İndirimi</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success text-success-foreground text-xs">%{platformDiscountRate}</Badge>
                    <span className="text-sm font-bold text-success">-{platformDiscount.toLocaleString("tr-TR")}₺</span>
                  </div>
                </div>
                {packageDiscountRate > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Paket İndirimi ({items.length} ürün)</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-success text-success-foreground text-xs">%{packageDiscountRate}</Badge>
                      <span className="text-sm font-bold text-success">-{packageDiscount.toLocaleString("tr-TR")}₺</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Sektörel Kampanya</span>
                    <p className="text-[10px] text-muted-foreground italic">{customer.sector || "Sektör"} sektörü için bu ay özel</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-accent text-accent-foreground text-xs">%{sectorCampaignRate}</Badge>
                    <span className="text-sm font-bold text-accent">-{sectorDiscount.toLocaleString("tr-TR")}₺</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm font-bold text-foreground">Bayi Özel İndirimi</p>
                      <p className="text-[10px] text-muted-foreground">Müşterinize özel indirim yapabilirsiniz (max %30)</p>
                    </div>
                    <span className="text-sm font-bold text-primary">%{dealerDiscount}</span>
                  </div>
                  <Slider
                    value={[dealerDiscount]}
                    onValueChange={v => setDealerDiscount(v[0])}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  {dealerDiscount > 0 && (
                    <p className="text-sm font-bold text-primary text-right mt-2">-{dealerDiscountAmount.toLocaleString("tr-TR")}₺</p>
                  )}
                </div>

                <div className="bg-success/10 rounded-lg p-4 mt-4 text-center">
                  <span className="text-2xl">💰</span>
                  <p className="text-lg font-bold text-success mt-1">Toplam İndirim: -{totalDiscount.toLocaleString("tr-TR")}₺</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Ek Hizmetler</h2>
              <div className="space-y-3">
                {[
                  { key: "setup", label: "Kurulum hizmeti dahil", info: "Dahil ✓", cost: 0 },
                  { key: "training", label: "Kullanıcı eğitimi (8 saat)", info: "Dahil ✓", cost: 0, help: "Yönetici + kullanıcı eğitimi, sertifikalı" },
                  { key: "priority", label: "Öncelikli destek paketi (3 ay)", info: "+2.500₺", cost: 2500, help: "7/24 telefon desteği, 2 saat yanıt garantisi" },
                  { key: "migration", label: "Veri aktarımı/migrasyon", info: "+3.500₺", cost: 3500, help: "Mevcut sistemden veri taşıma" },
                ].map(s => (
                  <label key={s.key} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={(services as any)[s.key]}
                      onChange={e => setServices(prev => ({ ...prev, [s.key]: e.target.checked }))}
                      className="mt-1 w-5 h-5 accent-primary rounded"
                      style={{ accentColor: "hsl(16, 100%, 60%)" }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{s.label}</span>
                        <span className={`text-xs font-medium ${s.cost === 0 ? "text-success" : "text-muted-foreground"}`}>{s.info}</span>
                      </div>
                      {s.help && <p className="text-[10px] text-muted-foreground mt-0.5">{s.help}</p>}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-3">Ne Zaman Başlasın?</h2>
              <select
                value={timeline}
                onChange={e => setTimeline(e.target.value)}
                className="w-full border border-input rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-primary"
              >
                <option>Hemen (1 hafta içinde kurulum başlar)</option>
                <option>2 hafta içinde</option>
                <option>1 ay içinde</option>
                <option>Özel tarih</option>
              </select>
            </div>

            {/* Notes */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-1">Müşteriye Özel Notlarınız</h2>
              <p className="text-xs text-muted-foreground mb-3 italic">Bu notlar teklif PDF'inde müşteriniz tarafından görüntülenecek</p>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value.slice(0, 500))}
                rows={4}
                placeholder="Örn: Müşteri mevcut sistemini değiştirmek istiyor. Rakip teklifi mevcut, fiyat rekabetçi olmalı."
                className="w-full border border-input rounded-lg p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y bg-background text-foreground"
              />
              <p className="text-xs text-muted-foreground text-right mt-1">{notes.length}/500</p>
            </div>
          </div>

          {/* RIGHT: Summary Sidebar */}
          <div className="w-full lg:w-[40%]">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-card rounded-2xl shadow-premium p-6 border-t-[3px] border-primary">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">📋 Teklif Özeti</h2>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Seçili ürün:</span>
                    <span>{items.length} adet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ara Toplam:</span>
                    <span className="font-medium text-foreground">{subtotal.toLocaleString("tr-TR")}₺</span>
                  </div>

                  <div className="border-t border-border my-3" />

                  <div className="flex justify-between text-success">
                    <span>Platform indirimi (%{platformDiscountRate}):</span>
                    <span className="font-medium">-{platformDiscount.toLocaleString("tr-TR")}₺</span>
                  </div>
                  {dealerDiscount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Bayi indirimi (%{dealerDiscount}):</span>
                      <span className="font-medium">-{dealerDiscountAmount.toLocaleString("tr-TR")}₺</span>
                    </div>
                  )}
                  {packageDiscountRate > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Paket indirimi (%{packageDiscountRate}):</span>
                      <span className="font-medium">-{packageDiscount.toLocaleString("tr-TR")}₺</span>
                    </div>
                  )}
                  <div className="flex justify-between text-accent">
                    <span>Sektörel kampanya (%{sectorCampaignRate}):</span>
                    <span className="font-medium">-{sectorDiscount.toLocaleString("tr-TR")}₺</span>
                  </div>

                  {serviceCost > 0 && (
                    <div className="flex justify-between text-info">
                      <span>Kurulum & destek:</span>
                      <span className="font-medium">+{serviceCost.toLocaleString("tr-TR")}₺</span>
                    </div>
                  )}

                  <div className="border-t-2 border-primary my-3" />

                  <div className="flex justify-between items-baseline">
                    <span className="text-muted-foreground font-medium">TOPLAM:</span>
                    <span className="text-3xl font-bold text-primary">{total.toLocaleString("tr-TR")}₺</span>
                  </div>
                </div>

                {savingsPercent > 0 && (
                  <div className="bg-success/10 rounded-xl p-4 mt-4 text-center">
                    <span className="text-2xl">🎉</span>
                    <p className="text-success font-bold mt-1">Müşteri toplam %{savingsPercent} tasarruf ediyor!</p>
                    <p className="text-xs text-success/80">Normal fiyata göre {totalDiscount.toLocaleString("tr-TR")}₺ tasarruf</p>
                  </div>
                )}


                {/* Actions */}
                <div className="space-y-3 mt-6">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full py-3.5 rounded-lg bg-secondary text-secondary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <FileText className="h-5 w-5" /> Teklifi PDF Olarak İndir
                  </button>
                  <button
                    onClick={handleSendEmail}
                    className="w-full py-3.5 rounded-lg bg-secondary text-secondary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Mail className="h-5 w-5" /> Teklifi E-posta ile Gönder
                  </button>
                  <button
                    onClick={() => setShowEsnaf(true)}
                    className="w-full py-4 rounded-lg gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-premium animate-pulse"
                    style={{ animationDuration: "3s" }}
                  >
                    <Target className="h-5 w-5" /> 🎯 Müşteriyi Dijital Esnaf'a Davet Et
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    className="w-full py-3 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:bg-muted/50 transition-colors"
                  >
                    💾 Taslak Olarak Kaydet
                  </button>
                  <button
                    onClick={() => navigate("/customer-analysis")}
                    className="w-full text-center text-xs text-muted-foreground hover:underline"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSelector && (
        <ProductSelectorModal
          onClose={() => setShowSelector(false)}
          onAdd={addProducts}
          existingIds={items.map(it => it.product.id)}
        />
      )}

      {showEsnaf && (
        <DijitalEsnafModal
          customer={{ companyName: customer.companyName, sector: customer.sector, email: customer.email }}
          onClose={() => setShowEsnaf(false)}
        />
      )}
    </div>
  );
};

export default ProposalBuilder;
