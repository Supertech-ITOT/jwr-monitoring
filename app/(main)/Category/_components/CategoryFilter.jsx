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
import FilterInterval from "@/components/FilterInterval";
import { toast } from "sonner";
import { useState } from "react";

const sortOptions = [
  { id: "timestamp,desc", name: "Newest First" },
  { id: "timestamp,asc", name: "Oldest First" },
];

export default function CategoryFilter({
  categories,
  rooms,
  loading,
  onFilterChange,
  filterData,
  onApply,
}) {
  const router = useRouter();
  const { categoryId, roomId, fromDate, toDate, interval, sort } = filterData;
  const [open, setOpen] = useState(false);
  const handleApply = () => {
    if (!categoryId || !roomId || !fromDate || !toDate || !interval || !sort) {
      toast.error("Please select all the inputs.");
      return;
    }

    onApply(filterData);

    router.push(
      `/Category?categoryId=${filterData.categoryId}&roomId=${filterData.roomId}`,
    );

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
            loading={loading}
            icon={Factory}
            options={categories || []}
            value={categoryId}
            onSelect={(selectedId) => {
              onFilterChange((prev) => ({
                ...prev,
                categoryId: selectedId,
                roomId: 1,
              }));
            }}
          />

          <FilterSelect
            label="Room"
            loading={loading}
            icon={Home}
            options={rooms || []}
            value={roomId}
            onSelect={(selectedId) => {
              onFilterChange((prev) => ({
                ...prev,
                roomId: selectedId,
              }));
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
            value={sort}
            onSelect={(sort) =>
              onFilterChange((prev) => ({
                ...prev,
                sort,
              }))
            }
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
