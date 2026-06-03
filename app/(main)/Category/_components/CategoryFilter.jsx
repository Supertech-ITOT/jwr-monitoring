"use client";

import FilterSelect from "@/components/FilterSelect";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import { Factory, Funnel, Home } from "lucide-react";

export default function CategoryFilter({ categoryId, roomId }) {
  const { data: categories, isLoading: categoriesIsLoading } = useGetCategory();
  const { data: rooms, isLoading: roomsIsLoading } = useGetRoomByCategoryId({
    categoryId,
  });
  if (categoriesIsLoading || roomsIsLoading) {
    return null;
  }
  return (
    <div className="w-[200px] h-8 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-full bg-cardbackground text-primary "
          >
            <Funnel />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="h-fit w-[280px] p-2 flex flex-col gap-3 justify-center items-center">
          <FilterSelect
            label="Category"
            icon={Factory}
            options={categories || []}
            value={categoryId}
            onSelect={(selectedId) => {
              console.log("Selected Category:", selectedId);
            }}
          />
          <FilterSelect
            label="Room"
            icon={Home}
            options={rooms || []}
            value={roomId}
            onSelect={(selectedId) => {
              console.log("Selected Room:", selectedId);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
