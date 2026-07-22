"use client";

import { Card } from "@/components/ui/card";
import { Home, Thermometer, Droplets } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";

export default function RoomCard({
  room = {
    name: "CS1",
    temperature: 55.0,
    rh: 45,
    status: "on",
    timestamp: "01 Jul 2026, 12:20 PM",
  },
}) {
  const statusConfig = {
    on: {
      badge: "bg-primary/10 text-primary border-primary",
    },
    off: {
      badge: "bg-red-50 text-red-500 border-red-500",
    },
  };

  const config = statusConfig[room.status] || statusConfig.normal;

  return (
    <Card
      className={clsx(
        "rounded-2xl border border-border shadow-sm hover:shadow-md transition-all p-0!",
      )}
    >
      <div className="p-2 space-y-2">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex gap-0.5 items-center">
            <div className="xl:size-10 size-8 rounded-full bg-primary/10 flex items-center justify-center border">
              <Home className="xl:size-5 size-4 text-primary" />
            </div>

            <h3 className="font-semibold xl:text-sm text-xs">{room.name}</h3>
          </div>

          <span
            className={clsx(
              "rounded p-0.5 text-[10px] xl:text-xs font-bold border",
              config.badge,
            )}
          >
            {room.status.toUpperCase()}
          </span>
        </div>

        {/* Parameters */}
        <div className="grid grid-cols-2 gap-0.5">
          <div className="flex flex-col items-center">
            <Thermometer className="xl:size-5 size-4 text-orange-500" />
            <span className="mt-1 font-semibold text-xs xl:text-sm">
              {room.temperature.toFixed(1)}°C
            </span>
            <small className="text-muted-foreground text-xs xl:text-sm">
              Temp
            </small>
          </div>

          <div className="flex flex-col items-center">
            <Droplets className="xl:size-5 size-4 text-blue-500" />
            <span className="mt-1 font-semibold text-xs xl:text-sm">
              {room.rh.toFixed(0)}%
            </span>
            <small className="text-muted-foreground text-xs xl:text-sm">
              RH
            </small>
          </div>
        </div>

        <div className="border-t pt-2 text-center text-muted-foreground text-xs xl:text-sm">
          {format(room.timestamp, "dd MMM yy")} <br />
          {format(room.timestamp, "hh mm a")}
        </div>
      </div>
    </Card>
  );
}
