
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import RouteTransition from "./components/RouteTransition";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import PasswordManagerCode from "./pages/PasswordManagerCode";
import PasswordManagerApp from "./pages/PasswordManagerApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <RouteTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/code/encrypted-password-manager" element={<PasswordManagerCode />} />
            <Route path="/app/encrypted-password-manager" element={<PasswordManagerApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteTransition>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
