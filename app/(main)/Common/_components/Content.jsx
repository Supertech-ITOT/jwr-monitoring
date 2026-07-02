"use client";
import { useState } from "react";
import CommonFilter from "./CommonFilter";
import dayjs from "dayjs";
import Download from "./Download";

export default function Content() {
  const now = dayjs();
  const [filterData, setFilterData] = useState({
    categoryId: null,
    roomIds: [],
    fromDate: now
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now.format("YYYY-MM-DDTHH:mm:ss"),
    interval: null,
  });
  const data = null;
  return (
    <>
      <div className="flex justify-end gap-2 mt-4">
        <CommonFilter filterData={filterData} onFilterChange={setFilterData} />
        <Download filterData={filterData} />
      </div>
      <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px] flex flex-col overflow-hidden">
        {/* <TableUI filterData={filterData} /> */}
      </div>
    </>
  );
}
