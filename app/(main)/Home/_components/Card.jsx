"use client";

import React from "react";
import { Building2, Sun, Snowflake, Truck, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRoomStatCard } from "@/hooks/useDashboard";

const Card = () => {
  const { data, isLoading } = useGetRoomStatCard();

  const getCardConfig = (categoryName) => {
    switch (categoryName) {
      case "Total Rooms":
        return {
          icon: <Building2 className="size-6" style={{ color: "#166534" }} />,
          color: "#E9FBEF",
        };

      case "Positive Room":
        return {
          icon: <Sun className="size-6" style={{ color: "#C2410C" }} />,
          color: "#FFF5E8",
        };

      case "Negative Room":
        return {
          icon: <Snowflake className="size-6" style={{ color: "#1E40AF" }} />,
          color: "#E8F1FF",
        };

      case "Mezzanine Room":
        return {
          icon: <Building2 className="size-6" style={{ color: "#7C3AED" }} />,
          color: "#F3E8FF",
        };

      case "Ante Room":
        return {
          icon: <DoorOpen className="size-6" style={{ color: "#0891B2" }} />,
          color: "#ECFEFF",
        };

      case "Truckdock Room":
        return {
          icon: <Truck className="size-6" style={{ color: "#B45309" }} />,
          color: "#FEF3C7",
        };

      default:
        return {
          icon: <Building2 className="size-6" />,
          color: "#F3F4F6",
        };
    }
  };

  const stats =
    data?.map((item) => ({
      ...item,
      ...getCardConfig(item.categoryName),
    })) || [];

  if (isLoading) {
    return (
      <div className="w-full min-w-0 overflow-x-auto no-scrollbar mt-6">
        <div className="flex gap-4 w-max pb-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-[80vw] max-w-[300px] h-[100px] sm:h-[120px] shrink-0 rounded-xl border border-border bg-cardbackground p-4 flex items-center gap-4"
            >
              <Skeleton className="size-16 rounded-full" />

              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats.length) {
    return (
      <div className="mt-6 flex items-center justify-center rounded-xl border border-border bg-cardbackground p-8">
        <p className="text-textsecondary">No room statistics available.</p>
      </div>
    );
  }

  return (
    <div className="w-full touch-pan-x cursor-grab scrollbar-prop select-none active:cursor-grabbing overflow-x-auto mt-6 snap-x snap-mandatory">
      <div className="flex gap-4 w-max pb-2">
        {stats.map((item) => (
          <Button
            key={item.id}
            className="w-[80vw] snap-start select-none max-w-[300px] h-[100px] sm:h-[120px] shrink-0 shadow p-3 sm:p-4 rounded-xl border border-border bg-cardbackground hover:bg-cardhover flex items-center gap-3 sm:gap-4"
          >
            <div
              style={{ backgroundColor: item.color }}
              className="rounded-full size-16 flex justify-center items-center"
            >
              {item.icon}
            </div>

            <div className="flex flex-col items-start">
              <strong className="font-bold text-text text-sm sm:text-xl">
                {item.totalRoom}
              </strong>

              <span className="font-semibold text-textsecondary text-xs sm:text-lg">
                {item.categoryName}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Card;
