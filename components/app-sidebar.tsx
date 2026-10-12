"use client";

import { BatteryCharging, LayoutDashboard, LogOut, Radio, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { useFilter } from "@/context/FilterContext";
import BottomNavigation from "./BottomNavigation";

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

type NavigationItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const items: NavigationItem[] = [
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
    title: "Energy Room",
    url: "/Power?categoryId=1&roomId=1",
    icon: BatteryCharging,
  },
];

export default function AppSidebar(): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const { setRoomCategory } = useFilter();
  const { toggleSidebar } = useSidebar();

  const navigate = (url: string): void => {
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
                  className="group-data-[collapsible=icon]:p-0! rounded-xl border border-border p-4"
                >
                  <div className="flex h-full w-full items-center justify-start gap-4">
                    <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-border bg-cardbackground">
                      <Image src="/logo.jpg" width={50} height={50} alt="JWR company logo" className="object-contain" />
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
              <SidebarGroupLabel className="text-xl font-bold text-primary">Utility Monitoring</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.url.split("?")[0];

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={() => navigate(item.url)}
                          isActive={active}
                          className={active ? "bg-primary text-primary-foreground" : ""}
                        >
                          <Icon className="size-5" />
                          <span className="text-lg font-semibold">{item.title}</span>
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
                <SidebarMenuButton onClick={() => router.push("/")} tooltip="Logout">
                  <LogOut className="size-5 text-red-500" />
                  <span className="text-lg font-semibold">Logout</span>
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
