"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "./ui/sidebar";
import { BatteryCharging, DoorOpen, LayoutDashboard, LogOut, Radio, Warehouse, Zap, } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useFilter } from "@/context/FilterContext";

const item = [
  {
    title: "Overview",
    url: "/Home",
    icon: <LayoutDashboard className="size-5 " />,
  },
  {
    title: "Category",
    url: "/Category?categoryId=1&roomId=1",
    icon: <Radio className="size-5 " />,
  },
  {
    title: "Power",
    url: "/Power?categoryId=1&roomId=1",
    icon: <BatteryCharging className="size-5 " />,
  },
  {
    title:"Common Room",
    url:"/Common",
    icon: <Warehouse className="size-5 "/>
  }
];

const AppSidebar = () => {
  const router = useRouter();
  const { setRoomCategory } = useFilter();
  const path = usePathname();
  const handleNavigation = (url) => {
    setRoomCategory("+veRoom");
    if (url !== path) {
      router.push(url);
    }
  };

  return (

    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="100"
              className="group-data-[collapsible=icon]:p-0!  border border-border p-4 rounded-xl"
            >
              <div className="flex justify-start items-center gap-4 w-full h-full">
                <div className="bg-cardbackground size-10 rounded-full flex justify-center items-center border border-border overflow-hidden">
                  <Image
                    src="/icon.png"
                    className="object-contain"
                    width={50}
                    height={50}
                    alt="logo"
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
            Utility Monitiring
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.map((field) => (
                <SidebarMenuItem key={field.title}>
                  <SidebarMenuButton
                    asChild
                    className="cursor-pointer hover:scale-95 duration-300 ease-in-out transition-all"
                    onClick={() => handleNavigation(field.url)}
                  >
                    <div className="flex items-center gap-2">
                      <div>{field.icon}</div>
                      <span className="font-semibold text-lg">
                        {field.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="cursor-pointer hover:scale-95 duration-300 ease-in-out transition-all"
              onClick={() => handleNavigation("/")}
            >
              <div className="flex items-center gap-2 ">
                <div>
                  <LogOut className="size-4 text-red-500" />
                </div>
                <span className="font-semibold text-lg">Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>

  );
};

export default AppSidebar;
