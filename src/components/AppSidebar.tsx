import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  User,
  GraduationCap,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  price: number;
  duration_weeks: number;
}

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [userEnrollments, setUserEnrollments] = useState<string[]>([]);
  
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Profile", url: "/profile", icon: User },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });
      
      if (!error && data) {
        setCourses(data);
      }
    };

    const fetchUserEnrollments = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);
      
      if (!error && data) {
        setUserEnrollments(data.map(enrollment => enrollment.course_id));
      }
    };

    fetchCourses();
    fetchUserEnrollments();
  }, [user]);

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Available Courses */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <BookOpen className="h-4 w-4" />
            {state !== "collapsed" && <span>Available Courses</span>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => {
                const isEnrolled = userEnrollments.includes(course.id);
                return (
                  <SidebarMenuItem key={course.id}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={`/course/${course.id}`} 
                        className="flex flex-col items-start gap-1 p-2"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <GraduationCap className="h-4 w-4 flex-shrink-0" />
                          {state !== "collapsed" && (
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">
                                {course.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {course.category} • {course.level}
                              </div>
                            </div>
                          )}
                        </div>
                        {state !== "collapsed" && (
                          <div className="flex items-center gap-2 w-full">
                            <span className="text-xs font-medium text-primary">
                              ₦{course.price.toLocaleString()}
                            </span>
                            {isEnrolled && (
                              <Badge variant="secondary" className="text-xs">
                                Enrolled
                              </Badge>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Actions */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4" />
                    {state !== "collapsed" && <span>Sign Out</span>}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}