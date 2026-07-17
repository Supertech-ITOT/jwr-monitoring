"use client";

import React from "react";
import { Building2, Sun, Snowflake, Truck, DoorOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRoomStatCard } from "@/hooks/useDashboard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
      <div className="mt-6 flex gap-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="basis-[85%] md:basis-1/2 lg:basis-1/3">
            <div className="h-[110px] rounded-xl border bg-cardbackground p-4 flex items-center gap-4">
              <Skeleton className="size-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        ))}
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
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-4"
    >
      <CarouselContent>
        {stats.map((item) => (
          <CarouselItem key={item.id} className="basis-auto pl-2!">
            <Button className="w-25 h-fit lg:w-[300px] lg:flex-row flex-col justify-center lg:h-[100px]  shadow rounded-xl border border-border bg-cardbackground hover:bg-cardhover p-4 flex items-center gap-4">
              <div
                style={{ backgroundColor: item.color }}
                className="lg:size-16 size-12 rounded-full flex items-center justify-center shrink-0"
              >
                {item.icon}
              </div>

              <div className="flex flex-col lg:items-start items-center">
                <strong className="text-text text-xl font-bold">
                  {item.totalRoom}
                </strong>

                <span className="text-textsecondary lg:text-sm text-[10px] font-semibold">
                  {item.categoryName}
                </span>
              </div>
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Card;
