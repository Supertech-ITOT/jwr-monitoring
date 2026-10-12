"use client";

import { format } from "date-fns";
import { Clock, Thermometer } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState, memo } from "react";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { TooltipProps, LegendProps } from "recharts";

interface TemperatureRow {
  timestamp: string | number | Date;
  avgTemperature: number | string | null;
}

interface TemperatureChartData {
  content?: TemperatureRow[];
}

interface TempChartProps {
  isExport?: boolean;
  data?: TemperatureChartData | null;
}

interface CustomLegendEntry {
  color?: string;
  value?: string | number;
}

const CustomTooltip = memo(({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;

  const row = payload[0].payload as TemperatureRow;

  return (
    <div style={{ width: 250 }} className="p-3 rounded-xl shadow-xl border border-border bg-card/60 backdrop-blur-xl text-[9px] sm:text-xs">
      <div className="flex gap-2 font-bold h-5 text-text">
        <Clock className="size-4" />
        <span>TimeStamp: {format(new Date(row.timestamp), "dd MMM yy hh:mm:ss a")}</span>
      </div>

      <div className="flex gap-2 font-bold h-5 text-primary">
        <Thermometer className="size-4" />
        <span>AvgTemp: {Number(row.avgTemperature).toFixed(1)} °C</span>
      </div>
    </div>
  );
});

CustomTooltip.displayName = "CustomTooltip";

const CustomLegend = memo(({ payload = [] }: LegendProps) => {
  const entries = payload as CustomLegendEntry[];

  return (
    <div className="flex gap-4 justify-center items-center mt-4">
      {entries.map((entry, index) => (
        <div key={index} className="flex items-center gap-1">
          <svg width="20" height="12">
            <line x1="0" y1="6" x2="20" y2="6" stroke={entry.color} strokeWidth="3" strokeLinecap="round" />

            <circle cx="10" cy="6" r="3" fill={entry.color} stroke={entry.color} />
          </svg>

          <span className="uppercase" style={{ color: entry.color }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
});

CustomLegend.displayName = "CustomLegend";

export default function TempChart({ isExport = false, data }: TempChartProps) {
  const chartRows = useMemo(() => {
    const filteredRows = (data?.content ?? []).filter((row) => row.avgTemperature != null);

    const sampledRows =
      filteredRows.length <= 1000 ? filteredRows : filteredRows.filter((_, index) => index % Math.ceil(filteredRows.length / 1000) === 0);

    return sampledRows.map(({ timestamp, avgTemperature }) => ({
      timestamp,
      avgTemperature: Number(avgTemperature),
    }));
  }, [data?.content]);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isMobile, setIsMobile] = useState(false);
  const [ht, setHeight] = useState(200);

  const primary = "#3dcd58";
  const secondary = "#3a80f6";

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 640);
      setHeight(window.innerWidth < 768 ? 200 : 390);
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  const width = isExport ? 1920 : undefined;
  const height = isExport ? 720 : 400;
  const fontSize = isExport ? 21 : 12;

  const chartBody = (
    <LineChart
      width={width}
      height={isExport ? height : undefined}
      data={chartRows}
      margin={{ top: 20, right: 10 }}
      style={{
        backgroundColor: isExport ? "#FFFFFF" : undefined,
        border: isExport ? "1px solid #f1f3f4" : undefined,
      }}
    >
      <CartesianGrid stroke={isExport ? "#f1f3f4" : isDark ? "#ffffff1a" : "#03030314"} vertical={false} />

      <XAxis
        dataKey="timestamp"
        tickCount={10}
        tick={{
          fontSize,
          className: "text-text fill-current",
          angle: -45,
          textAnchor: "end",
        }}
        height={isExport ? 140 : 80}
        tickFormatter={(value) => format(new Date(value), "dd | hh:mm a")}
        label={{
          value: "TIMESTAMP",
          position: "insideBottom",
          style: {
            fontSize,
            textAnchor: "middle",
            fontWeight: "bold",
          },
          className: "fill-current",
        }}
      />

      <YAxis
        domain={[(dataMin: number) => Math.floor(dataMin * 0.95), (dataMax: number) => Math.ceil(dataMax * 1.05)]}
        tickCount={6}
        tick={{
          fontSize,
          className: "fill-current",
        }}
        label={{
          value: "TEMPERATURE (°C)",
          angle: -90,
          dx: 10,
          position: "insideLeft",
          className: "fill-current",
          style: {
            fontSize,
            textAnchor: "middle",
            fontWeight: "bold",
          },
        }}
      />

      {!isExport && (
        <Tooltip
          content={<CustomTooltip />}
          position={
            isMobile
              ? {
                  x: typeof window !== "undefined" ? window.innerWidth / 2 - 180 : 0,
                  y: typeof window !== "undefined" ? window.innerHeight / 2 - 200 : 0,
                }
              : undefined
          }
          wrapperStyle={
            isMobile
              ? {
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 9999,
                  pointerEvents: "none",
                }
              : {}
          }
        />
      )}

      <Legend content={<CustomLegend />} verticalAlign="top" align="center" wrapperStyle={{ fontSize }} />

      <Line type="monotoneX" dataKey="avgTemperature" stroke={primary} strokeWidth={3} dot={false} isAnimationActive={false} activeDot={{ r: 4 }} />
    </LineChart>
  );

  return (
    <div className="glass-card">
      {isExport ? (
        chartBody
      ) : (
        <ResponsiveContainer width="100%" height={ht}>
          {chartBody}
        </ResponsiveContainer>
      )}
    </div>
  );
}
