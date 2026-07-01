"use client";

import { useState } from "react";
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

export default function CommonFilter({ onFilterChange }) {
  const [categoryId, setCategoryId] = useState(null);
  const [roomIds, setRoomIds] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const { data: rooms, isLoading: roomsLoading } =
    useGetRoomByCategoryId(categoryId);

  const onApply = () => {
    if (!categoryId || !roomIds || !fromDate || !toDate) {
      toast.error("Please select all the inputs.");
    }
    onFilterChange?.({
      categoryId,
      roomIds,
      fromDate,
      toDate,
    });
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
            onSelect={(id) => {
              setCategoryId(id);
              setRoomIds([]); // Clear rooms when category changes
            }}
          />

          <FilterMultiSelect
            label="Room"
            icon={DoorOpen}
            loading={roomsLoading || !rooms}
            options={rooms ?? []}
            value={roomIds}
            onChange={(ids) => {
              setRoomIds(ids);
            }}
          />

          <FilterDuration
            onChange={({ fromDate, toDate }) => {
              setFromDate(fromDate?.format("YYYY-MM-DDTHH:mm:ss") ?? null);
              setToDate(toDate?.format("YYYY-MM-DDTHH:mm:ss") ?? null);
            }}
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
