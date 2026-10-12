"use client";

import { useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Calendar1, Funnel, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFilter } from "@/context/FilterContext";

import { useGetCategory } from "@/hooks/useCategory";

const daylist = ["Yesterday", "Last3Days", "Last5Days", "Last7Days"];

type FilterProps = {
  pageName: string;
  isRoom?: boolean;
  isDay?: boolean;
  isDuration?: boolean;
  day?: string[];
  categoryId?: number | string;
  roomId?: string;
  isCategory?: boolean;
};

type Category = {
  id: number | string;
  name: string;
};

export default function Filter({
  pageName,
  isRoom = true,
  isDay = true,
  isDuration = true,
  day = daylist,
  categoryId,
  roomId,
  isCategory = true,
}: FilterProps): React.JSX.Element {
  const now = dayjs();

  const { roomCategory, selectedRoom, setSelectedRoom } = useFilter();

  const [fromDate, setFromDate] = useState<Dayjs | null>(now);
  const [toDate, setToDate] = useState<Dayjs | null>(now);
  const [selectedRange, setSelectedRange] = useState<string>("yesterday");

  const router = useRouter();

  const { data: categories, isLoading: categoriesIsLoading } = useGetCategory();

  const categoryOptions: Category[] = categories ?? [];

  return (
    <div className="h-8 w-[200px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="h-full w-full bg-cardbackground text-primary">
            <Funnel />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex h-fit w-[280px] flex-col items-center justify-center gap-3 p-2">
          {isRoom && (
            <div className="flex w-full items-center gap-2">
              <Home className="size-8 text-primary" />

              <Label className="w-[110px]">Room</Label>

              <Select
                value={selectedRoom}
                onValueChange={(id: string) => {
                  setSelectedRoom(id);
                  router.push(`/${pageName}/${id}`);
                }}
              >
                <SelectTrigger className="w-full bg-transparent text-xs text-text">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  {tableData
                    .filter((item) => item.category === roomCategory)
                    .map((item) => (
                      <SelectItem key={item.RoomName} value={item.RoomName}>
                        {item.RoomName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {isCategory && (
            <div className="flex w-full items-center gap-2">
              <Home className="size-8 text-primary" />

              <Label className="w-[110px]">Category</Label>

              <Select
                value={categoryId == null ? undefined : String(categoryId)}
                onValueChange={(value: string) => {
                  // Add category-change handling here if required.
                  console.log("Selected category:", value);
                }}
                disabled={categoriesIsLoading}
              >
                <SelectTrigger className="w-full bg-transparent text-xs text-text">
                  <SelectValue placeholder={categoriesIsLoading ? "Loading..." : "Select"} />
                </SelectTrigger>

                <SelectContent>
                  {categoryOptions.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {isDay && (
            <div className="flex w-full items-center gap-2">
              <Calendar1 className="size-8 text-primary" />

              <Label className="w-[110px]">Day</Label>

              <Select
                value={selectedRange}
                onValueChange={(value: string) => {
                  setSelectedRange(value);
                }}
              >
                <SelectTrigger className="w-full bg-transparent text-xs text-text">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  {day.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {isDuration && (
            <>
              <div className="flex w-full flex-col gap-2">
                <Label>From DateTime</Label>

                <DateTimePicker
                  value={fromDate}
                  maxDateTime={now}
                  onChange={(date: Dayjs | null) => setFromDate(date)}
                  slotProps={{
                    openPickerIcon: {
                      className: "text-primary",
                    },
                    textField: {
                      InputProps: {
                        style: {
                          borderRadius: 6,
                          fontSize: 12,
                          color: "grey",
                        },
                        className: "h-8 rounded-md border border-border text-textSecondary",
                      },
                    },
                  }}
                />
              </div>

              <div className="flex w-full flex-col gap-2">
                <Label>To DateTime</Label>

                <DateTimePicker
                  value={toDate}
                  maxDateTime={now}
                  minDateTime={fromDate ?? undefined}
                  onChange={(date: Dayjs | null) => setToDate(date)}
                  slotProps={{
                    openPickerIcon: {
                      className: "text-primary",
                    },
                    textField: {
                      InputProps: {
                        style: {
                          borderRadius: 6,
                          fontSize: 12,
                          color: "grey",
                        },
                        className: "h-8 rounded-md border border-border text-textSecondary",
                      },
                    },
                  }}
                />
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
