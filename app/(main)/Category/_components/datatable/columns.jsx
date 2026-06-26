"use client";

import { format } from "date-fns";

export const columns = [
  {
    accessorKey: "timestamp",
    header: "DATE",
    cell: ({ row }) =>
      format(new Date(row.original.timestamp), "dd MMM yyyy hh:mm a"),
  },

  {
    accessorKey: "avgTemperature",
    header: "TEMP °C",
    cell: ({ row }) => row.original.avgTemperature?.toFixed(2) ?? "-",
  },

  {
    accessorKey: "rh",
    header: "RH%",
    cell: ({ row }) => row.original.rh?.toFixed(2) ?? "-",
  },
];
