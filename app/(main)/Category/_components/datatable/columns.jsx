"use client";

import { format } from "date-fns";

export const columns = [
  {
    accessorKey: "timestamp",
    header: "DATETIME",
    cell: ({ row }) => (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 w-full text-center py-1 leading-4">
        <span>{format(new Date(row.original.timestamp), "dd MMM yy")}</span>
        <span>{format(new Date(row.original.timestamp), "hh:mm a")}</span>
      </div>
    ),
  },

  {
    accessorKey: "avgTemperature",
    header: "TEMP °C",
    cell: ({ row }) => row.original.avgTemperature?.toFixed(1) ?? "-",
  },

  {
    accessorKey: "rh",
    header: "RH%",
    cell: ({ row }) => Math.round(Number(row.original.rh)) ?? "-",
  },
];
