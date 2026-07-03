"use client";

import FilterSelect from "@/components/FilterSelect";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUpDown, Factory, Funnel, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import FilterDuration from "@/components/FiltrationDuration";
import { useEffect } from "react";

const sortOptions = [
  { id: "timestamp,desc", name: "Newest First" },
  { id: "timestamp,asc", name: "Oldest First" },
];

export default function CategoryFilter({
  categories,
  rooms,
  categoryId,
  roomId,
  loading,
  onFilterChange,
  filterData,
}) {
  const router = useRouter();
  useEffect(() => {
    if (!rooms?.length) return;
    const roomExists = rooms.some((room) => room.id === roomId);
    if (!roomExists) {
      router.replace(
        `/Category?categoryId=${categoryId}&roomId=${rooms[0].id}`,
      );
    }
  }, [rooms, roomId, categoryId, router]);
  return (
    <div className="w-[200px] h-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-full bg-cardbackground text-primary"
          >
            <Funnel />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className="h-fit w-[280px] p-2 flex flex-col gap-3 justify-center items-center">
          <FilterSelect
            label="Category"
            loading={loading}
            icon={Factory}
            options={categories || []}
            value={categoryId}
            onSelect={(selectedId) => {
              router.push(`/Category?categoryId=${selectedId}&roomId=1`);
            }}
          />

          <FilterSelect
            label="Room"
            loading={loading}
            icon={Home}
            options={rooms || []}
            value={roomId}
            onSelect={(selectedId) => {
              router.push(
                `/Category?categoryId=${categoryId}&roomId=${selectedId}`,
              );
            }}
          />

          <FilterDuration
            initial={filterData}
            onChange={({ fromDate, toDate, day }) => {
              onFilterChange((prev) => ({
                ...prev,
                fromDate: fromDate?.format("YYYY-MM-DDTHH:mm:ss"),
                toDate: toDate?.format("YYYY-MM-DDTHH:mm:ss"),
                day,
              }));
            }}
          />

          <FilterSelect
            label="Sort"
            icon={ArrowUpDown}
            loading={false}
            options={sortOptions}
            value={filterData.sort}
            onSelect={(sort) =>
              onFilterChange((prev) => ({
                ...prev,
                sort,
              }))
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
