"use client";

import { format } from "date-fns";

export const columns = (filterData) => {
  const header =
    filterData?.parameterId === 1
      ? "TEMP (°C)"
      : filterData?.parameterId === 2
        ? "ENERGY (kW)"
        : "RH (%)";

  return [
    {
      accessorKey: "timestamp",
      header: "TIMESTAMP",
      cell: ({ row }) =>
        row.original.timestamp
          ? format(new Date(row.original.timestamp), "dd MMM yyyy hh:mm a")
          : "-",
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

        return (
          <span>{typeof value === "number" ? value.toFixed(1) : "-"}</span>
        );
      },
    },
  ];
};
