"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  BatteryCharging,
  LayoutDashboard,
  LogOut,
  Radio,
  Warehouse,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useFilter } from "@/context/FilterContext";
import BottomNavigation from "./BottomNavigation";

const items = [
  {
    title: "Overview",
    url: "/Home",
    icon: LayoutDashboard,
  },
  {
    title: "Single Room",
    url: "/Category?categoryId=1&roomId=1",
    icon: Radio,
  },
  {
    title: "Multiple Room",
    url: "/Common",
    icon: Warehouse,
  },
  {
    title: "Energy",
    url: "/Power?categoryId=1&roomId=1",
    icon: BatteryCharging,
  },
];

export default function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setRoomCategory } = useFilter();
  const { toggleSidebar } = useSidebar();

  const navigate = (url) => {
    setRoomCategory("+veRoom");
    router.push(url);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="100"
                  onClick={toggleSidebar}
                  className="group-data-[collapsible=icon]:p-0! border border-border p-4 rounded-xl"
                >
                  <div className="flex justify-start items-center gap-4 w-full h-full">
                    <div className="bg-cardbackground size-10 rounded-full flex justify-center items-center border border-border overflow-hidden">
                      <Image
                        src="/logo.jpg"
                        width={50}
                        height={50}
                        alt="logo"
                        className="object-contain"
                      />
                    </div>

                    <div className="group-data-[collapsible=icon]:hidden">
                      <div className="font-extrabold tracking-widest">JWR</div>
                      <div className="font-semibold">COMPANY</div>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xl font-bold text-primary">
                Utility Monitoring
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={() => navigate(item.url)}
                          className={
                            pathname === item.url.split("?")[0]
                              ? "bg-primary text-primary-foreground"
                              : ""
                          }
                        >
                          <Icon className="size-5" />
                          <span className="font-semibold text-lg">
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push("/")}>
                  <LogOut className="size-5 text-red-500" />
                  <span className="font-semibold text-lg">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </>
  );
}
