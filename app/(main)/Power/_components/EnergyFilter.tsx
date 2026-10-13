"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Factory, Funnel, DoorOpen, ArrowUpDown } from "lucide-react";
import FilterDuration from "@/components/FiltrationDuration";
import FilterInterval from "@/components/FilterInterval";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SearchableSelect from "@/components/FilterSelect";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import { EnergyFilterData } from "./Content";

type EnergyFilterProps = {
  filterData: EnergyFilterData;
  onFilterChange: Dispatch<SetStateAction<EnergyFilterData>>;
  onApply: (filter: EnergyFilterData) => void;
};

const sortOptions = [
  { id: "timestamp,desc", name: "Newest First" },
  { id: "timestamp,asc", name: "Oldest First" },
];

export default function EnergyFilter({ filterData, onFilterChange, onApply }: EnergyFilterProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { categoryId, categoryName, roomIds, fromDate, toDate, interval, sort } = filterData;
  const { data: categories } = useGetCategory();
  const { data: rooms } = useGetRoomByCategoryId(filterData.categoryId ?? 1);

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
                categoryId: selectedId ?? 1,
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
