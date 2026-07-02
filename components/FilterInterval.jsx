import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const intervals = [
  { label: "1M", value: 1 },
  { label: "15M", value: 15 },
  { label: "30M", value: 30 },
  { label: "60M", value: 60 },
];

export default function FilterInterval({ value, onChange }) {
  const [interval, setInterval] = useState(value);

  const handleSelect = (value) => {
    setInterval(value);
    onChange?.(value); // Send selected value to parent
  };

  return (
    <div className="space-y-2">
      <Label>Interval</Label>

      <div className="flex justify-between">
        {intervals.map((i) => (
          <Button
            key={i.value}
            variant={interval === i.value ? "default" : "outline"}
            className="text-xs"
            onClick={() => handleSelect(i.value)}
          >
            {i.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
