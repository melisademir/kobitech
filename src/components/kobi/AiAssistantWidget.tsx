import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Send, ExternalLink, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Link } from "react-router-dom";

// --- Mock Data ---
const newsBySector: Record<string, { title: string; snippet: string; time: string }[]> = {
  Tekstil: [
    { title: "AB'den Yeni Sürdürülebilirlik Düzenlemesi", snippet: "Avrupa Birliği tekstil sektörü için yeni çevre standartları açıkladı. İhracatçılar için sertifikasyon süreçleri değişiyor.", time: "2 saat önce" },
    { title: "Pamuk Fiyatlarında Yeni Denge", snippet: "Küresel pamuk arzındaki iyileşme ile fiyatlar %12 geriledi. Üreticiler maliyet avantajı yakalayabilir.", time: "5 saat önce" },
    { title: "Dijital Baskı Teknolojisinde Devrim", snippet: "Yeni nesil dijital baskı makineleri su tüketimini %60 azaltıyor. Sürdürülebilir üretim için önemli bir adım.", time: "1 gün önce" },
  ],
  Gıda: [
    { title: "Gıda Güvenliği Yönetmeliği Güncellendi", snippet: "Tarım Bakanlığı gıda işleme tesisleri için yeni hijyen standartlarını yayımladı.", time: "3 saat önce" },
    { title: "Organik Ürün Talebi %35 Arttı", snippet: "Tüketici eğilimleri organik ve doğal ürünlere yöneliyor. KOBİ'ler için yeni fırsatlar doğuyor.", time: "8 saat önce" },
    { title: "Soğuk Zincir Lojistiğinde Yenilikler", snippet: "IoT sensörlü soğuk zincir takip sistemleri gıda israfını %40 azaltıyor.", time: "1 gün önce" },
  ],
  default: [
    { title: "KOBİ'ler İçin Dijital Dönüşüm Teşvikleri", snippet: "KOSGEB, dijitalleşme yatırımları için %50'ye varan hibe desteği sunuyor. Başvurular açıldı.", time: "1 saat önce" },
    { title: "E-Ticaret Hacmi Rekor Kırdı", snippet: "Türkiye'de e-ticaret hacmi yıllık %42 büyüyerek 1.8 trilyon TL'ye ulaştı.", time: "4 saat önce" },
    { title: "Yapay Zeka KOBİ'lere Nasıl Yardımcı Oluyor?", snippet: "Stok yönetiminden müşteri analizine kadar AI çözümleri küçük işletmelerin verimliliğini artırıyor.", time: "1 gün önce" },
  ],
};

const suggestionTemplates = [
  { icon: "⚠️", title: "Fire oranınız yüksek görünüyor", desc: "Sektörünüzde ortalama fire %18. Univera Stokbar ile fire takibi yaparak 6 ayda %45 azaltabilirsiniz.", cta: "Çözüme Bak →", path: "/digitalhub/urunler" },
  { icon: "🛒", title: "Sektörünüzde %78 işletme e-ticaret kullanıyor", desc: "Rakiplerinizin çoğu online satış yapıyor. E-ticaret kanalı açmayı değerlendirin.", cta: "E-ticaret Çözümleri →", path: "/digitalhub/urunler" },
  { icon: "📈", title: "Global Readiness seviyeniz artıyor! +5 puan", desc: "Tebrikler, bu hafta %45'e ulaştınız. Bir sonraki seviye (Silver) için %50 hedefleyin.", cta: "Raporumu Gör →", path: "/digitalhub/harita" },
  { icon: "🎯", title: "Hedeflerinize %40 yaklaştınız", desc: "Planınızda 2/5 adım tamamlandı. Sıradaki adımı inceleyin.", cta: "Planıma Git →", path: "/digitalhub/planlarim" },
];

const quickReplies = [
  "Hangi hizmeti almalıyım?",
  "Fiyatlar ne kadar?",
  "Fire oranımı nasıl azaltırım?",
  "E-ticarete nasıl başlarım?",
];

const botAnswers: Record<string, string> = {
  "Hangi hizmeti almalıyım?": "Sektörünüze ve hedeflerinize göre **Dijital Esnaf Paketi** veya **E-Ticaret Çözümleri** ile başlamanızı öneririm. Çözümler sayfasından detayları inceleyebilirsiniz!",
  "Fiyatlar ne kadar?": "Paketlerimiz aylık **₺499**'dan başlıyor. Detaylı fiyat bilgisi için Çözümler sayfasını ziyaret edebilir veya teklif talep edebilirsiniz.",
  "Fire oranımı nasıl azaltırım?": "**Stok ve fire yönetimi** çözümümüzle gerçek zamanlı takip yapabilirsiniz. Ortalama **%40-60** fire azaltımı sağlanıyor. Detaylar için Çözümler sayfasına bakın!",
  "E-ticarete nasıl başlarım?": "3 adımda başlayabilirsiniz: 1️⃣ E-ticaret paketini seçin 2️⃣ Ürünlerinizi yükleyin 3️⃣ Satışa başlayın! Detaylı rehber için Çözümler sayfasını inceleyin.",
};

interface ChatMsg {
  role: "bot" | "user";
  text: string;
}

const AiAssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [tab, setTab] = useState("news");
  const [unread] = useState(3);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "bot", text: "Merhaba! Size nasıl yardımcı olabilirim? 👋" },
  ]);
  const [input, setInput] = useState("");
  const chatEnd = useRef<HTMLDivElement>(null);
  const { data } = useOnboarding();
  const sector = data.sector || "";

  const news = newsBySector[sector] || newsBySector.default;
  const suggestions = suggestionTemplates.slice(0, 3);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMsg = { role: "user", text };
    const botReply: ChatMsg = {
      role: "bot",
      text: botAnswers[text] || "Teşekkürler! Bu konuda size yardımcı olmak isterim. Detaylı görüşmek için **Görüşmeler** sayfasından canlı desteğe bağlanabilirsiniz.",
    };
    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
  };

  const showButton = !open || minimized;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => { setOpen(true); setMinimized(false); }}
            className="fixed bottom-5 right-5 z-[9999] w-16 h-16 rounded-full gradient-primary shadow-premium-hover flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
            style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
          >
            <Bot className="w-7 h-7" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Widget */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed bottom-5 right-5 z-[9999] w-[380px] h-[520px] bg-card rounded-2xl shadow-premium-hover border border-border flex flex-col overflow-hidden max-sm:w-[calc(100vw-24px)] max-sm:h-[70vh] max-sm:right-3 max-sm:bottom-3"
          >
            {/* Header */}
            <div className="gradient-primary px-5 py-4 flex items-center gap-3 rounded-t-2xl shrink-0">
              <Bot className="w-6 h-6 text-primary-foreground" />
              <span className="font-bold text-primary-foreground flex-1">Dijital Asistan</span>
              <button onClick={() => setMinimized(true)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Minus className="w-5 h-5" />
              </button>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab} className="flex flex-col flex-1 min-h-0">
              <TabsList className="mx-4 mt-3 bg-muted/60 shrink-0">
                <TabsTrigger value="news" className="text-xs gap-1">📰 Haberler</TabsTrigger>
                <TabsTrigger value="tips" className="text-xs gap-1">💡 Öneriler</TabsTrigger>
                <TabsTrigger value="chat" className="text-xs gap-1">💬 Sohbet</TabsTrigger>
              </TabsList>

              {/* Tab 1: News */}
              <TabsContent value="news" className="flex-1 min-h-0 m-0">
                <ScrollArea className="h-full px-4 py-3">
                  <div className="space-y-3">
                    {news.map((n, i) => (
                      <div key={i} className="bg-background rounded-xl border border-border p-4 space-y-2">
                        <Badge variant="default" className="text-[10px]">{sector || "GENEL"}</Badge>
                        <p className="font-bold text-sm text-foreground leading-snug">{n.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{n.snippet}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-muted-foreground">{n.time}</span>
                          <button className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">Devamını Oku <ExternalLink className="w-3 h-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Tab 2: Tips */}
              <TabsContent value="tips" className="flex-1 min-h-0 m-0">
                <ScrollArea className="h-full px-4 py-3">
                  <div className="space-y-3">
                    {suggestions.map((s, i) => (
                      <div key={i} className="bg-primary/5 rounded-xl p-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-lg shrink-0">{s.icon}</span>
                          <div className="space-y-1">
                            <p className="font-bold text-sm text-foreground">{s.title}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm" className="w-full text-xs h-8">
                          <Link to={s.path}>{s.cta}</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Tab 3: Chat */}
              <TabsContent value="chat" className="flex-1 min-h-0 m-0 flex flex-col">
                <ScrollArea className="flex-1 px-4 py-3">
                  <div className="space-y-3">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md"}`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEnd} />
                  </div>

                  {/* Quick replies (show only at start) */}
                  {messages.length <= 2 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {quickReplies.map((q) => (
                        <button key={q} onClick={() => handleSend(q)} className="text-xs border-2 border-primary/30 text-primary rounded-full px-3 py-1.5 hover:bg-primary/10 transition-colors font-medium">
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {/* Input */}
                <div className="p-3 border-t border-border flex gap-2 shrink-0">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Sorunuzu yazın..."
                    className="flex-1 text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <Button size="icon" onClick={() => handleSend(input)} className="shrink-0 h-9 w-9">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistantWidget;
