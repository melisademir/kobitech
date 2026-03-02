import { useState } from "react";
import { Link } from "react-router-dom";
import KobiLayout from "@/components/layout/KobiLayout";
import { motion } from "framer-motion";
import { Check, ChevronRight, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { goalPlans } from "@/data/goal-actions";

const CHECKED_KEY = "kobi-goal-checked-items";

const Planlarim = () => {
  const { data: onboardingData } = useOnboarding();
  const selectedGoals = onboardingData.goals || [];
  const [checkedItems] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem(CHECKED_KEY) || "{}"); } catch { return {}; }
  });

  const activePlans = goalPlans.filter(p => selectedGoals.includes(p.key));

  const getProgress = (plan: typeof goalPlans[0]) => {
    const done = plan.actions.filter(a => checkedItems[a.id]).length;
    return { done, total: plan.actions.length, pct: Math.round((done / plan.actions.length) * 100) };
  };

  const completedPlans = activePlans.filter(p => getProgress(p).pct === 100);
  const inProgressPlans = activePlans.filter(p => { const pg = getProgress(p); return pg.pct > 0 && pg.pct < 100; });
  const notStartedPlans = activePlans.filter(p => getProgress(p).pct === 0);
  const activeTab = inProgressPlans.length > 0 || notStartedPlans.length > 0 ? "active" : "completed";

  const PlanList = ({ plans }: { plans: typeof activePlans }) => (
    <div className="space-y-4">
      {plans.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Bu kategoride plan bulunmuyor.</p>
        </div>
      )}
      {plans.map((plan, idx) => {
        const { done, total, pct } = getProgress(plan);
        return (
          <motion.div key={plan.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-2xl border border-border shadow-card p-5"
            style={{ borderLeftWidth: 4, borderLeftColor: plan.categoryColor }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{plan.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-foreground">{plan.name}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-primary-foreground" style={{ backgroundColor: plan.categoryColor }}>{plan.category}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Progress value={pct} className="h-2 flex-1 max-w-[180px]" />
                  <span className="text-sm font-medium text-muted-foreground">{done}/{total}</span>
                </div>
              </div>
              <Link to="/digitalhub/map" className="text-primary hover:underline text-sm font-bold flex items-center gap-1 shrink-0">
                Detay <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <KobiLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Planlarım</h1>
          <p className="text-muted-foreground mt-1">Tüm hedef planlarınızın detaylı görünümü</p>
        </div>

        {activePlans.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 border border-border text-center">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-lg font-bold text-foreground mb-2">Henüz planınız yok</h2>
            <p className="text-muted-foreground mb-4">Harita sayfasından hedeflerinizi seçerek planlarınızı oluşturun</p>
            <Button asChild variant="hero"><Link to="/digitalhub/map">Haritaya Git <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
          </div>
        ) : (
          <Tabs defaultValue={activeTab}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="active">Aktif ({inProgressPlans.length + notStartedPlans.length})</TabsTrigger>
              <TabsTrigger value="completed">Tamamlanan ({completedPlans.length})</TabsTrigger>
              <TabsTrigger value="all">Tüm Hedefler ({activePlans.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="active"><PlanList plans={[...inProgressPlans, ...notStartedPlans]} /></TabsContent>
            <TabsContent value="completed"><PlanList plans={completedPlans} /></TabsContent>
            <TabsContent value="all"><PlanList plans={activePlans} /></TabsContent>
          </Tabs>
        )}
      </div>
    </KobiLayout>
  );
};

export default Planlarim;
