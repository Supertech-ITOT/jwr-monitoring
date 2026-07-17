import AppSidebar from "@/components/app-sidebar";
import DateProvider from "@/components/DateProvider";
import SidebarStateBridge from "@/components/SidebarStateBridge";
import { FilterProvider } from "@/context/FilterContext";

const DashboardLayout = ({ children }) => {
  return (
    <FilterProvider>
      <DateProvider>
        <SidebarStateBridge defaultOpen={true}>
          <AppSidebar />

          <main className="min-h-screen w-full bg-background overflow-x-hidden pb-20 md:pb-0">
            <div className="h-full w-full min-w-0 p-2 xl:p-4 ">{children}</div>
          </main>
        </SidebarStateBridge>
      </DateProvider>
    </FilterProvider>
  );
};

export default DashboardLayout;
