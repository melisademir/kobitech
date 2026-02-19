import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";

// Existing Bayi pages
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import CustomerAnalysis from "./pages/CustomerAnalysis";
import Products from "./pages/Products";
import ProposalBuilder from "./pages/ProposalBuilder";
import Proposals from "./pages/Proposals";
import Performance from "./pages/Performance";
import Commissions from "./pages/Commissions";
import SettingsPage from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import BayiGorusmeler from "./pages/bayi/BayiGorusmeler";

// Landing
import Landing from "./pages/Landing";

// KOBİ pages
import KobiLogin from "./pages/kobi/KobiLogin";
import KobiSignup from "./pages/kobi/KobiSignup";
import KobiResetPassword from "./pages/kobi/KobiResetPassword";

import Step1 from "./pages/kobi/Step1";
import Step2 from "./pages/kobi/Step2";
import Step3 from "./pages/kobi/Step3";
import KobiDashboard from "./pages/kobi/KobiDashboard";
import Harita from "./pages/kobi/Harita";
import Planlarim from "./pages/kobi/Planlarim";
import KobiProducts from "./pages/kobi/KobiProducts";
import TeklifTalebi from "./pages/kobi/TeklifTalebi";
import KobiTekliflerim from "./pages/kobi/KobiTekliflerim";
import KobiTeklifDetay from "./pages/kobi/KobiTeklifDetay";
import KobiGorusmeler from "./pages/kobi/KobiGorusmeler";
import KobiProfile from "./pages/kobi/KobiProfile";
import KobiBildirimler from "./pages/kobi/KobiBildirimler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OnboardingProvider>
        <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<Landing />} />

            {/* Bayi auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Bayi pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer-analysis" element={<CustomerAnalysis />} />
            <Route path="/products" element={<Products />} />
            <Route path="/proposal-builder" element={<ProposalBuilder />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/bayi/gorusmeler" element={<BayiGorusmeler />} />

            {/* KOBİ auth */}
            <Route path="/kobi/login" element={<KobiLogin />} />
            <Route path="/kobi/signup" element={<KobiSignup />} />
            <Route path="/kobi/reset-password" element={<KobiResetPassword />} />

            {/* KOBİ onboarding */}
            
            <Route path="/kobi/step-1" element={<Step1 />} />
            <Route path="/kobi/step-2" element={<Step2 />} />
            <Route path="/kobi/step-3" element={<Step3 />} />

            {/* KOBİ main */}
            <Route path="/kobi/dashboard" element={<KobiDashboard />} />
            <Route path="/kobi/harita" element={<Harita />} />
            <Route path="/kobi/planlarim" element={<Planlarim />} />
            <Route path="/kobi/urunler" element={<KobiProducts />} />
            <Route path="/kobi/teklif-talebi" element={<TeklifTalebi />} />
            <Route path="/kobi/tekliflerim" element={<KobiTekliflerim />} />
            <Route path="/kobi/tekliflerim/:id" element={<KobiTeklifDetay />} />
            <Route path="/kobi/gorusmeler" element={<KobiGorusmeler />} />
            <Route path="/kobi/profile" element={<KobiProfile />} />
            <Route path="/kobi/notifications" element={<KobiBildirimler />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </OnboardingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
