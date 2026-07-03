"use client";

import { Fragment } from "react";
import { format } from "date-fns";

export default function CommonRoomTable({ rooms }) {
  if (!rooms?.length) return null;

  const rows = rooms[0].logs.map((_, index) => ({
    timeStamp: rooms[0].logs[index].timeStamp,
    values: rooms.map((room) => room.logs[index] ?? {}),
  }));

  return (
    <div className="h-full overflow-auto rounded-lg border bg-background shadow-sm scrollbar-prop">
      <table className="min-w-max w-full border-separate border-spacing-0">
        <thead>
          {/* Room Names */}
          <tr>
            <th
              rowSpan={2}
              className="sticky top-0 left-0 z-50 min-w-[180px]
                bg-primary text-primary-foreground
                border border-border
                px-4 py-3
                text-center font-semibold"
            >
              DATETIME
            </th>

            {rooms.map((room) => (
              <th
                key={room.roomId}
                colSpan={2}
                className="sticky top-0 z-40
                  bg-primary text-primary-foreground
                  border border-border
                  px-4 py-3
                  text-center font-semibold"
              >
                {room.roomName}
              </th>
            ))}
          </tr>

          {/* Temp RH */}
          <tr>
            {rooms.map((room) => (
              <Fragment key={room.roomId}>
                <th
                  className="sticky top-12 z-40
                    bg-primary text-primary-foreground
                    border border-border
                    px-3 py-2
                    text-center text-sm font-medium"
                >
                  Temp °C
                </th>

                <th
                  className="sticky top-12 z-40
                    bg-primary text-primary-foreground
                    border border-border
                    px-3 py-2
                    text-center text-sm font-medium"
                >
                  RH %
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => {
            const even = index % 2 === 0;

            return (
              <tr
                key={index}
                className={`transition-colors hover:bg-muted/70 ${
                  even ? "bg-background" : "bg-card"
                }`}
              >
                <td
                  className={`sticky left-0 z-30 whitespace-nowrap
                    border border-border
                    px-4 py-2
                    font-medium
                    ${even ? "bg-background" : "bg-muted/30"}`}
                >
                  {format(new Date(row.timeStamp), "dd MMM yyyy hh:mm a")}
                </td>

                {row.values.map((log, i) => (
                  <Fragment key={i}>
                    <td className="border border-border px-3 py-2 text-center">
                      {log.avgTemp != null
                        ? Number(log.avgTemp).toFixed(1)
                        : "-"}
                    </td>

                    <td className="border border-border px-3 py-2 text-center">
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
