"use client";

import {
  BatteryCharging,
  LayoutDashboard,
  Radio,
  Warehouse,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useFilter } from "@/context/FilterContext";

const items = [
  {
    title: "Home",
    url: "/Home",
    icon: LayoutDashboard,
  },
  {
    title: "Single",
    url: "/Category?categoryId=1&roomId=1",
    icon: Radio,
  },
  {
    title: "Multi",
    url: "/Common",
    icon: Warehouse,
  },
  {
    title: "Energy",
    url: "/Power?categoryId=1&roomId=1",
    icon: BatteryCharging,
  },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { setRoomCategory } = useFilter();

  const navigate = (url) => {
    setRoomCategory("+veRoom");
    router.push(url);
  };

  return (
    <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 rounded-full  border border-border bg-card/95 backdrop-blur-xl shadow p-2 ">
        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.url.split("?")[0];

          return (
            <button
              key={item.title}
              onClick={() => navigate(item.url)}
              className={clsx(
                "flex flex-col items-center rounded-full px-6 py-0.5 pt-1  transition-all duration-200",
                active
                  ? "bg-primary/80 text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-5" />

              <span className="text-[10px] font-medium mt-1">{item.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
