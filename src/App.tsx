import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer-analysis" element={<CustomerAnalysis />} />
          <Route path="/products" element={<Products />} />
          <Route path="/proposal-builder" element={<ProposalBuilder />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
