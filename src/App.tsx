
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Mision from "./pages/Mision";
import Vision from "./pages/Vision";
import Historia from "./pages/Historia";
import Eventos from "./pages/Eventos";
import Galeria from "./pages/Galeria";

import Contacto from "./pages/Contacto";
import AtletaLogin from "./pages/AtletaLogin";
import AtletaPerfil from "./pages/AtletaPerfil";
import NotFound from "./pages/NotFound";
import AthleteManagement from "./pages/AthleteManagement";
import AthleteRegistration from "./pages/AthleteRegistration";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import { SpeedInsights } from '@vercel/speed-insights/react';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        const newPassword = prompt('¿Cuál será tu nueva contraseña?');
        if (newPassword) {
          const { data, error } = await supabase.auth.updateUser({ password: newPassword });
          if (data) alert('¡Contraseña actualizada exitosamente!');
          if (error) alert('Error al actualizar la contraseña: ' + error.message);
        }
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/mision" element={<Mision />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/historia" element={<Historia />} />
              <Route path="/gestion-atletas" element={<AthleteManagement />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/registro-atleta" element={<AthleteRegistration />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/atleta-login" element={<AtletaLogin />} />
              <Route path="/atleta-perfil" element={<AtletaPerfil />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      <SpeedInsights />
    </>
  );
}

export default App;
