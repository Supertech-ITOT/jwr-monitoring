"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { formatValue } from "@/lib/formatValue";
import { Cloud, House, Thermometer, Zap } from "lucide-react";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const parameterConfig = {
  1: {
    field: "value",
    label: "TEMPERATURE",
    icon: Thermometer,
  },
  2: {
    field: "value",
    label: "ENERGY",
    icon: Zap,
  },
  3: {
    field: "value",
    label: "RH",
    icon: Cloud,
  },
};

const Chart = ({ rows, loading, filterData }) => {
  const {
    field,
    label,
    icon: Icon,
  } = parameterConfig[filterData?.parameterId] || parameterConfig[1];

  const chartData = useMemo(
    () =>
      rows?.map((item) => ({
        ...item,
        value: item[field],
      })) || [],
    [rows, field],
  );

  const CustomTooltip = React.memo(({ active, payload, Icon, label }) => {
    if (!active || !payload?.length) return null;

    const item = payload[0].payload;

    return (
      <div className="w-45 bg-cardbackground/80 border border-border rounded-xl p-2 text-sm">
        <div className="flex gap-2 items-center">
          <House className="text-primary size-4" />
          <span className="text-primary font-bold">Room:</span>
          <strong className="text-secondary">{item.roomName}</strong>
        </div>

        <div className="flex gap-2 items-center">
          {Icon && <Icon className="text-primary size-4 shrink-0" />}
          <span className="text-primary font-bold">{label}:</span>
          <strong className="text-secondary">
            {formatValue(item.value, filterData?.parameterId)}
          </strong>
        </div>
      </div>
    );
  });
  const cells = useMemo(
    () =>
      chartData.map((_, index) => (
        <Cell key={index} fill={index % 2 === 0 ? "#3dcd58" : "#3a80f6"} />
      )),
    [chartData],
  );

  if (loading) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="h-[260px] sm:h-[550px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart margin={{ bottom: 20, top: 20, right: 10 }} data={chartData}>
          <CartesianGrid
            stroke="#03030314"
            strokeDasharray="0"
            vertical={false}
          />
          <XAxis
            dataKey="roomName"
            tick={{ className: "fill-current", fontSize: 12 }}
            tickMargin={10}
            interval={0}
            label={{
              value: "ROOM NAME",
              position: "insideBottom",
              dy: 20,
              style: { textAnchor: "middle", fontSize: 12, fontWeight: "bold" },
              className: " fill-current",
            }}
          />
          <YAxis
            tick={{ className: "fill-current", fontSize: 12 }}
            label={{
              value: label,
              angle: -90,
              dx: 20,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fontSize: 12,
                fontWeight: "bold",
              },
              className: "fill-current",
            }}
          />
          <Tooltip
            content={(props) => (
              <CustomTooltip {...props} Icon={Icon} label={label} />
            )}
          />
          <Bar dataKey="value">
            {cells}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(value) => formatValue(value, filterData.parameterId)}
              className=" fill-current"
              style={{ fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(Chart);
