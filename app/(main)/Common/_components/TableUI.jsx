"use client";

import { useGetHistoricalRoomMetrics } from "@/hooks/useDashboard";
import { useState } from "react";
import { columns } from "./datatable/columns";
import { DataTable } from "./datatable/data-table";
import { Skeleton } from "@/components/ui/skeleton";

const TableUI = ({ data }) => {
    const [page, setPage] = useState(0);
    const size = 13;
    const { data, isLoading, error } = useGetHistoricalRoomMetrics({
        categoryId: categoryId,
        roomId: roomId,
        fromDate: date.fromDate,
        toDate: date.toDate,
        page,
        size,
        sort: "timestamp,desc",
    });
    const rows = data?.content || [];
    const totalPages = data?.totalPages || 1;



    if (isLoading) {
        return (
            <Skeleton className="w-full h-full" />
        );
    }

    if (error) return <p>Something went wrong</p>;

    return (
        <div className="w-full flex flex-1  overflow-x-auto">
            <div className="min-w-[400px] w-full h-full">
                <DataTable columns={columns} data={rows} page={page} setPage={setPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default TableUI;