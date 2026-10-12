"use client";

import { useState } from "react";
import { Factory, Funnel, DoorOpen } from "lucide-react";
import { toast } from "sonner";

import FilterSelect from "@/components/FilterSelect";
import FilterDuration from "@/components/FiltrationDuration";
import FilterMultiSelect from "@/components/FilterMultiSelect";
import FilterInterval from "@/components/FilterInterval";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";

type FilterData = {
  categoryId: number | string | null;
  categoryName: string;
  roomIds: (number | string)[];
  fromDate: string | null;
  toDate: string | null;
  interval: string | null;
};

type Category = {
  id: number | string;
  name: string;
};

type CommonFilterProps = {
  filterData: FilterData;
  onFilterChange: (updater: (prev: FilterData) => FilterData) => void;
  onApply: (filters: FilterData) => void;
};

export default function CommonFilter({ filterData, onFilterChange, onApply }: CommonFilterProps) {
  const [open, setOpen] = useState(false);

  const { categoryId, categoryName, roomIds, fromDate, toDate, interval } = filterData;

  const { data: categories, isLoading: categoriesLoading } = useGetCategory();

  const { data: rooms, isLoading: roomsLoading } = useGetRoomByCategoryId(categoryId);

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

  const handleCategorySelect = (id: number | string) => {
    const selectedCategory = (categories as Category[] | undefined)?.find((category) => String(category.id) === String(id));

    if (!selectedCategory) {
      toast.error("Please select a valid category.");
      return;
    }

    onFilterChange((prev) => ({
      ...prev,
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      roomIds: [],
    }));
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
          <FilterSelect
            label="Category"
            icon={Factory}
            loading={categoriesLoading}
            options={categories ?? []}
            value={categoryId}
            onSelect={handleCategorySelect}
          />

          <FilterMultiSelect
            label="Room"
            icon={DoorOpen}
            loading={roomsLoading || !rooms}
            options={rooms ?? []}
            value={roomIds}
            onChange={(ids: (number | string)[]) =>
              onFilterChange((prev) => ({
                ...prev,
                roomIds: ids,
              }))
            }
          />

          <FilterDuration
            initial={filterData}
            onChange={({
              fromDate,
              toDate,
            }: {
              fromDate: { format: (format: string) => string } | null;
              toDate: { format: (format: string) => string } | null;
            }) =>
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
            onChange={(value: string) =>
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
