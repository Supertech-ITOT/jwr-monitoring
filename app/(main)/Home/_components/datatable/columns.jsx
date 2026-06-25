"use client";

import { format } from "date-fns";

export const columns = (filterData) => {
  const field =
    filterData?.parameterId === 1
      ? "avgTemperature"
      : filterData?.parameterId === 2
        ? "energy"
        : "rh";

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
          ? format(new Date(row.original.timestamp), "dd MMM yyyy HH:mm:ss")
          : "-",
    },
    {
      accessorKey: "roomName",
      header: "ROOM",
    },
    {
      accessorKey: field,
      header,
      cell: ({ row }) => {
        const value = row.original[field];

        return (
          <span>
            {typeof value === "number" ? value.toFixed(2) : "-"}
          </span>
        );
      },
    },
  ];
};