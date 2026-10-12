import type { ReactNode } from "react";

import AppSidebar from "@/components/app-sidebar";
import DateProvider from "@/components/DateProvider";
import SidebarStateBridge from "@/components/SidebarStateBridge";
import { FilterProvider } from "@/context/FilterContext";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps): React.JSX.Element {
  return (
    <FilterProvider>
      <DateProvider>
        <SidebarStateBridge defaultOpen={true}>
          <AppSidebar />

          <main className="min-h-screen w-full overflow-x-hidden bg-background pb-20 md:pb-0">
            <div className="h-full w-full min-w-0 p-2 xl:p-4">{children}</div>
          </main>
        </SidebarStateBridge>
      </DateProvider>
    </FilterProvider>
  );
}
