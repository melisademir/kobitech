import { useState } from "react";
import { X, Star, Check, XIcon, Clock, Smartphone, Server, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import type { CatalogProduct } from "@/data/catalog-products";

interface Props {
  product: CatalogProduct;
  onClose: () => void;
}

type Tab = "overview" | "sectors" | "pricing" | "technical";

const ProductDetailModal = ({ product, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Genel Bakış" },
    { id: "sectors", label: "Sektörel Uyum" },
    { id: "pricing", label: "Fiyatlandırma" },
    { id: "technical", label: "Teknik Detaylar" },
  ];

  const getStars = (score: number) => (score >= 90 ? 5 : score >= 75 ? 4 : score >= 60 ? 3 : 2);
  const getLabel = (score: number) => (score >= 85 ? "Çok Uygun" : score >= 70 ? "Uygun" : score >= 50 ? "Kısmi Uygun" : "Uygun Değil");
  const getLabelColor = (score: number) => (score >= 85 ? "bg-success text-success-foreground" : score >= 70 ? "bg-info text-info-foreground" : score >= 50 ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground");

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

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors border-b-[3px] ${
                activeTab === t.id
                  ? "border-b-primary text-primary"
                  : "border-b-transparent text-muted-foreground hover:bg-primary/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-7">
          {activeTab === "overview" && (
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
            </div>
          )}

          {activeTab === "sectors" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">Bu Ürün Hangi Sektörlerde Kullanılıyor?</h3>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-4 bg-background px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wide border-b border-border">
                  <span>Sektör</span><span>Uyum Skoru</span><span>Değerlendirme</span><span>Profil</span>
                </div>
                {product.topSectors.map(s => {
                  const stars = getStars(s.score);
                  return (
                    <div key={s.name} className={`grid grid-cols-4 px-4 py-3 items-center text-sm border-b border-border last:border-0 ${s.score >= 85 ? "bg-success/5" : ""}`}>
                      <span className="font-bold text-foreground">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className={`h-4 w-4 ${i <= stars ? "fill-accent text-accent" : "text-border"}`} />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-primary">%{s.score}</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full w-fit ${getLabelColor(s.score)}`}>
                        {getLabel(s.score)}
                      </span>
                      <span className="text-xs text-muted-foreground">Orta-büyük işletme</span>
                    </div>
                  );
                })}
              </div>

              {/* Sector-specific benefits */}
              {Object.entries(product.sectorBenefits).map(([sector, data]) => (
                <div key={sector} className="border border-border rounded-xl overflow-hidden">
                  <div className="bg-primary/5 px-5 py-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{sector}</span>
                    <span className="font-bold text-foreground text-sm">{sector} Sektörü için Faydalar</span>
                  </div>
                  <div className="p-5 space-y-3 bg-primary/[0.02]">
                    {data.bullets.map(b => (
                      <div key={b.title} className="flex gap-3">
                        <span className="text-xl">{b.icon}</span>
                        <div>
                          <p className="font-bold text-foreground text-sm">{b.title}</p>
                          <p className="text-muted-foreground text-xs">{b.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {data.successStory && (
                    <div className="border-t border-border p-5">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Başarı Hikayesi</p>
                      <div className="border-l-4 border-success bg-success/5 rounded-r-lg p-4">
                        <p className="font-bold text-foreground">{data.successStory.company}</p>
                        <p className="text-success font-bold text-lg">{data.successStory.result}</p>
                        <p className="text-muted-foreground text-sm mt-1">{data.successStory.description}</p>
                        {data.successStory.quote && (
                          <p className="text-muted-foreground text-sm italic mt-2 border-l-2 border-border pl-3">
                            "{data.successStory.quote}"
                          </p>
                        )}
                        <div className="flex gap-3 mt-3">
                          {data.successStory.metrics.map(m => (
                            <span key={m.label} className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded">
                              {m.label}: {m.value}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly */}
                <div className="border-2 border-primary rounded-xl p-6">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Aylık</span>
                  <p className="text-4xl font-bold text-foreground mt-4">
                    {product.priceLabel || `${product.priceMonthly.toLocaleString("tr-TR")} ₺`}
                    {!product.priceLabel && <span className="text-lg font-normal text-muted-foreground">/ay</span>}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Neler Dahil?</p>
                    {["Kurulum desteği", `Kullanıcı eğitimi`, "Standart destek", "Güncellemeler"].map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-success" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yearly */}
                {product.priceYearly && (
                  <div className="border-2 border-accent rounded-xl p-6 relative">
                    <span className="absolute -top-3 right-4 bg-success text-success-foreground text-xs font-bold px-3 py-1 rounded-full">En Popüler</span>
                    <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">Yıllık</span>
                    <p className="text-4xl font-bold text-foreground mt-4">
                      {product.priceYearly.toLocaleString("tr-TR")} ₺<span className="text-lg font-normal text-muted-foreground">/yıl</span>
                    </p>
                    <div className="bg-success/10 text-success font-bold text-sm p-2 rounded mt-2">
                      2 ay bedava 🎉 %15 tasarruf
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase">Neler Dahil?</p>
                      {["Kurulum desteği", "Kullanıcı eğitimi", "Öncelikli destek (7/24)", "Güncellemeler", "Özel hesap yöneticisi"].map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="h-4 w-4 text-success" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-bold text-foreground mb-3">Ek Maliyetler</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-lg p-3 text-sm"><span className="text-muted-foreground">Kurulum:</span> <span className="font-bold text-success">Dahil ✓</span></div>
                  <div className="bg-background rounded-lg p-3 text-sm"><span className="text-muted-foreground">Eğitim (8 saat):</span> <span className="font-bold text-success">Dahil ✓</span></div>
                  <div className="bg-background rounded-lg p-3 text-sm"><span className="text-muted-foreground">Veri aktarımı:</span> <span className="font-bold text-foreground">İletişime geçin</span></div>
                  <div className="bg-background rounded-lg p-3 text-sm"><span className="text-muted-foreground">Özel geliştirme:</span> <span className="font-bold text-foreground">Fiyat teklifi alın</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "technical" && (
            <div className="space-y-6">
              <div>
                <p className="font-bold text-foreground mb-3">Sistem Gereksinimleri</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["İşletim Sistemi", "Windows 10+, macOS, Linux"],
                    ["Tarayıcı", "Chrome 90+, Firefox 85+, Safari 14+"],
                    ["İnternet", "Min 10 Mbps"],
                    ["Donanım", "4GB RAM, 2GB disk"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-background rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">{k}</p>
                      <p className="text-sm font-medium text-foreground">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-foreground mb-3">API & Teknik</p>
                <div className="flex flex-wrap gap-2">
                  {product.hasApi && <span className="bg-success text-success-foreground text-xs font-bold px-3 py-1 rounded-full">REST API mevcut</span>}
                  {product.hasMobile && <span className="bg-info text-info-foreground text-xs font-bold px-3 py-1 rounded-full">Mobil uygulama</span>}
                  {product.has724Support && <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">7/24 Destek</span>}
                </div>
              </div>

              <div>
                <p className="font-bold text-foreground mb-3">Kurulum Süreci</p>
                <div className="flex items-center gap-2">
                  {[
                    { label: "Başvuru", time: "1 gün", icon: "📋" },
                    { label: "Kurulum", time: `${product.setupDays} gün`, icon: "⚙️" },
                    { label: "Eğitim", time: "8 saat", icon: "📚" },
                    { label: "Canlı Kullanım", time: "✓", icon: "🚀" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">{step.icon}</div>
                        <p className="text-xs font-medium text-foreground mt-1">{step.label}</p>
                        <p className="text-[10px] text-muted-foreground">{step.time}</p>
                      </div>
                      {i < 3 && <div className="w-8 h-0.5 bg-primary/30 mb-6" />}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-foreground mb-3">Destek</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-lg p-4 flex items-center gap-3">
                    <Headphones className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold text-sm text-foreground">{product.has724Support ? "7/24 Destek" : "Mesai Saatleri"}</p>
                      <p className="text-xs text-muted-foreground">{product.has724Support ? "Her zaman ulaşılabilir" : "Hafta içi 09:00-18:00"}</p>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-4 flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold text-sm text-foreground">İletişim</p>
                      <p className="text-xs text-muted-foreground">Telefon, E-posta, Canlı Chat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailModal;
