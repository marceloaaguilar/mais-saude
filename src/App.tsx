import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DiscountsPage from "./pages/Discounts";
import Telemedicine from "./pages/Telemedicine";
import MedicineClub from "./pages/MedicineClub";
import NotFound from "./pages/NotFound";
import FuneralPage from "./pages/FuneralPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/desconto" element={<DiscountsPage />} />
          <Route path="/telemedicina" element={<Telemedicine />} />
          <Route path="/clube-medicamentos" element={<MedicineClub />} />
          <Route path="/funeral" element={<FuneralPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
