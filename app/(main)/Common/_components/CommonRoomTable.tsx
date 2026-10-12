"use client";

import { Fragment } from "react";
import { format } from "date-fns";

const MAX_ROOMS = 10;

type RoomLog = {
  timeStamp: string | number | Date;
  avgTemp?: number | string | null;
  rh?: number | string | null;
};

type Room = {
  roomId: string | number;
  roomName: string;
  logs: RoomLog[];
  avgTemperature?: number | string | null;
  minTemperature?: number | string | null;
  maxTemperature?: number | string | null;
  avgRh?: number | string | null;
  minRh?: number | string | null;
  maxRh?: number | string | null;
};

type TableRow = {
  timeStamp: string | number | Date;
  values: Partial<RoomLog>[];
};

type CommonRoomTableProps = {
  rooms: Room[];
};

export default function CommonRoomTable({ rooms }: CommonRoomTableProps) {
  if (!rooms?.length) return null;

  // Pad rooms so the table always has 10 room columns.
  const paddedRooms: Room[] = [
    ...rooms,
    ...Array.from(
      { length: Math.max(0, MAX_ROOMS - rooms.length) },
      (_, i): Room => ({
        roomId: `empty-${i}`,
        roomName: "",
        logs: [],
      }),
    ),
  ];

  const rows: TableRow[] = rooms[0].logs.map((log, index) => ({
    timeStamp: log.timeStamp,
    values: paddedRooms.map((room) => room.logs[index] ?? {}),
  }));

  // Format summary values.
  const formatStat = (value: number | string | null | undefined, type: "temperature" | "rh"): string | number => {
    if (value == null) return "-";

    const number = Number(value);

    if (!Number.isFinite(number)) return "-";

    if (type === "temperature") return number.toFixed(1);
    if (type === "rh") return Math.round(number);

    return number;
  };

  // AVG / MIN / MAX summary rows.
  const summaryRows = [
    {
      label: "AVG",
      temperature: "avgTemperature",
      rh: "avgRh",
    },
    {
      label: "MIN",
      temperature: "minTemperature",
      rh: "minRh",
    },
    {
      label: "MAX",
      temperature: "maxTemperature",
      rh: "maxRh",
    },
  ] as const;

  return (
    <div className="h-full overflow-auto rounded-lg border bg-background shadow-sm scrollbar-prop">
      <table className="min-w-max w-full border-separate border-spacing-0">
        <thead>
          {/* ================= ROOM NAMES ================= */}
          <tr>
            <th
              rowSpan={2}
              className="sticky top-0 left-0 z-50 border border-border bg-primary px-1.5 text-center text-[10px] font-semibold text-white sm:text-sm"
            >
              DATETIME
            </th>

            {paddedRooms.map((room) => (
              <th
                key={room.roomId}
                colSpan={2}
                className="sticky top-0 z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-semibold text-white sm:text-sm"
              >
                {room.roomName || "\u00A0"}
              </th>
            ))}
          </tr>

          {/* ================= PARAMETERS ================= */}
          <tr>
            {paddedRooms.map((room) => (
              <Fragment key={room.roomId}>
                <th className="sticky top-5 z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm">
                  Temp °C
                </th>

                <th className="sticky top-5 z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm">
                  RH %
                </th>
              </Fragment>
            ))}
          </tr>

          {/* ================= AVG / MIN / MAX ================= */}
          {summaryRows.map((stat, index) => {
            const stickyTop = index === 0 ? "top-[45px]" : index === 1 ? "top-[65px]" : "top-[85px]";

            return (
              <tr key={stat.label}>
                <th
                  className={`sticky left-0 z-40 border border-border bg-primary px-1.5 text-center text-[10px] font-semibold text-white sm:text-sm ${stickyTop}`}
                >
                  {stat.label}
                </th>

                {paddedRooms.map((room) => (
                  <Fragment key={room.roomId}>
                    {/* Temperature */}
                    <th
                      className={`sticky z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm ${stickyTop}`}
                    >
                      {formatStat(room[stat.temperature], "temperature")}
                    </th>

                    {/* Relative Humidity */}
                    <th
                      className={`sticky z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm ${stickyTop}`}
                    >
                      {formatStat(room[stat.rh], "rh")}
                    </th>
                  </Fragment>
                ))}
              </tr>
            );
          })}
        </thead>

        {/* ================= NORMAL DATA ================= */}
        <tbody>
          {rows.map((row, index) => {
            const even = index % 2 === 0;

            return (
              <tr key={`${row.timeStamp}-${index}`} className={`transition-colors hover:bg-muted/70 ${even ? "bg-background" : "bg-card"}`}>
                {/* DATETIME */}
                <td className="sticky left-0 z-30 whitespace-nowrap border border-border bg-primary p-0.5 text-center text-[10px] font-medium leading-none text-card sm:text-sm">
                  {format(new Date(row.timeStamp), "dd MMM yy")}

                  <br />

                  {format(new Date(row.timeStamp), "hh:mm a")}
                </td>

                {/* Room values */}
                {row.values.map((log, i) => (
                  <Fragment key={i}>
                    {/* Temperature */}
                    <td className="border border-border p-0.5 text-center text-[10px] sm:text-sm">
                      {log.avgTemp != null ? Number(log.avgTemp).toFixed(1) : "-"}
                    </td>

                    {/* Relative Humidity */}
                    <td className="border border-border p-0.5 text-center text-[10px] sm:text-sm">
                      {log.rh != null ? Math.round(Number(log.rh)) : "-"}
                    </td>
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
