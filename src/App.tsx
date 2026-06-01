import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/hooks/use-theme";
import { FavoritesProvider } from "@/hooks/use-favorites";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import DeityPage from "./pages/DeityPage";
import AartiPage from "./pages/AartiPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutDeveloper from "./pages/AboutDeveloper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/deity/:id" element={<DeityPage />} />
        <Route path="/aarti/:id" element={<AartiPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about-developer" element={<AboutDeveloper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <FavoritesProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
