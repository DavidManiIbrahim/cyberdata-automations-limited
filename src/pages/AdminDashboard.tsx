import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, BookOpen, TrendingUp, Bell, Award, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubmissions: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    newUsers: 0,
    pendingCertificates: 0,
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: user.id,
          _role: "admin",
        });

        if (error) throw error;

        if (!data) {
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setIsAdmin(true);
        fetchStats();
      } catch (error) {
        console.error("Error checking admin access:", error);
        navigate("/");
      }
    };

    if (!loading) {
      checkAdminAccess();
    }
  }, [user, loading, navigate, toast]);

  const fetchStats = async () => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Get total users (profiles)
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get new users in last 7 days
      const { count: newUserCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo.toISOString());

      // Get recent users for notifications
      const { data: recentUsersData } = await supabase
        .from("profiles")
        .select("full_name, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      // Get total contact submissions
      const { count: submissionCount } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true });

      // Get total courses
      const { count: courseCount } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true });

      // Get total enrollments
      const { count: enrollmentCount } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true });

      // Get pending certificates (completed enrollments)
      const { count: pendingCertCount } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed");

      setStats({
        totalUsers: userCount || 0,
        totalSubmissions: submissionCount || 0,
        totalCourses: courseCount || 0,
        totalEnrollments: enrollmentCount || 0,
        newUsers: newUserCount || 0,
        pendingCertificates: pendingCertCount || 0,
      });

      setRecentUsers(recentUsersData || []);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your platform and monitor analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Bell className="h-4 w-4 text-primary" />
                New Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.newUsers}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Award className="h-4 w-4 text-accent" />
                Pending Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.pendingCertificates}</div>
              <p className="text-xs text-muted-foreground">Ready to approve</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <MessageSquare className="h-4 w-4" />
                Contact Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">Total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">Available courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                Enrollments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEnrollments}</div>
              <p className="text-xs text-muted-foreground">Course enrollments</p>
            </CardContent>
          </Card>
        </div>

        {/* New User Notifications */}
        {stats.newUsers > 0 && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Bell className="h-5 w-5" />
                Recent User Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{user.full_name || 'New User'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => navigate("/admin/users")}
              >
                Manage All Users
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/users")}
                className="w-full"
                size="lg"
              >
                <Users className="mr-2 h-4 w-4" />
                Manage Users ({stats.totalUsers})
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificate Approval</CardTitle>
              <CardDescription>
                Review and approve completed courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/certificates")}
                className="w-full"
                variant={stats.pendingCertificates > 0 ? "default" : "outline"}
              >
                {stats.pendingCertificates > 0 && (
                  <Badge className="mr-2">{stats.pendingCertificates}</Badge>
                )}
                Approve Certificates
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                View detailed analytics and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin/analytics")}
                className="w-full"
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;