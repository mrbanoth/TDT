
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import TawkToButton from "./components/chat/TawkToButton";
import { routes } from "./routes";

// Create a single QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Main App Router Component
const AppRouter = () => {
  const element = useRoutes(routes);
  
  return (
    <div 
      className="min-h-screen flex flex-col" 
      style={{
        scrollBehavior: 'auto',
        scrollSnapType: 'none',
        overscrollBehavior: 'none',
        position: 'relative'
      }}
    >
      {element}
      <div className="fixed bottom-6 right-6 z-50">
        <TawkToButton />
      </div>
    </div>
  );
};

// Main App Component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
