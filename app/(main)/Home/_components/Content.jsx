"use client";

import { useGetCategory } from "@/hooks/useCategory";
import { useGetCurrentRoomMetricsByCategory } from "@/hooks/useDashboard";
import { useGetParameter } from "@/hooks/useParameter";
import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import Chart from "./Chart";
import TableUI from "./TableUI";

export default function Content() {
  const [filterData, setFilterData] = useState({
    parameterId: 1,
    categoryId: 1,
  });

  const { data, isLoading } = useGetCurrentRoomMetricsByCategory({
    categoryId: filterData.categoryId,
  });

  const { data: categories, isLoading: categoriesIsLoading } = useGetCategory();
  const { data: parameters, isLoading: parametersIsLoading } =
    useGetParameter();

  const sortedData = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      const aNum = parseInt(a.roomName.match(/\d+/)?.[0] || "0", 10);
      const bNum = parseInt(b.roomName.match(/\d+/)?.[0] || "0", 10);
      return aNum - bNum;
    });
  }, [data]);

  const loading =
    isLoading || categoriesIsLoading || parametersIsLoading || !data;

  return (
    <div>
      <div className="flex justify-end my-2">
        <CategoryFilter
          categories={categories}
          parameters={parameters}
          parameterId={filterData.parameterId}
          categoryId={filterData.categoryId}
          loading={loading}
          onFilterChange={setFilterData}
        />
      </div>

      <div className="flex xl:flex-row flex-col w-full gap-6">
        <div className="flex-2 bg-cardbackground border border-border scrollbar-hide rounded-xl shadow-xl w-full h-[600px]">
          <Chart
            rows={sortedData}
            loading={isLoading}
            filterData={filterData}
          />
        </div>

        <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px] flex flex-col overflow-hidden">
          <TableUI
            rows={sortedData}
            loading={isLoading}
            filterData={filterData}
          />
        </div>
      </div>
    </div>
  );
}
