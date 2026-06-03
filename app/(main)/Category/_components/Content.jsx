"use client";
import FrequencyBtn from "@/components/FrequencyBtn";
import Chart from "./Chart";
import TableUI from "./TableUI";
import CategoryFilter from "./CategoryFilter";
import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import { useState } from "react";
import dayjs from "dayjs";

export default function Content({ categoryId, roomId }) {
  const now = dayjs();
  const { data: categories, isLoading: categoriesLoading, } = useGetCategory();
  const { data: rooms, isLoading: roomsLoading, } = useGetRoomByCategoryId(categoryId);
  const [filterData, setFilterData] = useState({ fromDate: now.subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss"), toDate: now.format("YYYY-MM-DDTHH:mm:ss"), day: "Current", });
  const loading = categoriesLoading || roomsLoading;
  if (loading) { return null; }
  const categoryName = categories?.find((c) => c.id === categoryId)?.name ?? "";
  const roomName = rooms?.find((r) => r.id === roomId)?.name ?? "";
  return (
    <>
      <h1 className="font-bold sm:text-3xl text-2xl text-textsecondary tracking-[2px] uppercase mt-2 animate-in slide-in-from-top-100 duration-1200">
        {categoryName} :{" "}{roomName}
      </h1>
      <div className="flex justify-end gap-2 mt-4">
        <FrequencyBtn />
        <CategoryFilter categories={categories} rooms={rooms} categoryId={categoryId} roomId={roomId} loading={loading} onFilterChange={setFilterData} />
        {/* <Download id={id} /> */}
      </div>
      <div className="mt-6 flex flex-col xl:flex-row gap-6 w-full ">
        <div className="flex-2 bg-cardbackground border border-border rounded-xl shadow-xl w-full h-[600px]">
          <Chart categoryId={categoryId} roomId={roomId} date={filterData} />
          <div id="sensor-chart-visible" className="hidden pointer-events-none" style={{ width: "1920px" }}>
            <Chart isExport={true} categoryId={categoryId} roomId={roomId} date={filterData} />
          </div>
        </div>
        <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px] flex flex-col overflow-hidden">
          <TableUI categoryId={categoryId} date={filterData} roomId={roomId} />
        </div>
      </div>
    </>
  );
}
