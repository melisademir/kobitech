import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Map, Package, ShoppingCart, FileText, MessageCircle, User, Search, Bell, Menu, X, LogOut, ChevronDown, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import AiAssistantWidget from "@/components/kobi/AiAssistantWidget";
const navItems = [
  { icon: Map, label: "Harita", path: "/kobi/harita" },
  { icon: ClipboardList, label: "Planlarım", path: "/kobi/planlarim" },
  { icon: Package, label: "Çözümler", path: "/kobi/urunler" },
  { icon: FileText, label: "Tekliflerim", path: "/kobi/tekliflerim" },
  { icon: MessageCircle, label: "Görüşmeler", path: "/kobi/gorusmeler" },
  { icon: User, label: "Profilim", path: "/kobi/profile" },
];

interface Props { children: ReactNode; }

const KobiLayout = ({ children }: Props) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { count } = useCart();
  const { data: onboardingData } = useOnboarding();
  const businessName = onboardingData.businessName || "İşletme";
  const initials = businessName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border h-[70px] flex items-center px-6 shadow-card sticky top-0 z-40">
        <button className="lg:hidden mr-4 text-foreground" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
        <Link to="/kobi/dashboard" className="flex items-center gap-2 mr-8 shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">K</div>
          <span className="text-lg font-extrabold text-primary tracking-tight hidden sm:inline">KOBİ DİJİTAL</span>
        </Link>
        <div className="hidden md:flex flex-1 max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Çözüm ara..." className="w-full h-10 pl-10 pr-4 rounded-full bg-background border-2 border-border text-sm focus:border-primary focus:outline-none transition-colors" />
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <Link to="/kobi/notifications" className="relative text-muted-foreground hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
          </Link>
          <Link to="/kobi/urunler" className="relative text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{count}</span>}
          </Link>
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">{initials}</div>
              <span className="hidden sm:inline text-sm font-semibold text-foreground">{businessName}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-premium border border-border overflow-hidden z-50">
                  <Link to="/kobi/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 text-foreground hover:text-primary transition-colors"><User className="h-4 w-4" /> Profilim</Link>
                  <div className="border-t border-border" />
                  <Link to="/" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-destructive/5 text-muted-foreground hover:text-destructive transition-colors w-full"><LogOut className="h-4 w-4" /> Çıkış Yap</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden lg:block w-[260px] bg-card border-r border-border shrink-0">
          <nav className="p-4 space-y-1 sticky top-[70px]">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.label} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-secondary z-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
              <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} className="fixed left-0 top-0 bottom-0 w-[260px] bg-card z-50 lg:hidden shadow-premium-hover">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">K</div>
                    <span className="font-extrabold text-primary">KOBİ DİJİTAL</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
                </div>
                <nav className="p-4 space-y-1">
                  {navItems.map(item => {
                    const active = location.pathname === item.path;
                    return (
                      <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-background"}`}>
                        <item.icon className="h-5 w-5" /><span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
            {children}
          </motion.div>
        </main>
      </div>
      <AiAssistantWidget />
    </div>
  );
};

export default KobiLayout;
