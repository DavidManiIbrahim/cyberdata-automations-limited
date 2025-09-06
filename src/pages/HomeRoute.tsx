import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Index from "./Index";

export default function HomeRoute() {
  const { user } = useAuth();

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is not logged in, show landing page
  return <Index />;
}
