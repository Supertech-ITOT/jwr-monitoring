"use client";

import { Card } from "@/components/ui/card";
import { Home, Thermometer, Droplets, Zap } from "lucide-react";
import clsx from "clsx";

export default function RoomTable({
  room = {
    name: "CS1",
    temperature: 25.4,
    rh: 55,
    status: "online",
    timestamp: "01 Jul 2026, 12:20 PM",
  },
  showHeader = false,
}) {
  const statusConfig = {
    on: {
      badge: "bg-primary/10 text-primary border-primary",
    },
    off: {
      badge: "bg-red-50 text-red-500 border-red-500",
    },
  };

  const config = statusConfig[room.status] || statusConfig.online;

  return (
    <Card className="border rounded-lg shadow-sm hover:shadow transition-all p-2! sm:p-4!">
      {showHeader && (
        <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_auto] lg:grid-cols-[1.8fr_1fr_1fr_0.8fr_1.5fr] px-3 py-2 border-b text-[10px] sm:text-xs font-bold uppercase text-primary">
          <div>Room</div>

          <div className="text-center">
            <span className="sm:hidden">Temp</span>
            <span className="hidden sm:inline">Temperature</span>
          </div>

          <div className="text-center">
            <span>RH</span>
          </div>

          <div className="text-center">Status</div>

          <div className="hidden lg:block text-right">Updated</div>
        </div>
      )}

      <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_auto] lg:grid-cols-[1.8fr_1fr_1fr_0.8fr_1.5fr] items-center gap-2 px-3 py-0.5">
        {/* Room */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden xs:flex size-8 rounded-full bg-primary/10 border items-center justify-center shrink-0">
            <Home className="size-4 text-primary" />
          </div>

          <div className="min-w-0">
            <div className="overflow-x-auto whitespace-nowrap scrollbar-none">
              <p className="font-semibold text-xs sm:text-sm inline-block">
                {room.name}
              </p>
            </div>

            <div className="overflow-x-auto whitespace-nowrap scrollbar-none lg:hidden">
              <p className="text-[10px] sm:text-xs text-muted-foreground inline-block">
                {room.timestamp}
              </p>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="flex items-center justify-center gap-1">
          <Thermometer className="size-4 text-orange-500 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">
            {room.temperature.toFixed(1)}°
          </span>
        </div>

        {/* RH */}
        <div className="flex items-center justify-center gap-1">
          <Droplets className="size-4 text-blue-500 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{room.rh}%</span>
        </div>

        {/* Status */}
        <div className="flex justify-end lg:justify-center">
          <span
            className={clsx(
              "rounded-full border px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap uppercase",
              config.badge,
            )}
          >
            {room.status}
          </span>
        </div>

        {/* Timestamp Desktop */}
        <div className="hidden lg:block text-right text-xs text-muted-foreground truncate">
          {room.timestamp}
        </div>
      </div>
    </Card>
  );
}
