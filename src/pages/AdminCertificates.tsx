import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, CheckCircle, User, Clock, Calendar } from "lucide-react";
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

interface EnrollmentData {
  id: string;
  user_id: string;
  progress: number;
  status: string;
  completed_at: string | null;
  profiles: {
    full_name: string | null;
  } | null;
  courses: {
    title: string;
    category: string;
    duration_weeks: number;
  } | null;
}

const AdminCertificates = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);

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
        fetchEnrollments();
      } catch (error) {
        console.error("Error checking admin access:", error);
        navigate("/");
      }
    };

    if (!loading) {
      checkAdminAccess();
    }
  }, [user, loading, navigate, toast]);

  const fetchEnrollments = async () => {
    try {
      setLoadingEnrollments(true);
      
      // First get enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select("id, user_id, progress, status, completed_at, course_id")
        .eq("status", "completed")
        .order("completed_at", { ascending: false });

      if (enrollmentsError) throw enrollmentsError;

      if (!enrollmentsData || enrollmentsData.length === 0) {
        setEnrollments([]);
        return;
      }

      // Get user profiles
      const userIds = enrollmentsData.map(e => e.user_id);
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", userIds);

      if (profilesError) throw profilesError;

      // Get courses
      const courseIds = enrollmentsData.map(e => e.course_id);
      const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select("id, title, category, duration_weeks")
        .in("id", courseIds);

      if (coursesError) throw coursesError;

      // Combine the data
      const combinedData: EnrollmentData[] = enrollmentsData.map(enrollment => {
        const profile = profiles?.find(p => p.user_id === enrollment.user_id);
        const course = courses?.find(c => c.id === enrollment.course_id);
        
        return {
          id: enrollment.id,
          user_id: enrollment.user_id,
          progress: enrollment.progress,
          status: enrollment.status,
          completed_at: enrollment.completed_at,
          profiles: profile ? { full_name: profile.full_name } : null,
          courses: course ? { 
            title: course.title, 
            category: course.category, 
            duration_weeks: course.duration_weeks 
          } : null,
        };
      });

      setEnrollments(combinedData);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch enrollments.",
        variant: "destructive",
      });
    } finally {
      setLoadingEnrollments(false);
    }
  };

  const approveCertificate = async (enrollmentId: string) => {
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({ status: "certified" })
        .eq("id", enrollmentId);

      if (error) throw error;

      // Update local state
      setEnrollments(prev => 
        prev.map(enrollment => 
          enrollment.id === enrollmentId 
            ? { ...enrollment, status: "certified" }
            : enrollment
        )
      );

      toast({
        title: "Certificate Approved",
        description: "The certificate has been successfully approved.",
      });
    } catch (error) {
      console.error("Error approving certificate:", error);
      toast({
        title: "Error",
        description: "Failed to approve certificate.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending Approval
          </Badge>
        );
      case "certified":
        return (
          <Badge variant="default" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Certified
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Certificate Management</h1>
          <p className="text-muted-foreground">Review and approve course completion certificates</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Pending Certificate Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingEnrollments ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {enrollment.profiles?.full_name || "No name provided"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{enrollment.courses?.title || "Unknown Course"}</div>
                            <div className="text-sm text-muted-foreground">
                              {enrollment.courses?.duration_weeks || 0} weeks
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{enrollment.courses?.category || "Unknown"}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{enrollment.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3" />
                            {enrollment.completed_at 
                              ? new Date(enrollment.completed_at).toLocaleDateString()
                              : "Not completed"}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(enrollment.status)}
                        </TableCell>
                        <TableCell>
                          {enrollment.status === "completed" ? (
                            <Button
                              size="sm"
                              onClick={() => approveCertificate(enrollment.id)}
                              className="gap-2"
                            >
                              <Award className="h-3 w-3" />
                              Approve Certificate
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              Certificate Approved
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {enrollments.length === 0 && (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No certificates pending</h3>
                    <p className="text-muted-foreground">
                      All completed courses have been certified.
                    </p>
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

export default AdminCertificates;