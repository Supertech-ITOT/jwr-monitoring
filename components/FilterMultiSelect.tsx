"use client";

import type { ComponentType, SVGProps } from "react";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

type FilterOption = {
  id: number;
  name: string;
};

type FilterMultiSelectProps = {
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  options?: FilterOption[];
  value: number[];
  loading?: boolean;
  onChange: (values: number[]) => void;
};

export default function FilterMultiSelect({
  label,
  icon: Icon,
  options = [],
  value,
  loading = false,
  onChange,
}: FilterMultiSelectProps): React.JSX.Element {
  const toggleValue = (id: number): void => {
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="flex w-full items-center gap-2">
      {Icon && <Icon className="size-8 text-primary" />}

      <Label className="w-[110px]">{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="flex w-[162px] justify-between bg-transparent text-xs text-text" disabled={loading}>
            <span>{value.length ? `${value.length} selected` : "Select"}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-(--radix-popover-trigger-width) overflow-y-auto p-0 scrollbar-prop">
          <ScrollArea className="max-h-60">
            {options.length > 0 ? (
              options.map((option) => {
                const isSelected = value.includes(option.id);

                return (
                  <div
                    key={option.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-muted"
                    onClick={() => toggleValue(option.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleValue(option.id);
                      }
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleValue(option.id)}
                      onClick={(event) => event.stopPropagation()}
                      aria-label={`Select ${option.name}`}
                    />

                    <span className="flex-1">{option.name}</span>

                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">{loading ? "Loading..." : "No data found"}</div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
