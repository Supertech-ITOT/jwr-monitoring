"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Factory, Funnel, DoorOpen, ArrowUpDown } from "lucide-react";

import FilterSelect from "@/components/FilterSelect";
import FilterDuration from "@/components/FiltrationDuration";
import FilterMultiSelect from "@/components/FilterMultiSelect";
import FilterInterval from "@/components/FilterInterval";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import type { EnergyFilterData } from "./Download";

type CategoryOption = {
  id: number;
  name: string;
};

type EnergyFilterProps = {
  filterData: EnergyFilterData;
  onFilterChange: React.Dispatch<React.SetStateAction<EnergyFilterData>>;
  onApply: (filter: EnergyFilterData) => void;
};

const sortOptions = [
  { id: "timestamp,desc", name: "Newest First" },
  { id: "timestamp,asc", name: "Oldest First" },
];

export default function EnergyFilter({ filterData, onFilterChange, onApply }: EnergyFilterProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const { categoryId, categoryName, roomIds, fromDate, toDate, interval, sort } = filterData;

  const { data: categories, isLoading: categoriesLoading } = useGetCategory();

  const { data: rooms, isLoading: roomsLoading } = useGetRoomByCategoryId(categoryId);

  const categoryOptions: CategoryOption[] = categories ?? [];

  const handleApply = (): void => {
    if (categoryId === null || !categoryName || roomIds.length === 0 || !fromDate || !toDate || !interval || !sort) {
      toast.error("Please select all the inputs.");
      return;
    }

    onApply(filterData);
    toast.success("Filters applied");
    setOpen(false);
  };

  return (
    <div className="h-8 w-[200px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="h-full w-full bg-cardbackground text-primary">
            <Funnel />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex w-[280px] flex-col gap-3 p-2">
          <FilterSelect
            label="Category"
            icon={Factory}
            loading={categoriesLoading}
            options={categoryOptions}
            value={categoryId}
            onSelect={(id: number) =>
              onFilterChange((previousFilter) => ({
                ...previousFilter,
                categoryId: id,
                categoryName: categoryOptions.find((category) => category.id === id)?.name ?? "-",
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
            onChange={(ids: number[]) =>
              onFilterChange((previousFilter) => ({
                ...previousFilter,
                roomIds: ids,
              }))
            }
          />

          <FilterDuration
            initial={filterData}
            onChange={({ fromDate, toDate, day }) => {
              onFilterChange((previousFilter) => ({
                ...previousFilter,
                fromDate: fromDate?.format("YYYY-MM-DDTHH:mm:ss") ?? "",
                toDate: toDate?.format("YYYY-MM-DDTHH:mm:ss") ?? "",
                day,
              }));
            }}
          />

          <FilterSelect
            label="Sort"
            icon={ArrowUpDown}
            loading={false}
            options={sortOptions}
            value={sort}
            onSelect={(selectedSort: string) =>
              onFilterChange((previousFilter) => ({
                ...previousFilter,
                sort: selectedSort,
              }))
            }
          />

          <FilterInterval
            value={interval}
            onChange={(value: number) =>
              onFilterChange((previousFilter) => ({
                ...previousFilter,
                interval: value,
              }))
            }
          />

          <Button type="button" className="w-full" onClick={handleApply}>
            Apply
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
