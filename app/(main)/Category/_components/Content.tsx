"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

import TableUI from "./TableUI";
import CategoryFilter from "./CategoryFilter";
import Download from "./Download";
import TempChart from "./TempChart";
import RhChart from "./RhChart";

import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";
import { useGetHistoricalRoomMetrics } from "@/hooks/useDashboard";

type ID = string | number;

interface ContentProps {
  categoryId: number;
  roomId: number;
}

interface FilterData {
  fromDate: string;
  toDate: string;
  day: string;
  sort: string;
  interval: number;
  categoryId: ID;
  roomId: ID;
  [key: string]: unknown;
}

interface Category {
  id: ID;
  name: string;
}

interface Room {
  id: ID;
  name: string;
}

export default function Content({ categoryId, roomId }: ContentProps) {
  const now = dayjs();

  const { data: categories, isLoading: categoriesLoading } = useGetCategory();

  const { data: rooms, isLoading: roomsLoading } = useGetRoomByCategoryId(categoryId);

  const initialFilter: FilterData = {
    fromDate: now.subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now.format("YYYY-MM-DDTHH:mm:ss"),
    day: "Current",
    sort: "timestamp,desc",
    interval: 60,
    categoryId,
    roomId,
  };

  const [draftFilter, setDraftFilter] = useState<FilterData>(initialFilter);

  const [appliedFilter, setAppliedFilter] = useState<FilterData>(initialFilter);

  const { data, isLoading } = useGetHistoricalRoomMetrics(appliedFilter);

  const loading = categoriesLoading || roomsLoading || isLoading;

  if (loading) {
    return null;
  }

  const categoryList = (categories ?? []) as Category[];
  const roomList = (rooms ?? []) as Room[];

  const categoryName = categoryList.find((category) => Number(category.id) === categoryId)?.name ?? "";

  const roomName = roomList.find((room) => Number(room.id) === roomId)?.name ?? "";

  return (
    <>
      <h1 className="font-bold sm:text-2xl text-lg text-textsecondary tracking-[2px] uppercase animate-in slide-in-from-top-100 duration-1200">
        {categoryName} : {roomName}
      </h1>

      <div className="flex justify-end gap-2 my-2">
        <CategoryFilter
          filterData={draftFilter}
          categories={categoryList}
          rooms={roomList}
          loading={loading}
          onFilterChange={setDraftFilter as Dispatch<SetStateAction<FilterData>>}
          onApply={(filter: FilterData) => {
            setAppliedFilter(filter);
          }}
        />

        <div className="w-15">
          <Download filter={appliedFilter} categoryName={categoryName} roomName={roomName} data={data} isLoading={loading} />
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
          <TableUI categoryId={categoryId} filter={appliedFilter} roomId={roomId} />
        </div>
      </div>
    </>
  );
}
