import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useTrackVisit } from "@/hooks/useTrackVisit";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Destinations from "./pages/Destinations.tsx";
import DestinationDetail from "./pages/DestinationDetail.tsx";
import Hotels from "./pages/Hotels.tsx";
import Booking from "./pages/Booking.tsx";
import Transport from "./pages/Transport.tsx";
import Compare from "./pages/Compare.tsx";
import Stories from "./pages/Stories.tsx";
import About from "./pages/About.tsx";
import TripPlanner from "./pages/TripPlanner.tsx";
import Budget from "./pages/Budget.tsx";
import News from "./pages/News.tsx";
import Events from "./pages/Events.tsx";
import FullMoon from "./pages/FullMoon.tsx";
import DayTrips from "./pages/DayTrips.tsx";
import Honeymoon from "./pages/Honeymoon.tsx";
import FriendsPlan from "./pages/FriendsPlan.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import ResortGuide from "./pages/ResortGuide.tsx";
import TripBudget from "./pages/TripBudget.tsx";
import LiveChatWidget from "./components/LiveChatWidget.tsx";
import AdminOnlyRoute from "./components/AdminOnlyRoute.tsx";

const queryClient = new QueryClient();

const RouteTracker = () => {
  useTrackVisit();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/transport" element={<AdminOnlyRoute feature="Transport"><Transport /></AdminOnlyRoute>} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/full-moon" element={<FullMoon />} />
          <Route path="/day-trips" element={<AdminOnlyRoute feature="Day Trips"><DayTrips /></AdminOnlyRoute>} />
          <Route path="/honeymoon" element={<AdminOnlyRoute feature="Honeymoon"><Honeymoon /></AdminOnlyRoute>} />
          <Route path="/friends-plan" element={<AdminOnlyRoute feature="Bondhu (Friends)"><FriendsPlan /></AdminOnlyRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/trip-guide" element={<ResortGuide />} />
          <Route path="/resort-guide" element={<Navigate to="/trip-guide" replace />} />
          <Route path="/trip-budget" element={<TripBudget />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LiveChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
