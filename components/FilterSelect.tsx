"use client";

import type { ComponentType, SVGProps } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FilterOption = {
  id: string | number;
  name: string;
  [key: string]: unknown;
};

type FilterSelectProps = {
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  options?: FilterOption[];
  value?: string | number | null;
  placeholder?: string;
  onSelect?: (value: string) => void;
  valueKey?: keyof FilterOption;
  labelKey?: keyof FilterOption;
  loading?: boolean;
};

export default function FilterSelect({
  label,
  icon: Icon,
  options = [],
  value,
  placeholder = "Select",
  onSelect,
  valueKey = "id",
  labelKey = "name",
  loading = false,
}: FilterSelectProps): React.JSX.Element {
  return (
    <div className="flex w-full items-center gap-2">
      {Icon && <Icon className="size-8 text-primary" />}

      <Label className="w-[110px]">{label}</Label>

      <Select value={value == null ? undefined : String(value)} onValueChange={onSelect} disabled={loading}>
        <SelectTrigger className="w-full bg-transparent text-xs text-text">
          <SelectValue placeholder={loading ? `Loading ${label}...` : placeholder} />
        </SelectTrigger>

        <SelectContent>
          {loading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : options.length > 0 ? (
            options.map((item) => {
              const optionValue = item[valueKey];
              const optionLabel = item[labelKey];

              if (optionValue == null) return null;

              return (
                <SelectItem key={String(optionValue)} value={String(optionValue)}>
                  {String(optionLabel ?? "")}
                </SelectItem>
              );
            })
          ) : (
            <SelectItem value="no-data" disabled>
              No data found
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
