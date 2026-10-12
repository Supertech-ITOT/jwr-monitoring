
"use client";

import { format } from "date-fns";
import type { ColumnDef, CellContext } from "@tanstack/react-table";

interface TemperatureRow {
  timestamp: string | Date;
  avgTemperature?: number | null;
  rh?: number | string | null;
}

export const columns: ColumnDef<TemperatureRow>[] = [
  {
    accessorKey: "timestamp",
    header: "DATETIME",
    cell: ({ row }: CellContext<TemperatureRow, unknown>) => (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 w-full text-center py-1 leading-4">
        <span>
          {format(new Date(row.original.timestamp), "dd MMM yy")}
        </span>
        <span>
          {format(new Date(row.original.timestamp), "hh:mm a")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "avgTemperature",
    header: "TEMP °C",
    cell: ({ row }: CellContext<TemperatureRow, unknown>) =>
      row.original.avgTemperature?.toFixed(1) ?? "-",
  },
  {
    accessorKey: "rh",
    header: "RH%",
    cell: ({ row }: CellContext<TemperatureRow, unknown>) => {
      const rh = row.original.rh;

      return rh != null && rh !== ""
        ? Math.round(Number(rh))
        : "-";
    },
  },
];
