"use client";

import { useGetCurrentRoomMetricsByCategory } from "@/hooks/useDashboard";
import CategoryFilter from "./CategoryFilter";
import Chart from "./Chart";
import TableUI from "./TableUI";
import { useGetCategory } from "@/hooks/useCategory";
import { useState } from "react";

export default function Content() {
    const [filterData, setFilterData] = useState({ parameterId: 1, categoryId: 1 });

    const { data, isLoading } = useGetCurrentRoomMetricsByCategory();
    const { data: categories, isLoading: categoriesIsLoading } = useGetCategory();
    const loading = isLoading || categoriesIsLoading;
    return (
        <div>
            <CategoryFilter categories={categories} parameterId={filterData.parameterId} categoryId={filterData.categoryId} loading={loading} onFilterChange={setFilterData} />

            <div className="flex xl:flex-row flex-col w-full gap-6 mt-6">

                {/* Chart */}
                <div className="flex-2 bg-cardbackground border border-border rounded-xl shadow-xl w-full h-[600px] ">
                    <Chart />
                </div>

                {/* Table */}
                <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px]  flex flex-col overflow-hidden">
                    <TableUI />
                </div>
            </div>
        </div>
    )
}