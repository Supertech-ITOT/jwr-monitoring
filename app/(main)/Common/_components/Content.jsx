"use client";
import { useState } from "react";
import CommonFilter from "./CommonFilter";
import dayjs from "dayjs";

export default function Content() {
  const now = dayjs();
  const [filterData, setFilterData] = useState({
    fromDate: now.subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now.format("YYYY-MM-DDTHH:mm:ss"),
    day: "Current",
  });
  const data = null;
  return (
    <>
      <div className="flex justify-end gap-2 mt-4">
        <CommonFilter onFilterChange={setFilterData}/>
        {/* <Download data={data}/> */}
      </div>
      <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px] flex flex-col overflow-hidden">
        {/* <TableUI data={data}  /> */}
      </div>
    </>
  );
}
