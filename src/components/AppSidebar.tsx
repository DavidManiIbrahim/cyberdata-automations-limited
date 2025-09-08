import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  Trophy,
  GraduationCap,
  ClipboardList,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [courses, setCourses] = useState<Array<{id: string, title: string, category: string, level: string}>>([]);
  
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "View Courses", url: "/view-courses", icon: BookOpen },
    { title: "Assignments", url: "/assignments", icon: ClipboardList },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await supabase
          .from('courses')
          .select('id, title, category, level')
          .eq('is_active', true)
          .order('category', { ascending: true })
          .limit(6);
        
        if (data) {
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);
  


  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary font-medium" 
      : "text-foreground hover:bg-muted/50";

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
          {/* <SidebarGroupLabel>Main</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="mt-20">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink to={item.url} className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${getNavCls}`}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* My Learning Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground">My Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.slice(0, 3).map((course) => (
                <SidebarMenuItem key={course.id}>
                  <SidebarMenuButton asChild className="w-full">
                    <div className="flex flex-col items-start gap-1 px-3 py-2 rounded-md hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center gap-2 w-full">
                        <GraduationCap className="h-3 w-3 text-primary flex-shrink-0" />
                        {state !== "collapsed" && (
                          <span className="text-xs font-medium truncate">{course.title}</span>
                        )}
                      </div>
                      {state !== "collapsed" && (
                        <div className="flex gap-1 ml-5">
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {course.level}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {courses.length === 0 && state !== "collapsed" && (
                <SidebarMenuItem>
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    No enrolled courses
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

       
        {/* User Actions */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start text-foreground hover:bg-muted/50"
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