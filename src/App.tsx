import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Certificates from "./pages/Certificates";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enroll from "./pages/Enroll";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCertificates from "./pages/AdminCertificates";
import AdminAnalytics from "./pages/AdminAnalytics";
import NotFound from "./pages/NotFound";
import ViewCourses from "./pages/ViewCourses";
import Assignments from "./pages/Assignments";
import Settings from "./pages/Settings";
import HomeRoute from "./pages/HomeRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Alternative routes without layout */}
            <Route path="/profile" element={<DashboardLayout />}>
              <Route index element={<Profile />} />
            </Route>

            <Route path="/certificates" element={<DashboardLayout />}>
              <Route index element={<Certificates />} />
            </Route>

            <Route path="/view-courses" element={<DashboardLayout />}>
              <Route index element={<ViewCourses />} />
            </Route>

            <Route path="/assignments" element={<DashboardLayout />}>
              <Route index element={<Assignments />} />
            </Route>

            <Route path="/settings" element={<DashboardLayout />}>
              <Route index element={<Settings />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/certificates" element={<AdminCertificates />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
