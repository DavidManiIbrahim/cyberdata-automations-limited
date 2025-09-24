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
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          {/* <Header /> */}

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
