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

  // Format summary values according to parameter
  const formatStat = (value, type) => {
    if (value == null) return "-";

    const number = Number(value);

    if (type === "energy") return number.toFixed(1);
    if (type === "current") return number.toFixed(2);
    if (type === "voltage") return Math.round(number);
    if (type === "frequency") return number.toFixed(1);

    return number;
  };

  const summaryRows = [
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

  return (
    <div className="h-full overflow-auto rounded-lg border bg-background shadow-sm scrollbar-prop">
      <table className="min-w-max w-full border-separate border-spacing-0">
        <thead>
          {/* Room Names */}
          <tr>
            <th
              rowSpan={2}
              className="sticky top-0 left-0 z-50 bg-primary text-white border border-border px-1.5 text-center font-semibold sm:text-sm text-[10px]"
            >
              DATETIME
            </th>

            {paddedRooms.map((room) => (
              <th
                key={room.roomId}
                colSpan={4}
                className="sticky top-0 z-40 bg-primary text-white border border-border p-0.5 text-center font-semibold sm:text-sm text-[10px]"
              >
                {room.roomName || "\u00A0"}
              </th>
            ))}
          </tr>

          {/* Parameters */}
          <tr>
            {paddedRooms.map((room) => (
              <Fragment key={room.roomId}>
                {["Energy kWh", "Current A", "Voltage V", "Frequency Hz"].map(
                  (label) => (
                    <th
                      key={label}
                      className="sticky top-5 z-40 bg-primary text-white border border-border p-0.5 text-center font-medium sm:text-sm text-[10px]"
                    >
                      {label}
                    </th>
                  ),
                )}
              </Fragment>
            ))}
          </tr>

          {/* AVG / MIN / MAX */}
          {summaryRows.map((stat, index) => (
            <tr key={stat.label}>
              <th
                className={`sticky left-0 z-40 bg-primary text-white border border-border px-1.5 text-center font-semibold sm:text-sm text-[10px] ${index === 0 ? "top-[45px]" : index === 1 ? "top-[65px]" : "top-[85px]"}`}
              >
                {stat.label}
              </th>

              {paddedRooms.map((room) => (
                <Fragment key={room.roomId}>
                  <th
                    className={`sticky z-40 bg-primary text-white border border-border p-0.5 text-center font-medium sm:text-sm text-[10px] ${index === 0 ? "top-[45px]" : index === 1 ? "top-[65px]" : "top-[85px]"}`}
                  >
                    {formatStat(room[stat.energy], "energy")}
                  </th>

                  <th
                    className={`sticky z-40 bg-primary text-white border border-border p-0.5 text-center font-medium sm:text-sm text-[10px] ${index === 0 ? "top-[45px]" : index === 1 ? "top-[65px]" : "top-[85px]"}`}
                  >
                    {formatStat(room[stat.current], "current")}
                  </th>

                  <th
                    className={`sticky z-40 bg-primary text-white border border-border p-0.5 text-center font-medium sm:text-sm text-[10px] ${index === 0 ? "top-[45px]" : index === 1 ? "top-[65px]" : "top-[85px]"}`}
                  >
                    {formatStat(room[stat.voltage], "voltage")}
                  </th>

                  <th
                    className={`sticky z-40 bg-primary text-white border border-border p-0.5 text-center font-medium sm:text-sm text-[10px] ${index === 0 ? "top-[45px]" : index === 1 ? "top-[65px]" : "top-[85px]"}`}
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
                        ? Number(log.current).toFixed(2)
                        : "-"}
                    </td>
                    <td className="border border-border p-0.2 text-center sm:text-sm text-[10px]">
                      {log.voltage != null
                        ? Math.round(Number(log.voltage))
                        : "-"}
                    </td>
                    <td className="border border-border p-0.2 text-center sm:text-sm text-[10px]">
                      {log.frequency != null
                        ? Number(log.frequency).toFixed(1)
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
