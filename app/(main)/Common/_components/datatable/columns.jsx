"use client";

import { format } from "date-fns";

export const columns = [
  {
    accessorKey: "timeStamp",
    header: "DATE",
    cell: ({ row }) =>
      format(new Date(row.original.timeStamp), "dd MMM yyyy hh:mm a"),
  },
  {
    accessorKey: "avgTemp",
    header: "TEMP °C",
    cell: ({ row }) => row.original.avgTemp?.toFixed(1) ?? "-",
  },
  {
    accessorKey: "rh",
    header: "RH %",
    cell: ({ row }) => row.original.rh?.toFixed(2) ?? "-",
  },
];
