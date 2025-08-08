import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BusinessPitchRegister from "./pages/BusinessPitchRegister";
import VendorStandBooking from "./pages/VendorStandBooking";
import FreePassRegistration from "./pages/FreePassRegistration";
import DinnerTicketPurchase from "./pages/DinnerTicketPurchase";
import VotingPage from "./pages/VotingPage";
import NomineeDashboard from "./pages/NomineeDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../context/ProtectedRoute";
const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/register-business-pitch"
              element={<BusinessPitchRegister />}
            />
            <Route path="/book-vendor-stand" element={<VendorStandBooking />} />
            <Route path="/get-free-pass" element={<FreePassRegistration />} />
            <Route
              path="/buy-dinner-ticket"
              element={<DinnerTicketPurchase />}
            />
            <Route path="/voting" element={<VotingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/nominee-dashboard"
              element={
                <ProtectedRoute>
                  <NomineeDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
