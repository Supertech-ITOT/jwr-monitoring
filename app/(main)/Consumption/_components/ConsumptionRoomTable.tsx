"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { EnergyConsumptionResponse } from "@/types/consumption.types";

interface EnergyConsumptionTableProps {
  data: EnergyConsumptionResponse;
  roomType: "POSITIVE" | "NEGATIVE";
  fromDate: string;
  toDate: string;
}

const formatNumber = (value: number | null | undefined) => {
  if (value == null) return "-";

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
};

export default function EnergyConsumptionTable({ data }: EnergyConsumptionTableProps) {
  const rooms = data.rooms ?? [];

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
      {/* 1. FIXED HEADER */}
      <div className="shrink-0">
        <Table className="w-full table-fixed border-separate border-spacing-0">
          <colgroup>
            <col className="w-[15%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[25%]" />
          </colgroup>

          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="h-8 border-r border-white/40 bg-primary text-center font-bold text-white">ROOM</TableHead>
              <TableHead className="h-8 border-r border-white/40 bg-primary text-center font-bold text-white">A (kWh)</TableHead>
              <TableHead className="h-8 border-r border-white/40 bg-primary text-center font-bold text-white">B (kWh)</TableHead>
              <TableHead className="h-8 border-r border-white/40 bg-primary text-center font-bold text-white">C (kWh)</TableHead>
              <TableHead className="h-8 bg-primary text-center font-bold text-white">TOTAL (kWh)</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>

      {/* 2. SCROLLABLE BODY */}
      <div className="min-h-0 flex-1 overflow-auto">
        <Table className="w-full table-fixed border-separate border-spacing-0">
          <colgroup>
            <col className="w-[15%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[25%]" />
          </colgroup>

          <TableBody>
            {rooms.map((room, index) => (
              <TableRow
                key={room.roomId}
                className={`
                  ${index % 2 === 0 ? "bg-white" : "bg-[#F1F1F1]"}
                  hover:bg-inherit
                `}
              >
                <TableCell className="border-r border-b border-[#E5E5E5] py-1.5 text-center">{room.roomName}</TableCell>

                <TableCell className="border-r border-b border-[#E5E5E5] py-1.5 text-center">{formatNumber(room.componentA)}</TableCell>

                <TableCell className="border-r border-b border-[#E5E5E5] py-1.5 text-center">{formatNumber(room.componentB)}</TableCell>

                <TableCell className="border-r border-b border-[#E5E5E5] py-1.5 text-center">{formatNumber(room.componentC)}</TableCell>

                <TableCell className="border-b border-[#E5E5E5] py-1.5 text-center">{formatNumber(room.totalEnergy)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 3. FIXED FOOTER */}
      <div className="shrink-0">
        <Table className="w-full table-fixed border-separate border-spacing-0">
          <colgroup>
            <col className="w-[15%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[25%]" />
          </colgroup>

          <TableBody>
            <TableRow className="bg-primary hover:bg-primary">
              <TableCell className="border-r border-white/40 py-1.5 text-center font-bold text-white">TOTAL</TableCell>

              <TableCell className="border-r border-white/40 py-1.5 text-center font-bold text-white">{formatNumber(data.componentATotal)}</TableCell>

              <TableCell className="border-r border-white/40 py-1.5 text-center font-bold text-white">{formatNumber(data.componentBTotal)}</TableCell>

              <TableCell className="border-r border-white/40 py-1.5 text-center font-bold text-white">{formatNumber(data.componentCTotal)}</TableCell>

              <TableCell className="py-1.5 text-center font-bold text-white">{formatNumber(data.totalEnergy)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
