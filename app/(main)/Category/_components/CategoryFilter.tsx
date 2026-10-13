"use client";

import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import FilterDuration from "@/components/FiltrationDuration";
import FilterInterval from "@/components/FilterInterval";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowUpDown, Factory, Funnel, Home } from "lucide-react";
import { toast } from "sonner";
import { FilterData } from "./Content";
import SearchableSelect from "@/components/FilterSelect";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";

interface CategoryFilterProps {
  onFilterChange: Dispatch<SetStateAction<FilterData>>;
  filterData: FilterData;
  onApply: (data: FilterData) => void;
}

const sortOptions = [
  { id: "timestamp,desc", name: "Newest First" },
  { id: "timestamp,asc", name: "Oldest First" },
];

export default function CategoryFilter({ onFilterChange, filterData, onApply }: CategoryFilterProps) {
  const [open, setOpen] = useState(false);
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategory();
  const { data: rooms = [], isLoading: roomsLoading } = useGetRoomByCategoryId(filterData.categoryId!);
  const loading = categoriesLoading || roomsLoading;
  const { categoryId, roomId, fromDate, toDate, interval, sort } = filterData;

  useEffect(() => {
    if (categoryId == null || rooms.length === 0) {
      return;
    }
    const selectedRoomExists = rooms.some((room) => Number(room.id) === Number(roomId));
    if (!selectedRoomExists) {
      onFilterChange((prev) => ({
        ...prev,
        roomId: Number(rooms[0].id),
      }));
    }
  }, [categoryId, rooms, roomId, onFilterChange]);

  const handleApply = () => {
    if (categoryId == null || roomId == null || !fromDate || !toDate || !interval || !sort) {
      toast.error("Please select all the inputs.");
      return;
    }

    const selectedRoomExists = rooms.some((room) => String(room.id) === String(roomId));
    if (!selectedRoomExists) {
      toast.error("Please select a room belonging to this category.");
      return;
    }

    const appliedData: FilterData = { ...filterData, categoryId, roomId };
    onApply(appliedData);
    toast.success("Filters applied");
    setOpen(false);
  };

  return (
    <div className="w-[200px] h-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full h-full bg-cardbackground text-primary">
            <Funnel />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[280px] p-2 flex flex-col gap-3">
          <SearchableSelect
            label="Category"
            icon={Factory}
            options={categories
              .filter((f) => f.id === 1 || f.id === 2 || f.id === 3 || f.id === 4 || f.id === 5)
              .map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            value={categoryId ?? undefined}
            onChange={(selectedId) => {
              onFilterChange((prev) => ({
                ...prev,
                categoryId: selectedId ?? null,
                roomId: null,
              }));
            }}
            placeholder="Select Category"
            searchPlaceholder="Search category..."
            emptyText="No category found."
          />

          <SearchableSelect
            label="Room"
            icon={Home}
            options={rooms.map((room) => ({
              value: room.id,
              label: room.name,
            }))}
            value={roomId ?? undefined}
            onChange={(selectedId) => {
              onFilterChange((prev) => ({
                ...prev,
                roomId: selectedId ?? null,
              }));
            }}
            placeholder="Select Room"
            searchPlaceholder="Search room..."
            emptyText="No room found."
            disabled={loading || rooms.length === 0}
          />

          <FilterDuration
            initial={filterData}
            onChange={({ fromDate, toDate, day }) => {
              onFilterChange((prev) => ({
                ...prev,
                fromDate: fromDate ? fromDate.format("YYYY-MM-DDTHH:mm:ss") : "",
                toDate: toDate ? toDate.format("YYYY-MM-DDTHH:mm:ss") : "",
                day: day ?? "",
              }));
            }}
          />

          <SearchableSelect
            label="Sort"
            icon={ArrowUpDown}
            options={sortOptions.map((option) => ({
              value: option.id,
              label: option.name,
            }))}
            value={sort ?? undefined}
            onChange={(selectedSort) => {
              onFilterChange((prev) => ({
                ...prev,
                sort: selectedSort ?? "",
              }));
            }}
            placeholder="Select Sort"
          />

          <FilterInterval
            value={interval}
            onChange={(value: number) => {
              onFilterChange((prev) => ({
                ...prev,
                interval: value,
              }));
            }}
          />

          <Button className="w-full" onClick={handleApply} disabled={loading || rooms.length === 0 || roomId == null}>
            Apply
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
