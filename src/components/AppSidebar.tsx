import { NavLink, useLocation } from "react-router-dom";
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  Trophy,
  FileText,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Certificates", url: "/certificates", icon: Trophy },
  ];
  


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
            <SidebarMenu>
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