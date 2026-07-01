"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "./ui/label";

export default function FilterMultiSelect({
  label,
  icon: Icon,
  options,
  value,
  loading,
  onChange,
}) {
  const toggleValue = (id) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="flex w-full gap-2 items-center">
      {Icon && <Icon className="size-8 text-primary" />}
      <Label className="w-[110px]">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[162px] text-text text-xs bg-transparent flex justify-between"
            disabled={loading}
          >
            <div className="flex items-center gap-2">
              <span>
                {value.length ? `${value.length} selected` : "Select"}
              </span>
            </div>

            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-(--radix-popover-trigger-width) p-0 overflow-y-auto scrollbar-prop">
          <ScrollArea className="max-h-60">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center gap-2 px-3 py-2 hover:bg-muted cursor-pointer"
                onClick={() => toggleValue(option.id)}
              >
                <Checkbox checked={value.includes(option.id)} />
                <span className="flex-1">{option.name}</span>

                {value.includes(option.id) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
