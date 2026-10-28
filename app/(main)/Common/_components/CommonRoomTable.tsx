"use client";

import { Fragment } from "react";
import { format } from "date-fns";
import { CommonRoomLogResponse, CommonRoomResponse } from "@/types/dashboard.types";

const MAX_ROOMS = 10;
const CATEGORY_WITHOUT_RH = new Set([2, 3, 5]);

type TableRow = {
  timeStamp: string | number | Date;
  values: Partial<CommonRoomLogResponse>[];
};

type CommonRoomTableProps = {
  rooms: CommonRoomResponse[];
};
const cellClass = "border border-border p-0.5 text-center text-[10px] sm:text-sm";

function hideRH(categoryId?: number | null): boolean {
  return categoryId != null && CATEGORY_WITHOUT_RH.has(categoryId);
}

export default function CommonRoomTable({ rooms }: CommonRoomTableProps) {
  if (!rooms?.length) return null;

  // Pad rooms so the table always has 10 room columns.
  const paddedRooms: CommonRoomResponse[] = [
    ...rooms,
    ...Array.from(
      { length: Math.max(0, MAX_ROOMS - rooms.length) },
      (_, i): CommonRoomResponse => ({
        roomId: `empty-${i}`,
        roomName: "",
        categoryId: rooms[0]?.categoryId ?? null,
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

            {paddedRooms.map((room) => {
              const hide = hideRH(room.categoryId);

              return (
                <th
                  key={room.roomId}
                  colSpan={hide ? 1 : 2}
                  className="sticky top-0 z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-semibold text-white sm:text-sm"
                >
                  {room.roomName || "\u00A0"}
                </th>
              );
            })}
          </tr>

          {/* ================= PARAMETERS ================= */}
          <tr>
            {paddedRooms.map((room) => {
              const hide = hideRH(room.categoryId);

              return (
                <Fragment key={room.roomId}>
                  <th className="sticky top-5 z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm">
                    Temp °C
                  </th>

                  {!hide && (
                    <th className="sticky top-5 z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm">
                      RH %
                    </th>
                  )}
                </Fragment>
              );
            })}
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

                {paddedRooms.map((room) => {
                  const hide = hideRH(room.categoryId);

                  return (
                    <Fragment key={room.roomId}>
                      <th
                        className={`sticky z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm ${stickyTop}`}
                      >
                        {formatStat(room[stat.temperature], "temperature")}
                      </th>

                      {!hide && (
                        <th
                          className={`sticky z-40 border border-border bg-primary p-0.5 text-center text-[10px] font-medium text-white sm:text-sm ${stickyTop}`}
                        >
                          {formatStat(room[stat.rh], "rh")}
                        </th>
                      )}
                    </Fragment>
                  );
                })}
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
                <td className="sticky left-0 z-30 whitespace-nowrap border border-border bg-primary p-0.5 text-center text-[10px] font-medium leading-none text-card sm:text-sm">
                  {format(new Date(row.timeStamp), "dd MMM yy")}
                  <br />
                  {format(new Date(row.timeStamp), "hh:mm a")}
                </td>

                {row.values.map((log, i) => {
                  const room = paddedRooms[i];
                  const hide = hideRH(room?.categoryId);

                  return (
                    <Fragment key={i}>
                      {/* Temperature */}
                      <td className={cellClass}>{log.avgTemp != null ? formatStat(log.avgTemp, "temperature") : "-"}</td>

                      {/* RH: hidden for categories 2, 3 and 5 */}
                      {!hide && <td className={cellClass}>{log.rh != null ? formatStat(log.rh, "rh") : "-"}</td>}
                    </Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
