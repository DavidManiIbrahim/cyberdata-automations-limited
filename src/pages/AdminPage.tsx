import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminPage = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Admin Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="">
          {/* Header */}
          {/* <Header /> */}

          {/* Main Content Area */}
          <main className="">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
