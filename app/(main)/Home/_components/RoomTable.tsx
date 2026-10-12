"use client";

import { Card } from "@/components/ui/card";
import { Home, Thermometer, Droplets } from "lucide-react";
import clsx from "clsx";

type RoomData = {
  name: string;
  temperature: number | string | null;
  rh: number | string | null;
  status: "on" | "off" | "online" | "offline";
  timestamp: string;
};

type RoomTableProps = {
  room?: RoomData;
  showHeader?: boolean;
};

export default function RoomTable({
  room = {
    name: "CS1",
    temperature: 25.4,
    rh: 55,
    status: "online",
    timestamp: "01 Jul 2026, 12:20 PM",
  },
  showHeader = false,
}: RoomTableProps): React.JSX.Element {
  const statusConfig: Record<RoomData["status"], { badge: string }> = {
    on: {
      badge: "bg-primary/10 text-primary border-primary",
    },
    off: {
      badge: "bg-red-50 text-red-500 border-red-500",
    },
    online: {
      badge: "bg-primary/10 text-primary border-primary",
    },
    offline: {
      badge: "bg-red-50 text-red-500 border-red-500",
    },
  };

  const config = statusConfig[room.status];

  const temperature = room.temperature != null ? Number(room.temperature) : null;

  const humidity = room.rh != null ? Number(room.rh) : null;

  return (
    <Card className="rounded-lg border p-2! shadow-sm transition-all hover:shadow sm:p-4!">
      {showHeader && (
        <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_auto] border-b px-3 py-2 text-[10px] font-bold uppercase text-primary sm:text-xs lg:grid-cols-[1.8fr_1fr_1fr_0.8fr_1.5fr]">
          <div>Room</div>

          <div className="text-center">
            <span className="sm:hidden">Temp</span>
            <span className="hidden sm:inline">Temperature</span>
          </div>

          <div className="text-center">
            <span>RH</span>
          </div>

          <div className="text-center">Status</div>

          <div className="hidden text-right lg:block">Updated</div>
        </div>
      )}

      <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_auto] items-center gap-2 px-3 py-0.5 lg:grid-cols-[1.8fr_1fr_1fr_0.8fr_1.5fr]">
        {/* Room */}
        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden size-8 shrink-0 items-center justify-center rounded-full border bg-primary/10 xs:flex">
            <Home className="size-4 text-primary" />
          </div>

          <div className="min-w-0">
            <div className="overflow-x-auto whitespace-nowrap scrollbar-none">
              <p className="inline-block text-xs font-semibold sm:text-sm">{room.name}</p>
            </div>

            <div className="overflow-x-auto whitespace-nowrap scrollbar-none lg:hidden">
              <p className="inline-block text-[10px] text-muted-foreground sm:text-xs">{room.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="flex items-center justify-center gap-1">
          <Thermometer className="size-4 shrink-0 text-orange-500" />

          <span className="text-xs font-medium sm:text-sm">
            {temperature !== null && Number.isFinite(temperature) ? `${temperature.toFixed(1)}°` : "-"}
          </span>
        </div>

        {/* Relative Humidity */}
        <div className="flex items-center justify-center gap-1">
          <Droplets className="size-4 shrink-0 text-blue-500" />

          <span className="text-xs font-medium sm:text-sm">{humidity !== null && Number.isFinite(humidity) ? `${humidity.toFixed(0)}%` : "-"}</span>
        </div>

        {/* Status */}
        <div className="flex justify-end lg:justify-center">
          <span className={clsx("whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase sm:text-xs", config.badge)}>
            {room.status}
          </span>
        </div>

        {/* Timestamp Desktop */}
        <div className="hidden truncate text-right text-xs text-muted-foreground lg:block">{room.timestamp}</div>
      </div>
    </Card>
  );
}
