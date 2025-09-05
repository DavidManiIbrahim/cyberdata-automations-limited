import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, Calendar, User, TrendingUp, BookOpen, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminAnalytics = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalEnrollments: 0,
    completedCourses: 0,
    activeCourses: 0,
    monthlyGrowth: 0,
    topCourses: [] as Array<{course: string, enrollments: number}>,
    recentActivity: [] as Array<{type: string, description: string, date: string}>,
  });

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
        fetchAnalytics();
        fetchSubmissions();
      } catch (error) {
        console.error("Error checking admin access:", error);
        navigate("/");
      }
    };

    if (!loading) {
      checkAdminAccess();
    }
  }, [user, loading, navigate, toast]);

  const fetchAnalytics = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Get total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get users from last month for growth calculation
      const { count: previousMonthUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .lt("created_at", thirtyDaysAgo.toISOString());

      // Get total enrollments
      const { count: totalEnrollments } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true });

      // Get completed courses
      const { count: completedCourses } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .in("status", ["completed", "certified"]);

      // Get active courses
      const { count: activeCourses } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Get top courses by enrollment
      const { data: courseEnrollments } = await supabase
        .from("enrollments")
        .select(`
          courses (title)
        `)
        .not("courses", "is", null);

      const courseCounts: Record<string, number> = {};
      courseEnrollments?.forEach((enrollment: any) => {
        const courseTitle = enrollment.courses?.title;
        if (courseTitle) {
          courseCounts[courseTitle] = (courseCounts[courseTitle] || 0) + 1;
        }
      });

      const topCourses = Object.entries(courseCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([course, enrollments]) => ({ course, enrollments }));

      // Get recent activity
      const { data: recentEnrollments } = await supabase
        .from("enrollments")
        .select(`
          enrolled_at,
          profiles (full_name),
          courses (title)
        `)
        .order("enrolled_at", { ascending: false })
        .limit(5);

      const recentActivity = recentEnrollments?.map((enrollment: any) => ({
        type: "enrollment",
        description: `${enrollment.profiles?.full_name || "User"} enrolled in ${enrollment.courses?.title || "a course"}`,
        date: enrollment.enrolled_at,
      })) || [];

      const monthlyGrowth = previousMonthUsers ? 
        Math.round(((totalUsers || 0) - previousMonthUsers) / previousMonthUsers * 100) : 0;

      setAnalytics({
        totalUsers: totalUsers || 0,
        totalEnrollments: totalEnrollments || 0,
        completedCourses: completedCourses || 0,
        activeCourses: activeCourses || 0,
        monthlyGrowth,
        topCourses,
        recentActivity,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoadingSubmissions(true);
      
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch contact submissions.",
        variant: "destructive",
      });
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === id ? { ...sub, status } : sub
        )
      );

      toast({
        title: "Success",
        description: "Submission status updated.",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "destructive";
      case "in_progress":
        return "secondary";
      case "resolved":
        return "outline";
      default:
        return "outline";
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
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/admin")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive platform analytics and user insights</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalUsers}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {analytics.monthlyGrowth > 0 ? '+' : ''}{analytics.monthlyGrowth}% this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                Total Enrollments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalEnrollments}</div>
              <p className="text-xs text-muted-foreground">Course enrollments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Award className="h-4 w-4" />
                Completed Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.completedCourses}</div>
              <p className="text-xs text-muted-foreground">Finished learning</p>
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
              <div className="text-2xl font-bold">{analytics.activeCourses}</div>
              <p className="text-xs text-muted-foreground">Available courses</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.topCourses.map((course, index) => (
                  <div key={course.course} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="font-medium text-sm">{course.course}</span>
                    </div>
                    <Badge variant="outline">{course.enrollments} enrollments</Badge>
                  </div>
                ))}
                {analytics.topCourses.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No course data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()} at{" "}
                        {new Date(activity.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {analytics.recentActivity.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No recent activity
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Form Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSubmissions ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.slice(0, 5).map((submission) => (
                  <Card key={submission.id} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{submission.name}</span>
                        <Badge variant={getStatusColor(submission.status) as any}>
                          {submission.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSubmissionStatus(submission.id, "in_progress")}
                          disabled={submission.status === "in_progress"}
                        >
                          In Progress
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSubmissionStatus(submission.id, "resolved")}
                          disabled={submission.status === "resolved"}
                        >
                          Resolved
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{submission.email}</span>
                      </div>
                      {submission.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{submission.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(submission.created_at).toLocaleDateString()} at{" "}
                          {new Date(submission.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-sm">Subject: </span>
                        <span className="text-sm">{submission.subject}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Message: </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {submission.message}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {submissions.length > 5 && (
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Showing 5 of {submissions.length} submissions
                    </p>
                    <Button variant="outline" size="sm">
                      View All Submissions
                    </Button>
                  </div>
                )}
                
                {submissions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No contact submissions yet.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminAnalytics;