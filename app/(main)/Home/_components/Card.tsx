"use client";

import { Building2, Sun, Snowflake, Truck, DoorOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRoomStatCard } from "@/hooks/useDashboard";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type RoomStat = {
  id: number | string;
  categoryName: string;
  runningRoom: number;
  totalRoom: number;
};

type CardConfig = {
  icon: React.ReactNode;
  color: string;
};

const Card = () => {
  const { data, isLoading } = useGetRoomStatCard();

  const getCardConfig = (categoryName: string): CardConfig => {
    switch (categoryName) {
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

  const stats: (RoomStat & CardConfig)[] =
    (data as RoomStat[] | undefined)
      ?.filter((f) => f.id === 1 || f.id === 2 || f.id === 3 || f.id === 4 || f.id === 5)
      .map((item) => ({
        ...item,
        ...getCardConfig(item.categoryName),
      })) ?? [];

  if (isLoading) {
    return (
      <div className="mt-6 flex gap-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="basis-[85%] md:basis-1/2 lg:basis-1/3">
            <div className="flex h-[110px] items-center gap-4 rounded-xl border bg-cardbackground p-4">
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
      className="mt-4 w-full"
    >
      <CarouselContent>
        {stats.map((item) => (
          <CarouselItem key={item.id} className="basis-auto pl-2!">
            <Button className="flex h-fit w-25 flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-cardbackground p-2 shadow hover:bg-cardhover lg:h-20 lg:w-60 lg:flex-row">
              <div style={{ backgroundColor: item.color }} className="flex size-10 shrink-0 items-center justify-center rounded-full lg:size-16">
                {item.icon}
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <strong className="text-sm font-bold text-text lg:text-xl">
                  <span className="text-primary">{item.runningRoom}</span>/{item.totalRoom}
                </strong>

                <span className="text-[10px] font-semibold text-textsecondary lg:text-sm">{item.categoryName}</span>
              </div>
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Card;
