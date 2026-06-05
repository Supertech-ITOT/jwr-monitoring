import AppSidebar from "@/components/app-sidebar";
import DateProvider from "@/components/DateProvider";
import SidebarStateBridge from "@/components/SidebarStateBridge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { FilterProvider } from "@/context/FilterContext";

const DashboardLayout = ({ children }) => {
  return (
    <FilterProvider>
      <DateProvider>
        <SidebarStateBridge defaultOpen={true}>
          <AppSidebar />

          <main className="min-h-screen w-full bg-background overflow-x-hidden">
            <div className="fixed top-1/2 z-12">
              <SidebarTrigger />
            </div>

            <div className="h-full w-full min-w-0 p-2 xl:px-24">{children}</div>
          </main>
        </SidebarStateBridge>
      </DateProvider>
    </FilterProvider>
  );
};

export default DashboardLayout;
