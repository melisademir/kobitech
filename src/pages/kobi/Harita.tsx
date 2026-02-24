import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import KobiLayout from "@/components/layout/KobiLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X, ChevronRight, Target, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { goalPlans, allGoals, type GoalPlan } from "@/data/goal-actions";
import { toast } from "@/hooks/use-toast";

const CHECKED_KEY = "kobi-goal-checked-items";

const Harita = () => {
  const { data: onboardingData, setData } = useOnboarding();
  const businessName = onboardingData.businessName || "İşletme";
  const [selectedGoals, setSelectedGoals] = useState<string[]>(onboardingData.goals || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalGoals, setModalGoals] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem(CHECKED_KEY) || "{}"); } catch { return {}; }
  });
  const [celebrateGoal, setCelebrateGoal] = useState<string | null>(null);

  useEffect(() => {
    setSelectedGoals(onboardingData.goals || []);
  }, [onboardingData.goals]);

  useEffect(() => {
    localStorage.setItem(CHECKED_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  const activePlans = goalPlans.filter(p => selectedGoals.includes(p.key));

  const toggleCheck = useCallback((id: string, plan: GoalPlan) => {
    setCheckedItems(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (!prev[id]) {
        toast({ title: "✓ Tamamlandı", description: plan.actions.find(a => a.id === id)?.text });
        const allDone = plan.actions.every(a => a.id === id ? true : next[a.id]);
        if (allDone) setTimeout(() => setCelebrateGoal(plan.name), 300);
      }
      return next;
    });
  }, []);

  const openEditModal = () => { setModalGoals([...selectedGoals]); setModalOpen(true); };
  const toggleModalGoal = (g: string) => setModalGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  const applyGoals = () => {
    setSelectedGoals(modalGoals);
    setData({ goals: modalGoals });
    setModalOpen(false);
    toast({ title: "Planınız güncellendi", description: `${modalGoals.length} hedef seçildi` });
  };

  const totalActions = activePlans.reduce((s, p) => s + p.actions.length, 0);
  const completedActions = activePlans.reduce((s, p) => s + p.actions.filter(a => checkedItems[a.id]).length, 0);
  const globalPercent = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  return (
    <KobiLayout>
      <div className="space-y-6 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{businessName} İçin Dijital Dönüşüm Planı</h1>
            <p className="text-muted-foreground mt-1">Büyüme hedeflerinize göre özel aksiyon planınız</p>
          </div>
        </div>

        {/* Goals Selection */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Büyüme Hedeflerim</h2>
            <Button variant="ghost" size="sm" onClick={openEditModal}><Plus className="h-4 w-4 mr-1" /> Hedef Ekle</Button>
          </div>
          {selectedGoals.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedGoals.map(g => {
                const goal = allGoals.find(ag => ag.name === g);
                return (
                  <Badge key={g} variant="secondary" className="text-sm py-1.5 px-3 gap-1.5">
                    <span>{goal?.icon}</span> {g}
                    <button onClick={() => { const next = selectedGoals.filter(x => x !== g); setSelectedGoals(next); setData({ goals: next }); }} className="ml-1 hover:text-destructive"><X className="h-3 w-3" /></button>
                  </Badge>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Henüz hedef seçilmedi. Düzenle butonuna tıklayarak hedeflerinizi belirleyin.</p>
          )}
        </div>

        {/* Action Plans or Empty State */}
        {activePlans.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl p-12 border border-border text-center shadow-card">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-xl font-bold text-foreground mb-2">Henüz hedef seçmediniz</h2>
            <p className="text-muted-foreground mb-6">Büyüme hedeflerinizi seçerek size özel aksiyon planları oluşturabilirsiniz</p>
            <Button variant="hero" onClick={openEditModal}><Sparkles className="h-4 w-4 mr-1" /> Hedeflerimi Seç</Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {activePlans.map((plan, idx) => {
              const done = plan.actions.filter(a => checkedItems[a.id]).length;
              const pct = Math.round((done / plan.actions.length) * 100);
              return (
                <motion.div key={plan.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                  className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
                  style={{ borderLeftWidth: 4, borderLeftColor: plan.categoryColor }}
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{plan.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-primary-foreground" style={{ backgroundColor: plan.categoryColor }}>{plan.category}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm font-medium text-muted-foreground">{done}/{plan.actions.length} tamamlandı</span>
                          <div className="flex-1 max-w-[200px]">
                            <Progress value={pct} className="h-2" />
                          </div>
                          <span className="text-sm font-bold text-primary">%{pct}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="px-6 pb-4">
                    <h4 className="text-sm font-bold text-foreground mb-3">✓ Yapılacaklar</h4>
                    <div className="space-y-2">
                      {plan.actions.map((action, i) => {
                        const checked = !!checkedItems[action.id];
                        return (
                          <button key={action.id} onClick={() => toggleCheck(action.id, plan)}
                            className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${checked ? "bg-success/5" : "bg-background hover:bg-muted/30"}`}
                          >
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${checked ? "bg-success border-success" : "border-border"}`}>
                              {checked && <Check className="h-4 w-4 text-success-foreground" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                <span className="font-bold mr-1">{i + 1}.</span>{action.text}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{action.helper}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommended Solutions */}
                  <div className="px-6 pb-6 pt-2 border-t border-border">
                    <h4 className="text-sm font-bold text-foreground mb-3">Bu Hedef İçin Önerilen Çözümler</h4>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {plan.solutions.map(sol => (
                        <Link key={sol.name} to={sol.link} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-card transition-all shrink-0">
                          <span className="text-sm font-medium text-foreground">{sol.name}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                    <Link to="/kobi/urunler" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline mt-3">
                      Bu hedefe özel tüm çözümleri gör <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-premium z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground text-center sm:text-left">Hedeflerinize ulaşmak için gerekli çözümleri keşfedin</p>
          <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
            <Link to="/kobi/urunler">Çözümleri Keşfet <ArrowRight className="h-5 w-5 ml-1" /></Link>
          </Button>
        </div>
      </div>

      {/* Goal Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Hedeflerimi Düzenle</DialogTitle>
            <DialogDescription>Büyüme hedeflerinizi seçin, planınız otomatik güncellenecek.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {allGoals.map(g => (
              <button key={g.name} onClick={() => toggleModalGoal(g.name)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${modalGoals.includes(g.name) ? "border-primary bg-primary/5 shadow-premium" : "border-border hover:border-primary/30 bg-card"}`}
              >
                <span className="text-2xl">{g.icon}</span>
                <span className="text-xs font-medium text-foreground text-center">{g.name}</span>
              </button>
            ))}
          </div>
          <Button onClick={applyGoals} variant="hero" className="w-full mt-4">Planı Güncelle</Button>
        </DialogContent>
      </Dialog>

      {/* Celebration Modal */}
      <Dialog open={!!celebrateGoal} onOpenChange={() => setCelebrateGoal(null)}>
        <DialogContent className="text-center max-w-sm">
          <div className="text-6xl mb-4">🎉</div>
          <DialogHeader>
            <DialogTitle>{celebrateGoal} planınızı tamamladınız!</DialogTitle>
            <DialogDescription>Harika iş! +50 XP kazandınız. Yeni hedefler ekleyerek yolculuğunuza devam edin.</DialogDescription>
          </DialogHeader>
          <Button variant="hero" onClick={() => setCelebrateGoal(null)} className="mt-4">Devam Et</Button>
        </DialogContent>
      </Dialog>
    </KobiLayout>
  );
};

export default Harita;
