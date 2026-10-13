"use client";

import { useState } from "react";
import { Factory, Funnel, DoorOpen } from "lucide-react";
import { toast } from "sonner";
import FilterDuration from "@/components/FiltrationDuration";
import FilterInterval from "@/components/FilterInterval";
import SearchableSelect from "@/components/FilterSelect";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import { FilterData } from "./Content";

type CommonFilterProps = {
  filterData: FilterData;
  onFilterChange: (updater: (prev: FilterData) => FilterData) => void;
  onApply: (filters: FilterData) => void;
};

export default function CommonFilter({ filterData, onFilterChange, onApply }: CommonFilterProps) {
  const [open, setOpen] = useState(false);
  const { categoryId, categoryName, roomIds, fromDate, toDate, interval } = filterData;
  const { data: categories } = useGetCategory();
  const { data: rooms } = useGetRoomByCategoryId(categoryId ?? 1);
  const handleApply = () => {
    if (categoryId == null || !categoryName || roomIds.length === 0 || !fromDate || !toDate || !interval) {
      toast.error("Please select all the inputs.");
      return;
    }
    onApply({
      categoryId,
      categoryName,
      roomIds,
      fromDate,
      toDate,
      interval,
    });
    toast.success("Filters applied");
    setOpen(false);
  };

  return (
    <div className="h-8 w-[200px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-full w-full bg-cardbackground text-primary">
            <Funnel />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex w-[280px] flex-col gap-3 p-2">
          <SearchableSelect
            label="Category"
            icon={Factory}
            options={
              categories?.map((category) => ({
                value: category.id,
                label: category.name,
              })) ?? []
            }
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
            icon={DoorOpen}
            multiSelect={true}
            options={
              rooms?.map((room) => ({
                value: room.id,
                label: room.name,
              })) ?? []
            }
            value={roomIds}
            onChange={(selectedIds) =>
              onFilterChange((prev) => ({
                ...prev,
                roomIds: selectedIds,
              }))
            }
            placeholder="Select Rooms"
            searchPlaceholder="Search rooms..."
            emptyText="No rooms found."
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

          <FilterInterval
            value={interval}
            onChange={(value: number) =>
              onFilterChange((prev) => ({
                ...prev,
                interval: value,
              }))
            }
          />

          <Button className="w-full" onClick={handleApply}>
            Apply
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
