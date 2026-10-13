"use client";

import { useState } from "react";
import { format } from "date-fns";
import RoomCard from "@/app/(main)/Home/_components/RoomCard";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetCurrentRoomMetrics } from "@/hooks/useDashboard";
import SearchableSelect from "@/components/FilterSelect";
import { Factory, Grid2X2, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoomTable from "./RoomTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Value } from "@radix-ui/react-select";

type LayoutType = "grid" | "table";

type RoomMetric = {
  roomId: number | string;
  roomName: string;
  avgTemp: number | string | null;
  rh: number | string | null;
  timestamp: string | number | Date;
  status: boolean;
};

export default function Content(): React.JSX.Element {
  const [layout, setLayout] = useState<LayoutType>("grid");
  const [categoryId, setCategoryId] = useState<number>(1);

  const { data, isLoading } = useGetCurrentRoomMetrics(categoryId || 1);

  const { data: categories, isLoading: categoriesIsLoading } = useGetCategory();

  const loading = isLoading || categoriesIsLoading || !data;

  if (loading) {
    return <Skeleton className="my-2 h-screen" />;
  }

  const rooms = data as RoomMetric[];

  return (
    <div>
      <div className="my-3 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        {/* Layout Buttons */}
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <h1 className="hidden whitespace-nowrap font-semibold sm:block">Layout</h1>

          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              onClick={() => setLayout("table")}
              variant="outline"
              className={`h-10 flex-1 px-4 sm:flex-none ${layout === "table" ? "bg-primary text-white" : "bg-card"}`}
            >
              <Table2 className="size-4 lg:size-5" />
            </Button>

            <Button
              onClick={() => setLayout("grid")}
              variant="outline"
              className={`h-10 flex-1 px-4 sm:flex-none ${layout === "grid" ? "bg-primary text-white" : "bg-card"}`}
            >
              <Grid2X2 className="size-4 lg:size-5" />
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-72 md:w-80">
          <SearchableSelect
            label="Room"
            icon={Factory}
            options={
              categories
                ?.filter((f) => f.id === 1 || f.id === 2 || f.id === 3 || f.id === 4 || f.id === 5)
                .map((category) => ({
                  value: category.id,
                  label: category.name,
                })) ?? []
            }
            value={categoryId}
            onChange={(id) => setCategoryId(Number(id))}
          />
        </div>
      </div>

      {/* Grid Layout */}
      {layout === "grid" && (
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8">
          {rooms.map((room) => (
            <RoomCard
              key={room.roomId}
              room={{
                name: room.roomName,
                temperature: room.avgTemp,
                rh: room.rh,
                timestamp: format(new Date(room.timestamp), "dd MMM yy hh:mm a"),
                status: room.status ? "on" : "off",
              }}
            />
          ))}
        </div>
      )}

      {/* Table Layout */}
      {layout === "table" && (
        <div className="space-y-2">
          {rooms.map((room, index) => (
            <RoomTable
              key={room.roomId}
              showHeader={index === 0}
              room={{
                name: room.roomName,
                temperature: room.avgTemp,
                rh: room.rh,
                timestamp: format(new Date(room.timestamp), "dd MMM yyyy hh:mm a"),
                status: room.status ? "on" : "off",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
