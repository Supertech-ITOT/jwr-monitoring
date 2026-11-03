import { useState } from "react";
import { FilterData } from "../../Consumption/_components/content";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import SearchableSelect from "@/components/FilterSelect";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DoorOpen, Factory, Funnel } from "lucide-react";
import FilterDuration from "@/components/FiltrationDuration";

type ConsumptionFilterProps = {
  filterData: FilterData;
  onFilterChange: (updater: (prev: FilterData) => FilterData) => void;
  onApply: (filters: FilterData) => void;
};
export default function ConsumptionFilter({ filterData, onFilterChange, onApply }: ConsumptionFilterProps) {
  const [open, setOpen] = useState(false);
  const { categoryId, roomIds, roomType, fromDate, toDate } = filterData;
  const { data: categories } = useGetCategory();
  const { data: rooms } = useGetRoomByCategoryId(filterData.categoryId ?? 1);

  const handleApply = () => {
    if (roomIds?.length === 0 || !roomType || !fromDate || !toDate) {
      toast.error("Please select all inputs.");
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      toast.error("From date cannot be later than To date.");
      return;
    }
    onApply(filterData);

    toast.success("Filter applied");
    setOpen(false);
  };

  return (
    <div className="h-8 w-[220px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-full w-full bg-cardbackground text-primary">
            <Funnel className="mr-2 size-4" />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex w-[280px] flex-col gap-3 p-2">
          <SearchableSelect
            label="Category"
            icon={Factory}
            options={
              categories
                ?.filter((f) => f.id === 1 || f.id === 2)
                ?.map((category) => ({
                  value: category.id,
                  label: category.name,
                })) ?? []
            }
            value={categoryId ?? undefined}
            onChange={(selectedId) => {
              onFilterChange((prev) => ({
                ...prev,
                categoryId: selectedId ?? 1,
                roomType: selectedId === 1 ? "POSITIVE" : "NEGATIVE",
                roomIds: [],
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

          {/* Date Range */}
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

          <Button className="w-full" onClick={handleApply}>
            Apply
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
