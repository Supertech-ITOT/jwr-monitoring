"use client";

import { Fragment } from "react";
import { format, isValid, parseISO } from "date-fns";
import { EnergyRoomLogResponse, EnergyRoomResponse } from "@/types/dashboard.types";

const MAX_ROOMS = 3;

type EnergyRoomTableProps = {
  rooms: EnergyRoomResponse[];
};

type SummaryRow = {
  label: "AVG" | "MIN" | "MAX" | "TOTAL";
  energy: "avgEnergy" | "minEnergy" | "maxEnergy" | "totalEnergy";
  current: "avgCurrent" | "minCurrent" | "maxCurrent";
  voltage: "avgVoltage" | "minVoltage" | "maxVoltage";
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
  },
  {
    label: "MIN",
    energy: "minEnergy",
    current: "minCurrent",
    voltage: "minVoltage",
  },
  {
    label: "MAX",
    energy: "maxEnergy",
    current: "maxCurrent",
    voltage: "maxVoltage",
  },
  {
    label: "TOTAL",
    energy: "totalEnergy",
    current: "maxCurrent",
    voltage: "maxVoltage",
  },
];

function formatStat(value: number | string | null | undefined, type: "energy" | "current" | "voltage"): string {
  if (value == null || value === "") return "-";

  const number = Number(value);

  if (!Number.isFinite(number)) return "-";

  if (type === "energy") return number.toFixed(1);
  if (type === "current") return number.toFixed(2);
  if (type === "voltage") return String(Math.round(number));

  return String(number);
}

function formatTimestamp(value: string | number | Date | undefined, pattern: string): string {
  if (value == null) return "-";

  const date = value instanceof Date ? value : typeof value === "string" ? parseISO(value) : new Date(value);

  return isValid(date) ? format(date, pattern) : "-";
}

export default function EnergyRoomTable({ rooms }: EnergyRoomTableProps) {
  if (!rooms?.length) return null;

  // Ensure at least three room columns.
  const paddedRooms: PaddedRoom[] = [
    ...rooms,
    ...Array.from(
      { length: Math.max(0, MAX_ROOMS - rooms.length) },
      (_, index): PaddedRoom => ({
        roomId: `empty-${index}`,
        roomName: "",
        categoryId: rooms[0]?.categoryId ?? null,
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
    const positions = [
      "top-[75px]", // AVG
      "top-[95px]", // MIN
      "top-[115px]", // MAX
      "top-[135px]", // TOTAL
    ];

    return positions[index] ?? "top-[135px]";
  };
  const cellClass = "border border-border p-0.5 text-center text-[10px] sm:text-sm";

  const summaryCellClass = (index: number) =>
    `sticky z-40 h-[20px] min-h-[20px] whitespace-nowrap border border-border bg-primary p-0.5 text-center text-[10px] font-medium leading-none text-white sm:text-sm ${getStickyTopClass(index)}`;

  const headers = ["Energy kWh", "Current A", "Voltage V"];

  return (
    <div className="h-full overflow-auto rounded-lg border bg-background shadow-sm">
      <table className="w-max min-w-full table-fixed border-separate border-spacing-0">
        <thead>
          {/* Room names */}
          <tr className="h-10">
            <th
              rowSpan={2}
              className="sticky left-0 top-0 z-50 h-10 border border-border bg-primary px-1.5 text-center align-middle text-[10px] font-semibold text-white sm:text-sm"
            >
              DATETIME
            </th>

            {paddedRooms.map((room) => (
              <th
                key={room.roomId}
                colSpan={3}
                className="sticky top-0 z-40 h-10 border border-border bg-primary p-1 text-center align-middle text-[10px] font-semibold text-white sm:text-sm"
              >
                {room.roomName || "\u00A0"}
              </th>
            ))}
          </tr>

          {/* Parameter headers */}
          <tr className="h-[35px]">
            {paddedRooms.map((room) => (
              <Fragment key={room.roomId}>
                {headers.map((label) => (
                  <th
                    key={label}
                    className="sticky top-10 z-40 h-[35px] min-h-[35px] whitespace-nowrap border border-border bg-primary p-1 text-center align-middle text-[10px] font-medium leading-normal text-white sm:text-sm"
                  >
                    {label}
                  </th>
                ))}
              </Fragment>
            ))}
          </tr>

          {/* AVG / MIN / MAX summary rows */}
          {summaryRows.map((stat, index) => (
            <tr key={stat.label} className="h-5">
              <th
                className={`sticky  left-0 z-50 border border-border bg-primary px-1.5 text-center text-[10px] font-semibold text-white sm:text-sm ${getStickyTopClass(index)}`}
              >
                {stat.label}
              </th>

              {paddedRooms.map((room) => {
                const summaryCells = [
                  { key: stat.energy, type: "energy" as const },
                  { key: stat.current, type: "current" as const },
                  { key: stat.voltage, type: "voltage" as const },
                ];

                return (
                  <Fragment key={room.roomId}>
                    {summaryCells.map(({ key, type }) => (
                      <th key={key} className={summaryCellClass(index)}>
                        {(stat.label === "AVG" && type === "energy") || (stat.label === "TOTAL" && type !== "energy")
                          ? "-"
                          : formatStat(room[key], type)}
                      </th>
                    ))}
                  </Fragment>
                );
              })}
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
                    <td className={cellClass}>{formatStat(log.energy, "energy")}</td>

                    <td className={cellClass}>{formatStat(log.current, "current")}</td>

                    <td className={cellClass}>{formatStat(log.voltage, "voltage")}</td>
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
