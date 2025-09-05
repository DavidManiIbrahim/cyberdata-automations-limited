import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Enrollment {
  id: string;
  progress: number;
  status: string;
  enrolled_at: string;
  course: {
    id: string;
    title: string;
    category: string;
    duration_weeks: number;
  };
}

interface DashboardStats {
  totalCourses: number;
  activeCourses: number;
  completedCourses: number;
  totalProgress: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    activeCourses: 0,
    completedCourses: 0,
    totalProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Fetch user enrollments with course details
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from('enrollments')
          .select(`
            id,
            progress,
            status,
            enrolled_at,
            courses (
              id,
              title,
              category,
              duration_weeks
            )
          `)
          .eq('user_id', user.id)
          .order('enrolled_at', { ascending: false });

        if (enrollmentError) {
          console.error('Error fetching enrollments:', enrollmentError);
          return;
        }

        const formattedEnrollments = enrollmentData?.map(enrollment => ({
          ...enrollment,
          course: enrollment.courses as any
        })) || [];

        setEnrollments(formattedEnrollments);

        // Calculate stats
        const totalCourses = formattedEnrollments.length;
        const activeCourses = formattedEnrollments.filter(e => 
          e.status === 'active' || e.status === 'approved'
        ).length;
        const completedCourses = formattedEnrollments.filter(e => 
          e.status === 'completed'
        ).length;
        const totalProgress = formattedEnrollments.reduce((sum, e) => sum + e.progress, 0) / 
          (totalCourses || 1);

        setStats({
          totalCourses,
          activeCourses,
          completedCourses,
          totalProgress,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'active':
      case 'approved':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-accent" />;
      default:
        return <BookOpen className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      active: "default", 
      approved: "default",
      pending: "secondary",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your learning progress overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              Enrolled courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">
              Currently studying
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completedCourses}</div>
            <p className="text-xs text-muted-foreground">
              Courses finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{Math.round(stats.totalProgress)}%</div>
            <p className="text-xs text-muted-foreground">
              Overall completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* My Courses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Courses</CardTitle>
            <Link to="/courses">
              <Button variant="outline" size="sm">
                Browse All Courses
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {enrollments.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No courses enrolled yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your learning journey by enrolling in a course.
              </p>
              <Link to="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(enrollment.status)}
                    <div>
                      <h4 className="font-medium">{enrollment.course.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {enrollment.course.category} • {enrollment.course.duration_weeks} weeks
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(enrollment.status)}
                        <span className="text-xs text-muted-foreground">
                          Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <div className="text-sm font-medium mb-1">
                      {enrollment.progress}% Complete
                    </div>
                    <Progress value={enrollment.progress} className="w-20" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/profile">
              <Button variant="outline" className="w-full h-16">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Update Profile</div>
                </div>
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" className="w-full h-16">
                <div className="text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Browse Courses</div>
                </div>
              </Button>
            </Link>
            <Link to="/certificates">
              <Button variant="outline" className="w-full h-16">
                <div className="text-center">
                  <Award className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">View Certificates</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;