import { motion } from "framer-motion";

/* ── Simplified Harita (Desktop) content ── */
const HaritaScreen = () => (
  <div className="w-full h-full bg-white text-gray-900 overflow-hidden" style={{ fontSize: "8px" }}>
    {/* Top nav */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-violet-600" />
        <span className="font-bold text-violet-700" style={{ fontSize: "10px" }}>KobiTECH</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-28 h-5 rounded-lg bg-gray-100 flex items-center px-2">
          <span className="text-gray-400" style={{ fontSize: "7px" }}>🔍 Çözüm ara...</span>
        </div>
        <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center">
          <span style={{ fontSize: "7px" }}>🔔</span>
        </div>
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-violet-700" />
      </div>
    </div>

    <div className="flex">
      {/* Sidebar */}
      <div className="w-24 border-r border-gray-100 py-3 px-2 space-y-1">
        {["🗺️ Harita", "📋 Planlarım", "📦 Çözümler", "📄 Tekliflerim", "💬 Görüşmeler", "👤 Profilim"].map((item, i) => (
          <div
            key={item}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg ${i === 0 ? "bg-violet-50 text-violet-700 font-bold" : "text-gray-500"}`}
            style={{ fontSize: "7px" }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 space-y-3">
        <div>
          <h2 className="font-extrabold text-gray-900" style={{ fontSize: "13px" }}>İşletme İçin Dijital Dönüşüm Planı</h2>
          <p className="text-gray-400" style={{ fontSize: "8px" }}>Büyüme hedeflerinize göre özel aksiyon planınız</p>
        </div>

        {/* Goals bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-700" style={{ fontSize: "9px" }}>🎯 Büyüme Hedeflerim</span>
            <span className="text-violet-600" style={{ fontSize: "7px" }}>+ Hedef Ekle</span>
          </div>
          <div className="flex gap-1.5">
            {[
              { icon: "🛒", label: "E-TİCARETE GEÇMEK", color: "bg-violet-100 text-violet-800 border-violet-200" },
              { icon: "📈", label: "SATIŞLARI ARTIRMAK", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              { icon: "💳", label: "ÖDEME SÜREÇLERİ", color: "bg-amber-50 text-amber-700 border-amber-200" },
            ].map(g => (
              <span key={g.label} className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-full border font-bold ${g.color}`} style={{ fontSize: "6px" }}>
                {g.icon} {g.label} ✕
              </span>
            ))}
          </div>
        </div>

        {/* Action card */}
        <div className="bg-white rounded-xl border border-gray-100 p-3" style={{ borderLeft: "3px solid #7C3AED" }}>
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: "16px" }}>📈</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-800" style={{ fontSize: "10px" }}>Satışları artırmak</span>
                <span className="px-1.5 py-0.5 rounded-full bg-violet-600 text-white font-bold" style={{ fontSize: "5px" }}>E-Ticarete Açıl</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400" style={{ fontSize: "7px" }}>2/6 tamamlandı</span>
                <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-600" style={{ width: "33%" }} />
                </div>
                <span className="font-bold text-violet-600" style={{ fontSize: "7px" }}>%33</span>
              </div>
            </div>
          </div>
          <p className="font-bold text-gray-700 mb-1.5" style={{ fontSize: "8px" }}>✓ Yapılacaklar</p>
          <div className="space-y-1">
            {[
              { text: "E-ticaret satış kanalı aç", done: true },
              { text: "Online ödeme sistemini kur", done: true },
              { text: "Dijital pazarlama stratejisi oluştur", done: false },
              { text: "Çoklu satış kanalı entegrasyonu yap", done: false },
            ].map(item => (
              <div key={item.text} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${item.done ? "bg-emerald-50" : "bg-gray-50"}`}>
                <div className={`w-3 h-3 rounded flex items-center justify-center shrink-0 ${item.done ? "bg-emerald-500" : "border border-gray-300"}`}>
                  {item.done && <span className="text-white" style={{ fontSize: "6px" }}>✓</span>}
                </div>
                <span className={`${item.done ? "line-through text-gray-400" : "text-gray-700"}`} style={{ fontSize: "7px" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── Simplified Ürünler (Mobile) content ── */
const UrunlerScreen = () => (
  <div className="w-full h-full bg-white text-gray-900 overflow-hidden" style={{ fontSize: "8px" }}>
    {/* Status bar */}
    <div className="flex items-center justify-between px-3 py-1" style={{ fontSize: "7px" }}>
      <span className="font-bold">9:41</span>
      <div className="flex gap-1">
        <span>📶</span><span>🔋</span>
      </div>
    </div>

    {/* Header */}
    <div className="px-3 pt-1 pb-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-extrabold text-gray-900" style={{ fontSize: "13px" }}>Çözümler</h2>
        <span className="text-gray-400" style={{ fontSize: "8px" }}>🛒 Sepetim</span>
      </div>
      <p className="text-gray-400" style={{ fontSize: "7px" }}>İşletmenize uygun dijital çözümleri keşfedin</p>
    </div>

    {/* Tabs */}
    <div className="px-3 flex gap-1 overflow-hidden pb-2">
      {["Tümü", "E-Ticarete Açıl", "Ödeme Al", "Paranı Yönet"].map((t, i) => (
        <span
          key={t}
          className={`whitespace-nowrap px-2 py-1 rounded-full font-bold shrink-0 ${i === 0 ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white" : "bg-gray-100 text-gray-500"}`}
          style={{ fontSize: "6px" }}
        >
          {t}
        </span>
      ))}
    </div>

    {/* Product cards */}
    <div className="px-3 space-y-2">
      {[
        { name: "ParamPOS Sanal POS", cat: "ÖDEME ÇÖZÜMLERİ", sectors: [["E-ticaret", 95], ["Perakende", 90], ["Hizmet", 85]], setup: "2 gün" },
        { name: "Param Fiziki POS", cat: "ÖDEME ÇÖZÜMLERİ", sectors: [["Perakende", 95], ["Restoran/Kafe", 95], ["Gıda", 90]], setup: "2 gün" },
        { name: "Param CepPOS", cat: "ÖDEME ÇÖZÜMLERİ", sectors: [["Hizmet", 95], ["Restoran/Kafe", 90], ["Perakende", 85]], setup: "1 gün" },
      ].map(p => (
        <div key={p.name} className="bg-white rounded-xl border border-gray-100 p-2.5 shadow-sm">
          <div className="flex items-start justify-between mb-1.5">
            <span className="font-bold text-gray-800" style={{ fontSize: "9px" }}>{p.name}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 font-bold" style={{ fontSize: "5px" }}>{p.cat}</span>
          </div>
          <div className="space-y-0.5 mb-2">
            {p.sectors.map(([name, score]) => (
              <div key={name as string} className="flex items-center justify-between">
                <span className="text-gray-500" style={{ fontSize: "6.5px" }}>{name as string}</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} style={{ fontSize: "6px", color: i <= Math.floor((score as number) / 20) ? "#10B981" : "#E5E7EB" }}>★</span>
                  ))}
                  <span className="font-bold text-gray-500 ml-0.5" style={{ fontSize: "6px" }}>%{score as number}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-gray-400 mb-2" style={{ fontSize: "6px" }}>⏱ Kurulum: {p.setup}</div>
          <div className="flex gap-1">
            <button className="flex-1 py-1 rounded-lg border border-gray-200 text-gray-600 font-bold" style={{ fontSize: "6.5px" }}>Detaylı Bilgi</button>
            <button className="flex-1 py-1 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 text-white font-bold" style={{ fontSize: "6.5px" }}>🛒 Sepete Ekle</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } }
};

const HeroMockup = () => (
  <motion.div variants={itemVariants} className="mt-12 -mb-16 relative">
    {/* Brand gradient background */}
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, hsl(263,70%,18%) 0%, hsl(263,60%,28%) 35%, hsl(270,50%,22%) 65%, hsl(258,65%,15%) 100%)",
        transform: "scale(1.04, 1.08)",
        zIndex: 0,
      }}
    />

    {/* Devices container */}
    <div
      className="relative z-10 flex items-center justify-center gap-4 md:gap-8 px-6 py-8 md:py-12"
      style={{ perspective: "1200px" }}
    >
      {/* Desktop - Harita */}
      <div
        className="relative w-[55%] md:w-[60%] max-w-[580px]"
        style={{
          transform: "rotateY(6deg) rotateX(2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Laptop frame */}
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{
            border: "3px solid #1F1F2E",
            background: "#1F1F2E",
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.5), 0 15px 30px -10px rgba(109,40,217,0.2)",
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2A2A3C]">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-3">
              <div className="bg-[#1F1F2E] rounded px-2 py-0.5 text-center" style={{ fontSize: "6px", color: "#888" }}>
                kobitech.lovable.app/kobi/harita
              </div>
            </div>
          </div>
          {/* Screen content */}
          <div className="aspect-[16/10] overflow-hidden">
            <HaritaScreen />
          </div>
        </div>
        {/* Laptop base */}
        <div
          className="mx-auto mt-0 h-2 rounded-b-lg"
          style={{
            width: "60%",
            background: "linear-gradient(180deg, #1F1F2E, #15151F)",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        />
      </div>

      {/* Mobile - Ürünler */}
      <div
        className="relative w-[22%] md:w-[18%] max-w-[180px]"
        style={{
          transform: "rotateY(-8deg) rotateX(2deg) translateY(10px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="rounded-[16px] overflow-hidden shadow-2xl"
          style={{
            border: "4px solid #1F1F2E",
            background: "#1F1F2E",
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.5), 0 15px 30px -10px rgba(109,40,217,0.2)",
          }}
        >
          {/* Notch */}
          <div className="flex justify-center py-0.5 bg-[#1F1F2E]">
            <div className="w-12 h-1.5 rounded-full bg-[#2A2A3C]" />
          </div>
          {/* Screen */}
          <div className="aspect-[9/19.5] overflow-hidden bg-white">
            <UrunlerScreen />
          </div>
          {/* Home indicator */}
          <div className="flex justify-center py-1 bg-[#1F1F2E]">
            <div className="w-8 h-1 rounded-full bg-[#3A3A4C]" />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default HeroMockup;
