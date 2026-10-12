"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

import FilterSelect from "@/components/FilterSelect";
import FilterDuration from "@/components/FiltrationDuration";
import FilterInterval from "@/components/FilterInterval";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { ArrowUpDown, Factory, Funnel, Home } from "lucide-react";

import { toast } from "sonner";

type ID = string | number;

interface FilterOption {
  id: ID;
  name: string;
}

interface CategoryFilterData {
  categoryId: ID | null;
  roomId: ID | null;
  fromDate?: string;
  toDate?: string;
  interval: string;
  sort: string;
  day?: string | number;
  [key: string]: unknown;
}

interface CategoryFilterProps {
  categories: FilterOption[];
  rooms: FilterOption[];
  loading: boolean;
  onFilterChange: Dispatch<SetStateAction<CategoryFilterData>>;
  filterData: CategoryFilterData;
  onApply: (data: CategoryFilterData) => void;
}

const sortOptions = [
  { id: "timestamp,desc", name: "Newest First" },
  { id: "timestamp,asc", name: "Oldest First" },
];

export default function CategoryFilter({ categories, rooms, loading, onFilterChange, filterData, onApply }: CategoryFilterProps) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const { categoryId, roomId, fromDate, toDate, interval, sort } = filterData;

  const handleApply = () => {
    if (!categoryId || !roomId || !fromDate || !toDate || !interval || !sort) {
      toast.error("Please select all the inputs.");
      return;
    }

    onApply(filterData);

    const params = new URLSearchParams({
      categoryId: String(categoryId),
      roomId: String(roomId),
    });

    router.push(`/Category?${params.toString()}`);

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
          {/* Category Filter */}
          <FilterSelect
            label="Category"
            loading={loading}
            icon={Factory}
            options={categories}
            value={categoryId}
            onSelect={(selectedId: ID) => {
              onFilterChange((prev) => ({
                ...prev,
                categoryId: selectedId,
                roomId: 1,
              }));
            }}
          />

          {/* Room Filter */}
          <FilterSelect
            label="Room"
            loading={loading}
            icon={Home}
            options={rooms}
            value={roomId}
            onSelect={(selectedId: ID) => {
              onFilterChange((prev) => ({
                ...prev,
                roomId: selectedId,
              }));
            }}
          />

          {/* Date Filter */}
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

          {/* Sort Filter */}
          <FilterSelect
            label="Sort"
            icon={ArrowUpDown}
            loading={false}
            options={sortOptions}
            value={sort}
            onSelect={(selectedSort: string) => {
              onFilterChange((prev) => ({
                ...prev,
                sort: selectedSort,
              }));
            }}
          />

          {/* Interval Filter */}
          <FilterInterval
            value={interval}
            onChange={(value: string) => {
              onFilterChange((prev) => ({
                ...prev,
                interval: value,
              }));
            }}
          />

          <Button className="w-full" onClick={handleApply}>
            Apply
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
