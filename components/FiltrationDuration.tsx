"use client";

import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Calendar1 } from "lucide-react";
import { DateTimePicker } from "@mui/x-date-pickers";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const daylist = ["Current", "Yesterday", "Last3Days", "Last5Days", "Last7Days"] as const;

type DayOption = (typeof daylist)[number];

type FilterDurationChange = {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  day: string | null;
};

type FilterDurationInitial = {
  fromDate?: string | null;
  toDate?: string | null;
  day?: string | null;
};

type FilterDurationProps = {
  onChange?: (value: FilterDurationChange) => void;
  dayInput?: boolean;
  initial?: FilterDurationInitial;
};

export default function FilterDuration({ onChange, dayInput = true, initial }: FilterDurationProps): React.JSX.Element {
  const [selectedDay, setSelectedDay] = useState<string>(initial?.day ?? "Current");

  const [fromDate, setFromDate] = useState<Dayjs | null>(() => (initial?.fromDate ? dayjs(initial.fromDate) : dayjs().subtract(1, "day")));

  const [toDate, setToDate] = useState<Dayjs | null>(() => (initial?.toDate ? dayjs(initial.toDate) : dayjs()));

  // Update when parent changes initial values.
  useEffect(() => {
    if (!initial) return;

    setSelectedDay(initial.day ?? "");
    setFromDate(initial.fromDate ? dayjs(initial.fromDate) : dayjs().subtract(1, "day"));
    setToDate(initial.toDate ? dayjs(initial.toDate) : dayjs());
  }, [initial]);

  const updateRange = (type: string): void => {
    const current = dayjs();
    let from = current;
    let to = current;

    switch (type) {
      case "Current":
        from = current.subtract(24, "hour");
        break;

      case "Yesterday":
        from = current.subtract(1, "day");
        to = current.subtract(1, "minute");
        break;

      case "Last3Days":
        from = current.subtract(3, "day");
        break;

      case "Last5Days":
        from = current.subtract(5, "day");
        break;

      case "Last7Days":
        from = current.subtract(7, "day");
        break;

      default:
        break;
    }

    setFromDate(from);
    setToDate(to);

    onChange?.({
      fromDate: from,
      toDate: to,
      day: type,
    });
  };

  const handleDayChange = (value: string): void => {
    setSelectedDay(value);
    updateRange(value);
  };

  const handleFromChange = (value: Dayjs | null): void => {
    setSelectedDay("");
    setFromDate(value);

    onChange?.({
      fromDate: value,
      toDate,
      day: null,
    });
  };

  const handleToChange = (value: Dayjs | null): void => {
    setSelectedDay("");
    setToDate(value);

    onChange?.({
      fromDate,
      toDate: value,
      day: null,
    });
  };

  return (
    <>
      {dayInput && (
        <div className="flex w-full items-center gap-2">
          <Calendar1 className="size-8 text-primary" />

          <Label className="w-[110px]">Day</Label>

          <Select value={selectedDay} onValueChange={handleDayChange}>
            <SelectTrigger className="w-full bg-transparent text-xs text-text">
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent>
              {daylist.map((item: DayOption) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex w-full flex-col gap-2">
        <Label>From DateTime</Label>

        <DateTimePicker
          value={fromDate}
          maxDateTime={dayjs()}
          onChange={handleFromChange}
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
          maxDateTime={dayjs()}
          minDateTime={fromDate ?? undefined}
          onChange={handleToChange}
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
  );
}
