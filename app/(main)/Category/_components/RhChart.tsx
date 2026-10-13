"use client";

import { format } from "date-fns";
import { Clock, Cloud, Rotate3D } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState, memo } from "react";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SVGProps } from "react";
import { PageResponse, RoomHistoricalValueDto } from "@/app/common/api.types";

interface CustomXAxisTickProps extends SVGProps<SVGGElement> {
  x?: number;
  y?: number;
  payload?: {
    value: string | number;
  };
  fontSize?: number;
}

const CustomXAxisTick = ({ x = 0, y = 0, payload, fontSize = 12 }: CustomXAxisTickProps) => {
  if (!payload) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text transform="rotate(-45)" x={-8} y={8} textAnchor="end" fontSize={fontSize} fill="currentColor">
        {format(new Date(payload.value), "dd | hh:mm a")}
      </text>
    </g>
  );
};

interface CustomTooltipData {
  timestamp: string | number | Date;
  rh: number | string | null;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CustomTooltipData;
  }>;
}

interface Props {
  isExport?: boolean;
  data?: PageResponse<RoomHistoricalValueDto>;
}

interface CustomLegendEntry {
  color?: string;
  value?: string | number;
}

interface CustomLegendProps {
  payload?: Array<{
    color?: string;
    value?: string | number;
  }>;
}

const CustomTooltip = memo(({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;

  return (
    <div style={{ width: 250 }} className="p-3 rounded-xl shadow-xl border border-border bg-card/60 backdrop-blur-xl text-[9px] sm:text-xs">
      <div className="flex gap-2 font-bold h-5 text-text">
        <Clock className="size-4" />
        <span>TimeStamp: {format(new Date(row.timestamp), "dd MMM yy hh:mm:ss a")}</span>
      </div>

      <div className="flex gap-2 font-bold h-5 text-secondary">
        <Cloud className="size-4" />
        <span>RH: {Math.round(Number(row.rh))}%</span>
      </div>
    </div>
  );
});

CustomTooltip.displayName = "CustomTooltip";

const CustomLegend = memo(({ payload = [] }: CustomLegendProps) => {
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

export default function RhChart({ isExport = false, data }: Props) {
  const chartRows = useMemo(() => {
    const filteredRows = (data?.content ?? []).filter((row) => row.rh != null);

    const sampledRows =
      filteredRows.length <= 1000 ? filteredRows : filteredRows.filter((_, index) => index % Math.ceil(filteredRows.length / 1000) === 0);

    return sampledRows.map(({ timestamp, rh }) => ({
      timestamp,
      rh: Number(rh),
    }));
  }, [data?.content]);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isMobile, setIsMobile] = useState(false);
  const [ht, setHeight] = useState(200);

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
        tick={(props) => <CustomXAxisTick {...props} fontSize={fontSize} />}
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
        tickCount={6}
        tick={{
          fontSize,
          className: "fill-current",
        }}
        label={{
          value: "RELATIVE HUMIDITY (%)",
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

      <Line type="monotoneX" dataKey="rh" stroke={secondary} strokeWidth={3} dot={false} isAnimationActive={false} activeDot={{ r: 4 }} />
    </LineChart>
  );

  return (
    <div className="glass-card">
      {isExport ? (
        <LineChart
          width={1920}
          height={720}
          data={chartRows}
          margin={{ top: 20, right: 10 }}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #f1f3f4",
          }}
        >
          <CartesianGrid stroke="#f1f3f4" vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickCount={10}
            tick={{ fontSize }}
            height={140}
            tickFormatter={(value) => format(new Date(value), "dd | hh:mm a")}
            label={{
              value: "TIMESTAMP",
              position: "insideBottom",
            }}
          />
          <YAxis
            tickCount={6}
            tick={{ fontSize }}
            label={{
              value: "RELATIVE HUMIDITY (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Legend content={<CustomLegend />} verticalAlign="top" align="center" wrapperStyle={{ fontSize }} />
          <Line type="monotoneX" dataKey="rh" stroke={secondary} strokeWidth={3} dot={false} isAnimationActive={false} activeDot={{ r: 4 }} />
        </LineChart>
      ) : (
        <ResponsiveContainer width="100%" height={ht}>
          {chartBody}
        </ResponsiveContainer>
      )}
    </div>
  );
}
