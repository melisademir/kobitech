import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Target, Package, FileText, TrendingUp, Settings,
  Search, Bell, ChevronDown, LogOut, User, DollarSign, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickAccess from "@/components/dashboard/QuickAccess";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ActiveCustomers from "@/components/dashboard/ActiveCustomers";
import GoalsSection from "@/components/dashboard/GoalsSection";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Target, label: "Müşteri Analizi", path: "/customer-analysis" },
  { icon: Package, label: "Param Ürünleri", path: "/products", badge: "21" },
  { icon: FileText, label: "Tekliflerim", path: "/proposals", badgeCount: 3 },
  { icon: TrendingUp, label: "Performansım", path: "/performance" },
  { icon: Settings, label: "Ayarlar", path: "/settings" },
];

const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dealerName = "Ahmet Yılmaz";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="bg-card border-b border-border h-[70px] flex items-center px-6 shadow-card sticky top-0 z-40">
        <button className="lg:hidden mr-4 text-foreground" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>

        <Link to="/dashboard" className="flex items-center gap-2 mr-8 shrink-0">
          <span className="text-xl">🎯</span>
          <span className="text-lg font-extrabold text-primary tracking-tight hidden sm:inline">SALESPARTNER</span>
        </Link>

        {/* Search */}
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
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-premium border border-border overflow-hidden z-50"
                >
                  <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 text-foreground hover:text-primary transition-colors">
                    <User className="h-4 w-4" /> Profilim
                  </Link>
                  <Link to="/commissions" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 text-foreground hover:text-primary transition-colors">
                    <DollarSign className="h-4 w-4" /> Komisyonlarım
                  </Link>
                  <div className="border-t border-border" />
                  <button className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-destructive/5 text-muted-foreground hover:text-destructive transition-colors w-full">
                    <LogOut className="h-4 w-4" /> Çıkış Yap
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-[260px] bg-card border-r border-border shrink-0">
          <nav className="p-4 space-y-1 sticky top-[70px]">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-xs text-muted-foreground">({item.badge})</span>
                  )}
                  {item.badgeCount && (
                    <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                      {item.badgeCount}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
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
                  {navItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-background"
                        }`}
                      >
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

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
            {/* Welcome */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Hoş Geldiniz, <span className="text-primary">{dealerName}</span>! 👋
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Son giriş: 17 Şubat 2026, 09:45</p>
            </div>

            <StatsCards />
            <QuickAccess />
            <PerformanceChart />
            <RecentActivity />
            <ActiveCustomers />
            <GoalsSection />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
