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
import ProposalDetail from "./pages/ProposalDetail";
import Performance from "./pages/Performance";

import SettingsPage from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";


// Landing
import Landing from "./pages/Landing";

// KOBİ pages
import KobiLogin from "./pages/kobi/KobiLogin";
import KobiSignup from "./pages/kobi/KobiSignup";
import KobiResetPassword from "./pages/kobi/KobiResetPassword";

import Step1 from "./pages/kobi/Step1";
import Step2 from "./pages/kobi/Step2";
import Step3 from "./pages/kobi/Step3";

import Harita from "./pages/kobi/Harita";

import KobiProducts from "./pages/kobi/KobiProducts";
import TeklifTalebi from "./pages/kobi/TeklifTalebi";
import KobiTekliflerim from "./pages/kobi/KobiTekliflerim";
import KobiTeklifDetay from "./pages/kobi/KobiTeklifDetay";

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
            <Route path="/homepage" element={<Landing />} />

            {/* Bayi auth */}
            <Route path="/sales/login" element={<Login />} />
            <Route path="/sales/reset-password" element={<ResetPassword />} />

            {/* Bayi pages */}
            <Route path="/sales/dashboard" element={<Dashboard />} />
            <Route path="/sales/customer-analysis" element={<CustomerAnalysis />} />
            <Route path="/sales/products" element={<Products />} />
            <Route path="/sales/proposal-builder" element={<ProposalBuilder />} />
            <Route path="/sales/proposals" element={<Proposals />} />
            <Route path="/sales/proposals/:id" element={<ProposalDetail />} />
            <Route path="/sales/performance" element={<Performance />} />
            
            <Route path="/sales/settings" element={<SettingsPage />} />
            <Route path="/sales/notifications" element={<Notifications />} />
            

            {/* KOBİ auth */}
            <Route path="/digitalhub/login" element={<KobiLogin />} />
            <Route path="/digitalhub/signup" element={<KobiSignup />} />
            <Route path="/digitalhub/reset-password" element={<KobiResetPassword />} />

            {/* KOBİ onboarding */}
            
            <Route path="/digitalhub/onboarding1" element={<Step1 />} />
            <Route path="/digitalhub/onboarding2" element={<Step2 />} />
            <Route path="/digitalhub/onboarding3" element={<Step3 />} />

            {/* KOBİ main */}
            
            <Route path="/digitalhub/map" element={<Harita />} />
            
            <Route path="/digitalhub/products" element={<KobiProducts />} />
            <Route path="/digitalhub/quote-request" element={<TeklifTalebi />} />
            <Route path="/digitalhub/my-quotes" element={<KobiTekliflerim />} />
            <Route path="/digitalhub/my-quotes/:id" element={<KobiTeklifDetay />} />
            
            <Route path="/digitalhub/profile" element={<KobiProfile />} />
            <Route path="/digitalhub/notifications" element={<KobiBildirimler />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </OnboardingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
