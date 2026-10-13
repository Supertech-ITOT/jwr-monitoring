import { memo, useMemo, useState } from "react";
import { Check, ChevronsUpDown, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

type SearchableSelectValue = number | string;

export interface SearchableSelectOption<T extends SearchableSelectValue> {
  value: T;
  label: string;
}

interface CommonProps<T extends SearchableSelectValue> {
  options: SearchableSelectOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  label?: string;
}

// Default: single-select
type SingleSelectProps<T extends SearchableSelectValue> = {
  multiSelect?: false;
  value?: T;
  emptyValue?: T;
  onChange: (value?: T) => void;
};

// Multi-select: value is an array
type MultiSelectProps<T extends SearchableSelectValue> = {
  multiSelect: true;
  value?: T[];
  onChange: (value: T[]) => void;
};

type SearchableSelectProps<T extends SearchableSelectValue> = CommonProps<T> & (SingleSelectProps<T> | MultiSelectProps<T>);

function SearchableSelect<T extends SearchableSelectValue>(props: SearchableSelectProps<T>) {
  const {
    icon: Icon,
    options,
    placeholder = "Select",
    searchPlaceholder = "Search...",
    emptyText = "No results found.",
    disabled,
    label,
    className,
  } = props;

  const [open, setOpen] = useState(false);

  const isMulti = props.multiSelect === true;

  const selectedValues = useMemo<T[]>(() => {
    if (isMulti) {
      return (props.value ?? []) as T[];
    }

    return props.value === undefined ? [] : [props.value as T];
  }, [isMulti, props.value]);

  const selectedLabels = useMemo(
    () => options.filter((option) => selectedValues.some((value) => String(value) === String(option.value))).map((option) => option.label),
    [options, selectedValues],
  );

  const handleSelect = (optionValue: T) => {
    const isSelected = selectedValues.some((value) => String(value) === String(optionValue));

    if (isMulti) {
      const nextValues = isSelected ? selectedValues.filter((value) => String(value) !== String(optionValue)) : [...selectedValues, optionValue];

      (props.onChange as (value: T[]) => void)(nextValues);

      // Keep the popover open for additional selections.
      return;
    }

    const singleProps = props as SingleSelectProps<T>;

    if (isSelected) {
      singleProps.onChange(singleProps.emptyValue);
    } else {
      singleProps.onChange(optionValue);
    }

    setOpen(false);
  };

  const buttonLabel = isMulti ? (selectedLabels.length > 0 ? `${selectedLabels.length} selected` : placeholder) : (selectedLabels[0] ?? placeholder);

  return (
    <div className="space-y-1">
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            className={cn("w-full justify-between font-normal bg-card", selectedLabels.length === 0 && "text-muted-foreground", className)}
          >
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
              {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}

              <span className="truncate">{buttonLabel}</span>
            </div>

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) p-0">
          <Command className="overflow-hidden">
            <CommandInput placeholder={searchPlaceholder} />

            <CommandList className="max-h-72 overflow-y-auto">
              <CommandEmpty>{emptyText}</CommandEmpty>

              {options.map((option) => {
                const isSelected = selectedValues.some((value) => String(value) === String(option.value));

                return (
                  <CommandItem key={String(option.value)} value={option.label} data-checked={isSelected} onSelect={() => handleSelect(option.value)}>
                    <Check className={cn("mr-2 h-4 w-4 shrink-0", isSelected ? "opacity-100" : "opacity-0")} />

                    <span className="truncate">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandList>

            {isMulti && selectedValues.length > 0 && (
              <div className="border-t p-2">
                <Button type="button" variant="ghost" size="sm" className="w-full" onClick={() => (props.onChange as (value: T[]) => void)([])}>
                  Clear selection
                </Button>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default memo(SearchableSelect) as typeof SearchableSelect;
