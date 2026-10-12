"use client";

import { formatValue } from "@/lib/formatValue";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

type FilterData = {
  parameterId?: number | null;
};

type ReportRow = {
  timestamp?: string | number | Date | null;
  roomName: string;
  value: number | string | null;
};

export const columns = (filterData: FilterData): ColumnDef<ReportRow>[] => {
  const header = filterData?.parameterId === 1 ? "TEMP (°C)" : filterData?.parameterId === 2 ? "ENERGY (kW)" : "RH (%)";

  return [
    {
      accessorKey: "timestamp",
      header: "DATETIME",
      cell: ({ row }) => (row.original.timestamp ? format(new Date(row.original.timestamp), "dd MMM yyyy hh:mm a") : "-"),
    },
    {
      accessorKey: "roomName",
      header: "ROOM",
    },
    {
      accessorKey: "value",
      header,
      cell: ({ row }) => {
        const value = row.original.value;

        return <span>{typeof value === "number" ? formatValue(value, filterData.parameterId ?? 0) : "-"}</span>;
      },
    },
  ];
};
