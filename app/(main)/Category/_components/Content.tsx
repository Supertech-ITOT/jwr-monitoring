"use client";

import { useState } from "react";
import dayjs from "dayjs";
import TableUI from "./TableUI";
import CategoryFilter from "./CategoryFilter";
import Download from "./Download";
import TempChart from "./TempChart";
import RhChart from "./RhChart";
import { useGetHistoricalRoomMetrics } from "@/hooks/useDashboard";
import { useGetCategoryById } from "@/hooks/useCategory";
import { useGetRoomById } from "@/hooks/useRoom";

export interface FilterData {
  fromDate: string;
  toDate: string;
  day: string;
  sort: string;
  interval: number;
  categoryId: number | null;
  roomId: number | null;
}

export default function Content() {
  const now = dayjs();

  const initialFilter: FilterData = {
    fromDate: now.subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now.format("YYYY-MM-DDTHH:mm:ss"),
    day: "Current",
    sort: "timestamp,desc",
    interval: 60,
    categoryId: 1,
    roomId: 1,
  };

  const [draftFilter, setDraftFilter] = useState<FilterData>(initialFilter);
  const [appliedFilter, setAppliedFilter] = useState<FilterData>(initialFilter);
  const { data, isLoading } = useGetHistoricalRoomMetrics({
    categoryId: appliedFilter.categoryId ?? 1,
    fromDate: appliedFilter.fromDate,
    interval: appliedFilter.interval,
    roomId: appliedFilter.roomId ?? 1,
    toDate: appliedFilter.toDate,
    sort: appliedFilter.sort,
    page: 0,
    size: 99999,
  });
  const { data: category } = useGetCategoryById(appliedFilter.categoryId ?? 1);
  const { data: room } = useGetRoomById(appliedFilter.roomId ?? 1);

  return (
    <>
      <h1 className="font-bold sm:text-2xl text-lg text-textsecondary tracking-[2px] uppercase animate-in slide-in-from-top-100 duration-1200">
        {category?.name} : {room?.name}
      </h1>

      <div className="flex justify-end gap-2 my-2">
        <CategoryFilter
          filterData={draftFilter}
          onFilterChange={setDraftFilter}
          onApply={(filter: FilterData) => {
            setAppliedFilter(filter);
          }}
        />

        <div className="w-15">
          <Download
            fromDate={appliedFilter.fromDate}
            toDate={appliedFilter.toDate}
            categoryName={category?.name ?? ""}
            roomName={room?.name ?? ""}
            data={data}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 w-full">
        <div className="flex-2 bg-cardbackground border border-border rounded-xl shadow w-full h-[780px] gap-2 overflow-hidden">
          <div className="flex-1 h-1/2! border">
            <TempChart data={data} />

            <div id="temp-chart-visible" className="hidden pointer-events-none" style={{ width: "1920px" }}>
              <TempChart isExport={true} data={data} />
            </div>
          </div>

          <div className="flex-1 h-1/2! border">
            <RhChart data={data} />

            <div id="rh-chart-visible" className="hidden pointer-events-none" style={{ width: "1920px" }}>
              <RhChart isExport={true} data={data} />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[780px] flex flex-col overflow-hidden">
          <TableUI filter={appliedFilter} />
        </div>
      </div>
    </>
  );
}
