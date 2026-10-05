"use client";

import { Fragment } from "react";
import { format } from "date-fns";

const MAX_ROOMS = 10;

export default function CommonRoomTable({ rooms }) {
  if (!rooms?.length) return null;

  // Pad rooms so table always has 10 room columns
  const paddedRooms = [
    ...rooms,
    ...Array.from({ length: Math.max(0, MAX_ROOMS - rooms.length) }, (_, i) => ({
      roomId: `empty-${i}`,
      roomName: "",
      logs: [],
    })),
  ];

  const rows = rooms[0].logs.map((_, index) => ({
    timeStamp: rooms[0].logs[index].timeStamp,
    values: paddedRooms.map((room) => room.logs[index] ?? {}),
  }));

  // Format summary values
  const formatStat = (value, type) => {
    if (value == null) return "-";

    const number = Number(value);

    if (type === "temperature") return number.toFixed(1);
    if (type === "rh") return Math.round(number);

    return number;
  };

  // AVG / MIN / MAX
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
  ];

  return (
    <div className="h-full overflow-auto rounded-lg border bg-background shadow-sm scrollbar-prop">
      <table className="min-w-max w-full border-separate border-spacing-0">
        <thead>
          {/* ================= ROOM NAMES ================= */}
          <tr>
            <th
              rowSpan={2}
              className="sticky top-0 left-0 z-50
                bg-primary text-white
                border border-border
                px-1.5
                text-center
                font-semibold
                sm:text-sm text-[10px]"
            >
              DATETIME
            </th>

            {paddedRooms.map((room) => (
              <th
                key={room.roomId}
                colSpan={2}
                className="sticky top-0 z-40
                  bg-primary text-white
                  border border-border
                  p-0.5
                  text-center
                  font-semibold
                  sm:text-sm text-[10px]"
              >
                {room.roomName || "\u00A0"}
              </th>
            ))}
          </tr>

          {/* ================= PARAMETERS ================= */}
          <tr>
            {paddedRooms.map((room) => (
              <Fragment key={room.roomId}>
                <th
                  className="sticky top-5 z-40
                    bg-primary text-white
                    border border-border
                    p-0.5
                    text-center
                    font-medium
                    sm:text-sm text-[10px]"
                >
                  Temp °C
                </th>

                <th
                  className="sticky top-5 z-40
                    bg-primary text-white
                    border border-border
                    p-0.5
                    text-center
                    font-medium
                    sm:text-sm text-[10px]"
                >
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
                {/* AVG / MIN / MAX label */}
                <th
                  className={`sticky left-0 z-40
                    bg-primary text-white
                    border border-border
                    px-1.5
                    text-center
                    font-semibold
                    sm:text-sm text-[10px]
                    ${stickyTop}`}
                >
                  {stat.label}
                </th>

                {paddedRooms.map((room) => (
                  <Fragment key={room.roomId}>
                    {/* Temperature */}
                    <th
                      className={`sticky z-40
                        bg-primary text-white
                        border border-border
                        p-0.5
                        text-center
                        font-medium
                        sm:text-sm text-[10px]
                        ${stickyTop}`}
                    >
                      {formatStat(room[stat.temperature], "temperature")}
                    </th>

                    {/* RH */}
                    <th
                      className={`sticky z-40
                        bg-primary text-white
                        border border-border
                        p-0.5
                        text-center
                        font-medium
                        sm:text-sm text-[10px]
                        ${stickyTop}`}
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
              <tr key={index} className={`transition-colors hover:bg-muted/70 ${even ? "bg-background" : "bg-card"}`}>
                {/* DATETIME */}
                <td
                  className="sticky left-0 z-30
                    whitespace-nowrap
                    border border-border
                    p-0.5
                    text-center
                    font-medium
                    bg-primary text-card
                    leading-none
                    sm:text-sm text-[10px]"
                >
                  {format(new Date(row.timeStamp), "dd MMM yy")}

                  <br />

                  {format(new Date(row.timeStamp), "hh:mm a")}
                </td>

                {/* Room values */}
                {row.values.map((log, i) => (
                  <Fragment key={i}>
                    {/* Temperature */}
                    <td
                      className="border border-border
                        p-0.2
                        text-center
                        sm:text-sm text-[10px]"
                    >
                      {log.avgTemp != null ? Number(log.avgTemp).toFixed(1) : "-"}
                    </td>

                    {/* RH */}
                    <td
                      className="border border-border
                        p-0.2
                        text-center
                        sm:text-sm text-[10px]"
                    >
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
