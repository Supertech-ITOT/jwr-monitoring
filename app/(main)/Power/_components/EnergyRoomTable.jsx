"use client";

import { Fragment } from "react";
import { format } from "date-fns";

const MAX_ROOMS = 3;

export default function EnergyRoomTable({ rooms }) {
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
              className="sticky top-0 left-0 z-50 
                bg-primary text-primary-foreground
                border border-border
                px-1.5
                text-center sm:text-sm text-[10px] font-semibold "
            >
              DATETIME
            </th>

            {paddedRooms.map((room) => (
              <th
                key={room.roomId}
                colSpan={4}
                className="sticky top-0 z-40
                  bg-primary text-primary-foreground
                  border border-border
                  p-0.5
                  text-center font-semibold sm:text-sm text-[10px]"
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
                  className="sticky top-5 z-40
                    bg-primary text-primary-foreground
                    border border-border
                    p-0.5
                    text-center text-sm font-medium sm:text-sm text-[10px]"
                >
                  Energy kWh
                </th>

                <th
                  className="sticky top-5 z-40
                    bg-primary text-primary-foreground
                    border border-border
                    p-0.5
                    text-center text-sm font-medium sm:text-sm text-[10px]"
                >
                  Current A
                </th>
                <th
                  className="sticky top-5 z-40
                    bg-primary text-primary-foreground
                    border border-border
                    p-0.5
                    text-center text-sm font-medium sm:text-sm text-[10px]"
                >
                  Voltage V
                </th>
                <th
                  className="sticky top-5 z-40
                    bg-primary text-primary-foreground
                    border border-border
                    p-0.5
                    text-center text-sm font-medium sm:text-sm text-[10px]"
                >
                  Frequency Hz
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
                <td className="sticky left-0 z-30 whitespace-nowrap border border-border p-0.5 text-center font-medium bg-primary text-card leading-none sm:text-sm text-[10px]">
                  {format(new Date(row.timeStamp), "dd MMM yy")}
                  <br />
                  {format(new Date(row.timeStamp), "hh:mm a")}
                </td>

                {row.values.map((log, i) => (
                  <Fragment key={i}>
                    <td className="border border-border p-0.2 text-center sm:text-sm text-[10px]">
                      {log.energy != null ? Number(log.energy).toFixed(1) : "-"}
                    </td>

                    <td className="border border-border p-0.2 text-center sm:text-sm text-[10px]">
                      {log.current != null
                        ? Math.round(Number(log.current))
                        : "-"}
                    </td>
                    <td className="border border-border p-0.2 text-center sm:text-sm text-[10px]">
                      {log.voltage != null
                        ? Math.round(Number(log.voltage))
                        : "-"}
                    </td>
                    <td className="border border-border p-0.2 text-center sm:text-sm text-[10px]">
                      {log.frequency != null
                        ? Math.round(Number(log.frequency))
                        : "-"}
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
