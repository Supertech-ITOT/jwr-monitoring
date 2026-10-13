"use client";

import { Fragment } from "react";
import { format, isValid, parseISO } from "date-fns";
import { EnergyRoomLogResponse, EnergyRoomResponse } from "@/types/dashboard.types";

const MAX_ROOMS = 3;

type EnergyRoomTableProps = {
  rooms: EnergyRoomResponse[];
};

type SummaryRow = {
  label: "AVG" | "MIN" | "MAX";
  energy: "avgEnergy" | "minEnergy" | "maxEnergy";
  current: "avgCurrent" | "minCurrent" | "maxCurrent";
  voltage: "avgVoltage" | "minVoltage" | "maxVoltage";
  frequency: "avgFrequency" | "minFrequency" | "maxFrequency";
};

type PaddedRoom = Partial<Omit<EnergyRoomResponse, "roomId" | "roomName" | "logs">> & {
  roomId: number | string;
  roomName: string;
  logs: EnergyRoomLogResponse[];
};

type TableRow = {
  timeStamp?: string | number | Date;
  values: EnergyRoomLogResponse[];
};

const summaryRows: SummaryRow[] = [
  {
    label: "AVG",
    energy: "avgEnergy",
    current: "avgCurrent",
    voltage: "avgVoltage",
    frequency: "avgFrequency",
  },
  {
    label: "MIN",
    energy: "minEnergy",
    current: "minCurrent",
    voltage: "minVoltage",
    frequency: "minFrequency",
  },
  {
    label: "MAX",
    energy: "maxEnergy",
    current: "maxCurrent",
    voltage: "maxVoltage",
    frequency: "maxFrequency",
  },
];

function formatStat(value: number | string | null | undefined, type: "energy" | "current" | "voltage" | "frequency"): string {
  if (value == null || value === "") return "-";

  const number = Number(value);

  if (!Number.isFinite(number)) return "-";

  if (type === "energy") return number.toFixed(1);
  if (type === "current") return number.toFixed(2);
  if (type === "voltage") return String(Math.round(number));
  if (type === "frequency") return number.toFixed(1);

  return String(number);
}

function formatTimestamp(value: string | number | Date | undefined, pattern: string): string {
  if (value == null) return "-";

  const date = value instanceof Date ? value : typeof value === "string" ? parseISO(value) : new Date(value);

  return isValid(date) ? format(date, pattern) : "-";
}

export default function EnergyRoomTable({ rooms }: EnergyRoomTableProps) {
  if (!rooms?.length) return null;

  // Pad rooms so the table always has at least MAX_ROOMS room columns.
  const paddedRooms: PaddedRoom[] = [
    ...rooms,
    ...Array.from(
      { length: Math.max(0, MAX_ROOMS - rooms.length) },
      (_, index): PaddedRoom => ({
        roomId: `empty-${index}`,
        roomName: "",
        logs: [],
      }),
    ),
  ];

  const firstRoomLogs = rooms[0]?.logs ?? [];

  const rows: TableRow[] = firstRoomLogs.map((log, index) => ({
    timeStamp: log.timeStamp,
    values: paddedRooms.map((room) => room.logs[index] ?? {}),
  }));

  const getStickyTopClass = (index: number): string => {
    if (index === 0) return "top-[45px]";
    if (index === 1) return "top-[65px]";
    return "top-[85px]";
  };

  return (
    <div className="scrollbar-prop h-full overflow-auto rounded-lg border bg-background shadow-sm">
      <table className="min-w-max w-full border-separate border-spacing-0">
        <thead>
          {/* Room Names */}
          <tr>
            <th
              rowSpan={2}
              className="sticky left-0 top-0 z-50 border border-border bg-primary px-1.5 text-center text-[10px] font-semibold text-white sm:text-sm"
            >
              DATETIME
            </th>

            {paddedRooms.map((room) => (
              <th
                key={room.roomId}
                colSpan={4}
                className="sticky top-0 z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-semibold text-white sm:text-sm"
              >
                {room.roomName || "\u00A0"}
              </th>
            ))}
          </tr>

          {/* Parameters */}
          <tr>
            {paddedRooms.map((room) => (
              <Fragment key={room.roomId}>
                {["Energy kWh", "Current A", "Voltage V", "Frequency Hz"].map((label) => (
                  <th
                    key={label}
                    className="sticky top-5 z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm"
                  >
                    {label}
                  </th>
                ))}
              </Fragment>
            ))}
          </tr>

          {/* AVG / MIN / MAX */}
          {summaryRows.map((stat, index) => (
            <tr key={stat.label}>
              <th
                className={`sticky left-0 z-40 border border-border bg-primary px-1.5 text-center text-[10px] font-semibold text-white sm:text-sm ${getStickyTopClass(index)}`}
              >
                {stat.label}
              </th>

              {paddedRooms.map((room) => (
                <Fragment key={room.roomId}>
                  <th
                    className={`sticky z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm ${getStickyTopClass(index)}`}
                  >
                    {formatStat(room[stat.energy], "energy")}
                  </th>

                  <th
                    className={`sticky z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm ${getStickyTopClass(index)}`}
                  >
                    {formatStat(room[stat.current], "current")}
                  </th>

                  <th
                    className={`sticky z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm ${getStickyTopClass(index)}`}
                  >
                    {formatStat(room[stat.voltage], "voltage")}
                  </th>

                  <th
                    className={`sticky z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm ${getStickyTopClass(index)}`}
                  >
                    {formatStat(room[stat.frequency], "frequency")}
                  </th>
                </Fragment>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {rows.map((row, index) => {
            const even = index % 2 === 0;

            return (
              <tr
                key={`${String(row.timeStamp ?? "row")}-${index}`}
                className={`transition-colors hover:bg-muted/70 ${even ? "bg-background" : "bg-card"}`}
              >
                <td className="sticky left-0 z-30 whitespace-nowrap border border-border bg-primary p-0.5 text-center text-[10px] font-medium leading-none text-card sm:text-sm">
                  {formatTimestamp(row.timeStamp, "dd MMM yy")}
                  <br />
                  {formatTimestamp(row.timeStamp, "hh:mm a")}
                </td>

                {row.values.map((log, roomIndex) => (
                  <Fragment key={roomIndex}>
                    <td className="border border-border p-0.5 text-center text-[10px] sm:text-sm">{formatStat(log.energy, "energy")}</td>

                    <td className="border border-border p-0.5 text-center text-[10px] sm:text-sm">{formatStat(log.current, "current")}</td>

                    <td className="border border-border p-0.5 text-center text-[10px] sm:text-sm">{formatStat(log.voltage, "voltage")}</td>

                    <td className="border border-border p-0.5 text-center text-[10px] sm:text-sm">{formatStat(log.frequency, "frequency")}</td>
                  </Fragment>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
