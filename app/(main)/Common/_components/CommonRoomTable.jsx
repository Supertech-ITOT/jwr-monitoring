"use client";

import { Fragment } from "react";
import { format } from "date-fns";

const MAX_ROOMS = 12;

export default function CommonRoomTable({ rooms }) {
  if (!rooms?.length) return null;

  // Pad rooms so table always has 12 room columns
  const paddedRooms = [
    ...rooms,
    ...Array.from(
      { length: Math.max(0, MAX_ROOMS - rooms.length) },
      (_, i) => ({
        roomId: `empty-${i}`,
        roomName: "",
        logs: [],
      }),
    ),
  ];

  const rows = rooms[0].logs.map((_, index) => ({
    timeStamp: rooms[0].logs[index].timeStamp,
    values: paddedRooms.map((room) => room.logs[index] ?? {}),
  }));

  return (
    <div className="h-full overflow-auto rounded-lg border bg-background shadow-sm scrollbar-prop">
      <table className="min-w-max w-full border-separate border-spacing-0">
        <thead>
          {/* Room Names */}
          <tr>
            <th
              rowSpan={2}
              className="sticky top-0 left-0 z-50 w-[120px]
                bg-primary text-primary-foreground
                border border-border
                p-3
                text-center font-semibold"
            >
              DATETIME
            </th>

            {paddedRooms.map((room) => (
              <th
                key={room.roomId}
                colSpan={2}
                className="sticky top-0 z-40
                  bg-primary text-primary-foreground
                  border border-border
                  p-1.5
                  text-center font-semibold"
              >
                {room.roomName || "\u00A0"}
              </th>
            ))}
          </tr>

          {/* Temp RH */}
          <tr>
            {paddedRooms.map((room) => (
              <Fragment key={room.roomId}>
                <th
                  className="sticky top-8 z-40
                    bg-primary text-primary-foreground
                    border border-border
                    p-1.5
                    text-center text-sm font-medium"
                >
                  Temp °C
                </th>

                <th
                  className="sticky top-8 z-40
                    bg-primary text-primary-foreground
                    border border-border
                    p-1.5
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
                <td className="sticky left-0 z-30 whitespace-nowrap border border-border p-0.5 text-center font-medium bg-primary text-card leading-none">
                  {format(new Date(row.timeStamp), "dd MMM yy")}
                  <br />
                  {format(new Date(row.timeStamp), "hh:mm a")}
                </td>

                {row.values.map((log, i) => (
                  <Fragment key={i}>
                    <td className="border border-border p-0.5 text-center">
                      {log.avgTemp != null
                        ? Number(log.avgTemp).toFixed(1)
                        : "-"}
                    </td>

                    <td className="border border-border p-0.5 text-center">
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
