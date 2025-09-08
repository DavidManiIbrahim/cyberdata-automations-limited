import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  Star,
  Users,
  PlayCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration_weeks: number;
  is_active: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface Enrollment {
  id: string;
  progress: number;
  status: string;
  course_id: string;
}

interface Profile {
  id: string;
  full_name: string;
  date_of_birth: string;
  address: string;
  phone: string;
}

const ViewCourses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .order('title');

        if (coursesError) {
          console.error('Error fetching courses:', coursesError);
          return;
        }

        // Fetch user enrollments
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id);

        if (enrollmentsError) {
          console.error('Error fetching enrollments:', enrollmentsError);
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
        }

        setCourses(coursesData || []);
        setEnrollments(enrollmentsData || []);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to enroll in courses.",
        variant: "destructive",
      });
      return;
    }

    if (!profile) {
      toast({
        title: "Complete Your Profile",
        description: "Please complete your profile before enrolling in courses.",
        variant: "destructive",
      });
      navigate("/profile");
      return;
    }

    try {
      // Check if already enrolled
      const existingEnrollment = enrollments.find(e => e.course_id === courseId);
      if (existingEnrollment) {
        toast({
          title: "Already Enrolled",
          description: "You are already enrolled in this course.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          status: 'pending',
          progress: 0,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Enrollment Successful",
        description: "You have been enrolled in the course successfully!",
      });

      // Refresh enrollments
      const { data: updatedEnrollments } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      setEnrollments(updatedEnrollments || []);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling you in the course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getEnrollmentStatus = (courseId: string) => {
    return enrollments.find(e => e.course_id === courseId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'active':
      case 'approved':
        return <PlayCircle className="h-4 w-4 text-primary" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-accent" />;
      default:
        return null;
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = [...new Set(courses.map(course => course.category))];
  const levels = [...new Set(courses.map(course => course.level))];

  const enrolledCourses = courses.filter(course => 
    enrollments.some(enrollment => enrollment.course_id === course.id)
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-muted-foreground">
        <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Courses</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Discover Courses</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive course catalog and continue your learning journey.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* My Learning Section */}
      {enrolledCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {enrolledCourses.map((course) => {
              const enrollment = getEnrollmentStatus(course.id);
              return (
                <Card key={course.id} className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {enrollment && getStatusIcon(enrollment.status)}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration_weeks} weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>Instructor</span>
                      </div>
                    </div>
                    {enrollment && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                    )}
                    <Button className="w-full" size="sm">
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* All Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">All Courses</h2>
          <span className="text-sm text-muted-foreground">
            {filteredCourses.length} courses found
          </span>
        </div>

        {!profile && (
          <div className="mb-6 p-4 bg-accent-light/20 border border-accent-light rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              <h3 className="font-medium text-accent-foreground">Complete Your Profile</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Please complete your profile to enroll in courses and start your learning journey.
            </p>
            <Link to="/profile">
              <Button size="sm" variant="outline">
                Complete Profile
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const enrollment = getEnrollmentStatus(course.id);
            const isEnrolled = !!enrollment;

            return (
              <Card key={course.id} className="shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {course.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="text-xs text-muted-foreground">4.8</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration_weeks} weeks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>Instructor</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">
                      ${course.price}
                    </span>
                    {isEnrolled ? (
                      <Button variant="outline" size="sm" disabled>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Enrolled
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => handleEnroll(course.id)}
                        disabled={!profile}
                      >
                        Enroll Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCourses;