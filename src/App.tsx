
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Prestations from "./pages/Prestations";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import TableAdmin from "./pages/TableAdmin";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prestations" element={
              <Layout>
                <Prestations />
              </Layout>
            } />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={
              <ProtectedRoute requiresAuth={true}>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/table-admin" element={
              <ProtectedRoute requiresAuth={true}>
                <TableAdmin />
              </ProtectedRoute>
            } />
            {/* Handle hash routes for smoother navigation */}
            <Route path="/#home" element={<Navigate to="/" />} />
            <Route path="/#about" element={<Navigate to="/" />} />
            <Route path="/#projects" element={<Navigate to="/" />} />
            <Route path="/#contact" element={<Navigate to="/" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
