"use client";
import { format } from "date-fns";
import { Clock, Thermometer } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useMemo, memo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ isExport, data }) => {
  const chartRows = useMemo(() => {
    const filteredRows = (data?.content ?? []).filter(
      (row) => row.energy != null,
    );

    const sampledRows =
      filteredRows.length <= 1000
        ? filteredRows
        : filteredRows.filter(
            (_, index) => index % Math.ceil(filteredRows.length / 1000) === 0,
          );

    return sampledRows.map(({ timestamp, energy }) => ({
      timestamp,
      energy,
    }));
  }, [data?.content]);

  // THEME-BASED COLORS
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isMobile, setIsMobile] = useState(false);
  const [ht, setHeight] = useState(200);
  const primary = "#3dcd58";

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 640);
      setHeight(window.innerWidth < 768 ? 200 : 600);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // CUSTOM HOVER
  const CustomTooltip = memo(({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    return (
      <div
        style={{ width: 250 }}
        className="p-3 rounded-xl shadow-xl border border-border  bg-card/60 backdrop-blur-xl text-[9px] sm:text-xs"
      >
        <div className="flex gap-2 font-bold h-5 text-text ">
          <Clock className="size-4  " />
          <span>
            TimeStamp: {format(data.timestamp, "dd MMM yy hh:mm:ss a")}
          </span>
        </div>

        <div className="flex gap-2 font-bold h-5 text-primary ">
          <Thermometer className="size-4  " />
          <span>
            Energy:{" "}
            {data.energy != null ? Number(data.energy).toFixed(2) : "--"} kwh
          </span>
        </div>
      </div>
    );
  });
  CustomTooltip.displayName = "CustomTooltip";

  const CustomLegend = memo(({ payload = [] }) => {
    return (
      <div className="flex gap-4 justify-center items-center mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-1">
            <svg width="20" height="12">
              {/* line */}
              <line
                x1="0"
                y1="6"
                x2="20"
                y2="6"
                stroke={entry.color}
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* center dot */}
              <circle
                cx="10"
                cy="6"
                r="3"
                fill={entry.color}
                stroke={entry.color}
              />
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
  const width = isExport ? 1920 : undefined;
  const height = isExport ? 720 : 400;
  const fontSize = isExport ? 21 : 12;

  const ChartBody = (
    <LineChart
      width={isExport ? width : undefined}
      height={isExport ? height : undefined}
      data={chartRows}
      style={{
        backgroundColor: isExport ? "#FFFFFF" : undefined,
        border: isExport ? "#f1f3f4" : undefined,
        borderWidth: isExport ? 1 : undefined,
      }}
    >
      <CartesianGrid
        stroke={isExport ? "#f1f3f4" : isDark ? "#ffffff1a" : "#03030314"}
        vertical={false}
      />

      <XAxis
        dataKey="timestamp"
        tickCount={10}
        tick={{
          fontSize: fontSize,
          className: "text-text fill-current ",
          angle: -45,
          textAnchor: "end",
        }}
        height={isExport ? 140 : 80}
        tickFormatter={(value) => format(value, "dd | hh:mm a")}
        label={{
          value: "TIMESTAMP",
          position: "insideBottom",
          style: {
            fontSize: fontSize,
            textAnchor: "middle",
            fontWeight: "bold",
          },
          className: "fill-current",
        }}
      />

      <YAxis
        tickCount={6}
        tick={{ fontSize: fontSize, className: "fill-current" }}
        label={{
          value: "ENERGY (KWH)",
          angle: -90,
          dx: 10,
          position: "insideLeft",
          className: "fill-current",
          style: {
            fontSize: fontSize,
            textAnchor: "middle",
            fontWeight: "bold",
          },
        }}
      />

      {isExport ? null : (
        <Tooltip
          content={<CustomTooltip />}
          position={
            isMobile
              ? {
                  x: window.innerWidth / 2 - 180,
                  y: window.innerHeight / 2 - 200,
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

      <Legend
        content={CustomLegend}
        verticalAlign="top"
        align="center"
        wrapperStyle={{ fontSize: fontSize }}
      />

      <Line
        type="monotoneX"
        dataKey="energy"
        stroke={primary}
        strokeWidth={3}
        dot={false}
        isAnimationActive={false}
        activeDot={{ r: 4 }}
      />
    </LineChart>
  );

  return (
    <div className="glass-card">
      {isExport ? (
        ChartBody
      ) : (
        <ResponsiveContainer width="100%" height={ht}>
          {ChartBody}
        </ResponsiveContainer>
      )}
    </div>
  );
};
export default Chart;
