"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const intervals = [
  { label: "1M", value: 1 },
  { label: "15M", value: 15 },
  { label: "30M", value: 30 },
  { label: "60M", value: 60 },
] as const;

type FilterIntervalProps = {
  value: number;
  onChange?: (value: number) => void;
};

export default function FilterInterval({ value, onChange }: FilterIntervalProps): React.JSX.Element {
  const [interval, setInterval] = useState<number>(value);

  useEffect(() => {
    setInterval(value);
  }, [value]);

  const handleSelect = (selectedValue: number): void => {
    setInterval(selectedValue);
    onChange?.(selectedValue);
  };

  return (
    <div className="space-y-2">
      <Label>Interval</Label>

      <div className="flex justify-between gap-2">
        {intervals.map((item) => (
          <Button
            key={item.value}
            type="button"
            variant={interval === item.value ? "default" : "outline"}
            className="text-xs"
            onClick={() => handleSelect(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
