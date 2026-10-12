"use client";

import { Card } from "@/components/ui/card";
import { Home, Thermometer, Droplets } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";

type RoomData = {
  name: string;
  temperature: number | string | null;
  rh: number | string | null;
  status: "on" | "off";
  timestamp: string | number | Date;
};

type RoomCardProps = {
  room?: RoomData;
};

export default function RoomCard({
  room = {
    name: "CS1",
    temperature: 55.0,
    rh: 45,
    status: "on",
    timestamp: "01 Jul 2026, 12:20 PM",
  },
}: RoomCardProps): React.JSX.Element {
  const statusConfig = {
    on: {
      badge: "bg-primary/10 text-primary border-primary",
    },
    off: {
      badge: "bg-red-50 text-red-500 border-red-500",
    },
  };

  const config = statusConfig[room.status];

  const temperature = room.temperature != null ? Number(room.temperature) : null;

  const humidity = room.rh != null ? Number(room.rh) : null;

  const timestamp = new Date(room.timestamp);

  return (
    <Card className={clsx("rounded-2xl border border-border p-0! shadow-sm transition-all hover:shadow-md")}>
      <div className="space-y-2 p-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <div className="flex size-8 items-center justify-center rounded-full border bg-primary/10 xl:size-10">
              <Home className="size-4 text-primary xl:size-5" />
            </div>

            <h3 className="text-xs font-semibold xl:text-sm">{room.name}</h3>
          </div>

          <span className={clsx("rounded border p-0.5 text-[10px] font-bold xl:text-xs", config.badge)}>{room.status.toUpperCase()}</span>
        </div>

        {/* Parameters */}
        <div className="grid grid-cols-2 gap-0.5">
          <div className="flex flex-col items-center">
            <Thermometer className="size-4 text-orange-500 xl:size-5" />

            <span className="mt-1 text-xs font-semibold xl:text-sm">
              {temperature !== null && Number.isFinite(temperature) ? `${temperature.toFixed(1)}°C` : "-"}
            </span>

            <small className="text-xs text-muted-foreground xl:text-sm">Temp</small>
          </div>

          <div className="flex flex-col items-center">
            <Droplets className="size-4 text-blue-500 xl:size-5" />

            <span className="mt-1 text-xs font-semibold xl:text-sm">
              {humidity !== null && Number.isFinite(humidity) ? `${humidity.toFixed(0)}%` : "-"}
            </span>

            <small className="text-xs text-muted-foreground xl:text-sm">RH</small>
          </div>
        </div>

        {/* Timestamp */}
        <div className="border-t pt-2 text-center text-xs text-muted-foreground xl:text-sm">
          {Number.isNaN(timestamp.getTime()) ? (
            "-"
          ) : (
            <>
              {format(timestamp, "dd MMM yy")}
              <br />
              {format(timestamp, "hh:mm a")}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
