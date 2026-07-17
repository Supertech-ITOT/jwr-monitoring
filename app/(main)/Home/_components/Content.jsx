"use client";

import RoomCard from "@/app/(main)/Home/_components/RoomCard";
import { useGetCategory } from "@/hooks/useCategory";
import { useState } from "react";
import { useGetCurrentRoomMetrics } from "@/hooks/useDashboard";
import FilterSelect from "@/components/FilterSelect";
import { Factory, Grid2X2, Table2 } from "lucide-react";
import { format } from "date-fns/format";
import { Button } from "@/components/ui/button";
import RoomTable from "./RoomTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function Content() {
  const [layout, setLayout] = useState("grid");
  const [categoryId, setCategoryId] = useState(1);
  const { data, isLoading } = useGetCurrentRoomMetrics(categoryId || 1);
  const { data: categories, isLoading: categoriesIsLoading } = useGetCategory();
  const loading = isLoading || categoriesIsLoading || !data;

  if (loading) {
    return <Skeleton className="h-screen my-2" />;
  }
  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 my-3">
        {/* Layout Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <h1 className="hidden sm:block font-semibold whitespace-nowrap">
            Layout
          </h1>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setLayout("table")}
              variant="outline"
              className={`flex-1 sm:flex-none ${layout === "table" ? "bg-primary text-white" : "bg-card"} h-10 px-4`}
            >
              <Table2 className="size-4 lg:size-5" />
            </Button>

            <Button
              onClick={() => setLayout("grid")}
              variant="outline"
              className={`flex-1 sm:flex-none ${layout === "grid" ? "bg-primary text-white" : "bg-card"} h-10 px-4`}
            >
              <Grid2X2 className="size-4 lg:size-5" />
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-72 md:w-80">
          <FilterSelect
            label="Room"
            loading={loading}
            icon={Factory}
            options={categories || []}
            value={categoryId}
            onSelect={setCategoryId}
          />
        </div>
      </div>

      {layout === "grid" && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8 gap-1.5">
          {data?.map((room) => (
            <RoomCard
              key={room.roomId}
              room={{
                name: room.roomName,
                temperature: room.avgTemp,
                rh: room.rh,
                timestamp: format(room.timestamp, "dd MMM yy hh:mm a"),
                status: room.status ? "on" : "off",
              }}
            />
          ))}
        </div>
      )}

      {layout === "table" && (
        <div className="space-y-2">
          {data?.map((room, index) => (
            <RoomTable
              key={room.roomId}
              showHeader={index === 0}
              room={{
                name: room.roomName,
                temperature: room.avgTemp,
                rh: room.rh,
                timestamp: format(room.timestamp, "dd MMM yyyy hh:mm a"),
                status: room.status ? "on" : "off",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
