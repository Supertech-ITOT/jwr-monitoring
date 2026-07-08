"use client";
import TableUI from "./TableUI";

import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import { useState } from "react";
import dayjs from "dayjs";
import Download from "./Download";
import { useGetHistoricalRoomMetrics } from "@/hooks/useDashboard";
import PowerFilter from "./PowerFilter";
import Chart from "./Chart";

export default function Content({ categoryId, roomId }) {
  const now = dayjs();
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const { data: rooms, isLoading: roomsLoading } =
    useGetRoomByCategoryId(categoryId);
  const initialFilter = {
    fromDate: now.subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now.format("YYYY-MM-DDTHH:mm:ss"),
    day: "Current",
    sort: "timestamp,desc",
    interval: 60,
    categoryId: categoryId,
    roomId: roomId,
  };
  const [draftFilter, setDraftFilter] = useState(initialFilter);
  const [appliedFilter, setAppliedFilter] = useState(initialFilter);
  const { data, isLoading } = useGetHistoricalRoomMetrics(appliedFilter);
  const loading = categoriesLoading || roomsLoading || isLoading;
  if (loading) {
    return null;
  }
  const categoryName = categories?.find((c) => c.id === categoryId)?.name ?? "";
  const roomName = rooms?.find((r) => r.id === roomId)?.name ?? "";
  return (
    <>
      <h1 className="font-bold sm:text-3xl text-2xl text-textsecondary tracking-[2px] uppercase mt-2 animate-in slide-in-from-top-100 duration-1200">
        {categoryName} : {roomName}
      </h1>
      <div className="flex justify-end gap-2 mt-4">
        <PowerFilter
          filterData={draftFilter}
          categories={categories}
          rooms={rooms}
          loading={loading}
          onFilterChange={setDraftFilter}
          onApply={(filter) => {
            setAppliedFilter(filter);
          }}
        />
        <Download
          filter={appliedFilter}
          categoryName={categoryName}
          roomName={roomName}
          data={data}
          isLoading={loading}
        />
      </div>
      <div className="mt-6 flex flex-col xl:flex-row gap-6 w-full ">
        <div className="flex-2 bg-cardbackground border border-border rounded-xl shadow-xl w-full h-[600px]">
          <Chart data={data} />
          <div
            id="power-chart-visible"
            className="hidden pointer-events-none"
            style={{ width: "1920px" }}
          >
            <Chart isExport={true} data={data} />
          </div>
        </div>
        <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px] flex flex-col overflow-hidden">
          <TableUI filter={appliedFilter} />
        </div>
      </div>
    </>
  );
}
