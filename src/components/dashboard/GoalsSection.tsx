import { Lightbulb } from "lucide-react";

const GoalsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {/* Goal Card */}
    <div className="gradient-primary rounded-xl p-6 text-primary-foreground">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🎯</span>
        <span className="font-bold">Bu Ay Hedefi: 15 teklif gönder</span>
      </div>
      <div className="w-full bg-primary-foreground/20 rounded-full h-3 mb-2">
        <div className="bg-accent h-3 rounded-full transition-all" style={{ width: "80%" }} />
      </div>
      <p className="text-sm text-primary-foreground/80">12/15 — 3 teklif daha, hedefe ulaşacaksınız!</p>
    </div>

    {/* Tip Card */}
    <div className="bg-card border-l-4 border-primary rounded-xl p-6 shadow-card flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Lightbulb className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-sm">
          <span className="font-bold text-primary">İpucu: </span>
          <span className="text-foreground">
            Tekstil sektöründe en yüksek dönüşüm oranınız var (%57). Bu sektöre odaklanmayı düşünün.
          </span>
        </p>
      </div>
    </div>
  </div>
);

export default GoalsSection;
