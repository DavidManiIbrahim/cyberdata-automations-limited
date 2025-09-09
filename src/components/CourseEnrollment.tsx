import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  price: number;
}

export const CourseEnrollment: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [profile, setProfile] = useState<any>({ full_name: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (!error && data) setCourses(data);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (!error && data) setProfile(data);
    };
    fetchProfile();
  }, [user]);

  const handleEnroll = async () => {
    if (!user || !selectedCourse) return;
    setLoading(true);
    // Check if already enrolled
    const { data: existing, error: existError } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .eq("course_id", selectedCourse)
      .single();
    if (existing) {
      alert("You are already enrolled in this course.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: selectedCourse,
      status: "pending",
    });
    if (!error) {
      alert("Course enrollment submitted! Your application is pending approval.");
      setSelectedCourse("");
    } else {
      alert(error.message || "Failed to enroll in course");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Course Enrollment</h3>
      <div className="space-y-2">
        <Label htmlFor="courseSelect">Select Course</Label>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger id="courseSelect">
            <SelectValue placeholder="Choose a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                <span className="font-medium">{course.title}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {course.category} • {course.level} • ₦{course.price.toLocaleString()}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedCourse && (
        <div className="space-y-2">
          {(() => {
            const course = courses.find((c) => c.id === selectedCourse);
            return course ? (
              <div className="space-y-1">
                <h4 className="font-medium">{course.title}</h4>
                <div className="flex gap-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <div>
                  Course Fee: <span className="font-medium text-primary">₦{course.price.toLocaleString()}</span>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
      <Button
        onClick={handleEnroll}
        disabled={!selectedCourse || !profile.full_name || loading}
      >
        {loading ? "Enrolling..." : "Enroll"}
      </Button>
      {!profile.full_name && (
        <div className="text-sm text-destructive">Complete your profile to enroll in a course.</div>
      )}
    </div>
  );
};
