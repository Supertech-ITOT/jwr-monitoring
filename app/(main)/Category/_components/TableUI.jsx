"use client";

import { columns } from "@/components/datatable/columns";
import { DataTable } from "@/components/datatable/data-table";
import { useRoomDashboard } from "@/hooks/useDashboard";
import { useState } from "react";

const TableUI = () => {
    const [page, setPage] = useState(0);
    const size = 13;
    const { data, isLoading, error } = useRoomDashboard({
        categoryId: 1,
        roomId: 1,
        fromDate: "2026-06-01T00:00:00",
        toDate: "2026-06-04T23:59:59",
        page,
        size,
        sort: "timestamp,desc",
    });
    const rows = data?.content || [];
    const totalPages = data?.totalPages || 1;



    if (isLoading) return <p>Loading...</p>;

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