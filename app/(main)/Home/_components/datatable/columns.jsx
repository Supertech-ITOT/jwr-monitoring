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
    accessorKey: "energy",
    header: "ENERGY KW",
    cell: ({ row }) => row.original.avgTemperature?.toFixed(2) ?? "-",
  },
];
