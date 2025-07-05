
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Programmes from "./pages/Programmes";
import Events from "./pages/Events";
import Donate from "./pages/Donate";
import ProfilePage from "./pages/ProfilePage";
import StoryDetail from "./pages/StoryDetail";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/programs/Gallery";
import ProgramDetail from "./pages/programs/ProgramDetail";
import OurApproach from "./pages/OurApproach";
import EventDetail from "./pages/EventDetail";
import AllEvents from "./pages/AllEvents";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col" style={{
          scrollBehavior: 'auto',
          scrollSnapType: 'none',
          overscrollBehavior: 'none'
        }}>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes" element={<Programmes />} />
          
          {/* Program Routes */}
          <Route path="/programs/gallery" element={<Gallery />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/our-approach" element={<OurApproach />} />
          
          <Route path="/events" element={<Events />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
