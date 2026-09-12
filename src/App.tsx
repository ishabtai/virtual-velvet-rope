import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// HashRouter, not BrowserRouter: on static hosting there is no server to
// rewrite /report back to index.html, so a refresh or a shared deep link would
// 404. The hash keeps every route addressable with no server involved.
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Report from "./pages/Report";
import Polls from "./pages/Polls";
import Methodology from "./pages/Methodology";
import Simulator from "./pages/Simulator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Snapshots change once a day at most, so there is nothing to gain from
      // refetching on every focus — and a forecast that changes while you read
      // it is disconcerting.
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report" element={<Report />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/simulator" element={<Simulator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
