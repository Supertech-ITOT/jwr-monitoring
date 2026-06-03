"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterSelect = ({
  label,
  icon: Icon,
  options = [],
  value,
  placeholder = "Select",
  onSelect,
  valueKey = "id",
  labelKey = "name",
}) => {
  return (
    <div className="flex w-full gap-2 items-center">
      {Icon && <Icon className="size-8 text-primary" />}

      <Label className="w-[110px]">{label}</Label>

      <Select value={value?.toString()} onValueChange={onSelect}>
        <SelectTrigger className="w-full text-text text-xs bg-transparent">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item[valueKey]} value={item[valueKey].toString()}>
              {item[labelKey]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;
