"use client";

import FilterSelect from "@/components/FilterSelect";
import FilterDuration from "@/components/FiltrationDuration";
import FilterMultiSelect from "@/components/FilterMultiSelect";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Factory, Funnel, DoorOpen } from "lucide-react";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import { toast } from "sonner";

export default function CommonFilter({ filterData, onFilterChange }) {
  const { categoryId, roomIds, fromDate, toDate } = filterData;
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const { data: rooms, isLoading: roomsLoading } =
    useGetRoomByCategoryId(categoryId);

  const onApply = () => {
    if (!categoryId || roomIds.length === 0 || !fromDate || !toDate) {
      toast.error("Please select all the inputs.");
      return;
    }
    onFilterChange?.({
      categoryId,
      roomIds,
      fromDate: fromDate,
      toDate: toDate,
    });
    toast.success("Filters applied");
    toast.success(`Category Id: ${categoryId} 
      Rooms: ${roomIds}
      From Date: ${fromDate}
      To Date: ${toDate}
      `);
  };

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

        <PopoverContent className="w-[280px] p-2 flex flex-col gap-3">
          <FilterSelect
            label="Category"
            icon={Factory}
            loading={categoriesLoading}
            options={categories ?? []}
            value={categoryId}
            onSelect={(id) =>
              onFilterChange((prev) => ({
                ...prev,
                categoryId: id,
                roomIds: [],
              }))
            }
          />

          <FilterMultiSelect
            label="Room"
            icon={DoorOpen}
            loading={roomsLoading || !rooms}
            options={rooms ?? []}
            value={roomIds}
            onChange={(ids) =>
              onFilterChange((prev) => ({
                ...prev,
                roomIds: ids,
              }))
            }
          />

          <FilterDuration
            onChange={({ fromDate, toDate }) =>
              onFilterChange((prev) => ({
                ...prev,
                fromDate: fromDate?.format("YYYY-MM-DDTHH:mm:ss") ?? null,
                toDate: toDate?.format("YYYY-MM-DDTHH:mm:ss") ?? null,
              }))
            }
            dayInput={false}
          />

          <Button className="w-full" onClick={onApply}>
            Apply
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
