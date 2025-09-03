import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  BookOpen,
  CheckCircle,
} from "lucide-react";

interface Profile {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  date_of_birth: string;
}

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  price: number;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    phone: '',
    address: '',
    city: 'Yola',
    state: 'Adamawa',
    country: 'Nigeria',
    date_of_birth: '',
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!profileError && profileData) {
          setProfile({
            full_name: profileData.full_name || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            city: profileData.city || 'Yola',
            state: profileData.state || 'Adamawa',
            country: profileData.country || 'Nigeria',
            date_of_birth: profileData.date_of_birth || '',
          });
        }

        // Fetch available courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .order('category', { ascending: true });

        if (!coursesError && coursesData) {
          setCourses(coursesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profile,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleCourseEnrollment = async () => {
    if (!user || !selectedCourse) return;

    try {
      // Check if already enrolled
      const { data: existing } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', selectedCourse)
        .maybeSingle();

      if (existing) {
        toast({
          title: "Already enrolled",
          description: "You are already enrolled in this course.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: selectedCourse,
          status: 'pending',
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Course enrollment submitted! Your application is pending approval.",
      });

      setSelectedCourse('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to enroll in course",
        variant: "destructive",
      });
    }
  };

  const downloadRegistrationForm = async () => {
    if (!user || !selectedCourse) {
      toast({
        title: "Missing Information",
        description: "Please select a course and complete your profile first.",
        variant: "destructive",
      });
      return;
    }

    const selectedCourseData = courses.find(c => c.id === selectedCourse);
    if (!selectedCourseData) return;

    // Create registration form data
    const formData = {
      personalInfo: {
        fullName: profile.full_name,
        email: user.email,
        phone: profile.phone,
        dateOfBirth: profile.date_of_birth,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        country: profile.country,
      },
      courseInfo: {
        title: selectedCourseData.title,
        category: selectedCourseData.category,
        level: selectedCourseData.level,
        price: selectedCourseData.price,
      },
      applicationDate: new Date().toISOString().split('T')[0],
    };

    // Create a simple text-based registration form
    const formContent = `
COURSE REGISTRATION FORM
========================

PERSONAL INFORMATION
-------------------
Full Name: ${formData.personalInfo.fullName}
Email: ${formData.personalInfo.email}
Phone: ${formData.personalInfo.phone}
Date of Birth: ${formData.personalInfo.dateOfBirth}
Address: ${formData.personalInfo.address}
City: ${formData.personalInfo.city}
State: ${formData.personalInfo.state}
Country: ${formData.personalInfo.country}

COURSE INFORMATION
-----------------
Course Title: ${formData.courseInfo.title}
Category: ${formData.courseInfo.category}
Level: ${formData.courseInfo.level}
Course Fee: ₦${formData.courseInfo.price.toLocaleString()}

APPLICATION DETAILS
------------------
Application Date: ${formData.applicationDate}
Application ID: REG-${Date.now()}

INSTRUCTIONS
-----------
1. Print and sign this form
2. Attach required documents (ID, passport photo, certificates)
3. Submit to the admissions office
4. Pay course fees as directed
5. Wait for approval confirmation

Thank you for your application!
Contact: admin@cyberdata.com for questions.
    `.trim();

    // Create and download the file
    const blob = new Blob([formContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Registration-Form-${selectedCourseData.title.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Also create the enrollment
    await handleCourseEnrollment();

    toast({
      title: "Registration Form Downloaded",
      description: "Please print, sign, and submit the form as instructed.",
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">
          Update your personal information and manage course enrollments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profile.date_of_birth}
                    onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profile.country}
                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    placeholder="Country"
                  />
                </div>
              </div>

              <Button type="submit" disabled={updating} className="w-full">
                {updating ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Course Enrollment */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Enrollment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="courseSelect">Select Course</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{course.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {course.category} • {course.level} • ₦{course.price.toLocaleString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCourse && (
                <div className="p-4 bg-muted rounded-lg">
                  {(() => {
                    const course = courses.find(c => c.id === selectedCourse);
                    return course ? (
                      <div className="space-y-2">
                        <h4 className="font-medium">{course.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{course.category}</Badge>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Course Fee: <span className="font-medium text-primary">₦{course.price.toLocaleString()}</span>
                        </p>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Button
                  onClick={downloadRegistrationForm}
                  disabled={!selectedCourse || !profile.full_name}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Registration Form
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Complete your profile and select a course to download the registration form
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email</span>
                  <Badge variant="default">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profile</span>
                  <Badge variant={profile.full_name ? "default" : "secondary"}>
                    {profile.full_name ? "Complete" : "Incomplete"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;