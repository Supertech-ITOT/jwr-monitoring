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
import FilterInterval from "@/components/FilterInterval";
import { useState } from "react";

export default function EnergyFilter({ filterData, onFilterChange, onApply }) {
  const [open, setOpen] = useState(false);
  const { categoryId, categoryName, roomIds, fromDate, toDate, interval } =
    filterData;
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const { data: rooms, isLoading: roomsLoading } =
    useGetRoomByCategoryId(categoryId);

  const handleApply = () => {
    if (
      !categoryId ||
      !categoryName ||
      roomIds.length === 0 ||
      !fromDate ||
      !toDate ||
      !interval
    ) {
      toast.error("Please select all the inputs.");
      return;
    }
    onApply({ categoryId, categoryName, roomIds, fromDate, toDate, interval });
    toast.success("Filters applied");
    setOpen(false); // Close popover
  };

  return (
    <div className="w-[200px] h-8">
      <Popover open={open} onOpenChange={setOpen}>
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
                categoryName: categories.find((f) => f.id === id).name,
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
            initial={filterData}
            onChange={({ fromDate, toDate }) =>
              onFilterChange((prev) => ({
                ...prev,
                fromDate: fromDate?.format("YYYY-MM-DDTHH:mm:ss") ?? null,
                toDate: toDate?.format("YYYY-MM-DDTHH:mm:ss") ?? null,
              }))
            }
            dayInput={false}
          />

          <FilterInterval
            value={interval}
            onChange={(value) =>
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
