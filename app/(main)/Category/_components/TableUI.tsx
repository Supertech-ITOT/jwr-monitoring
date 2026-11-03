"use client";

import { useEffect, useState } from "react";

import { useGetHistoricalRoomMetrics } from "@/hooks/useDashboard";
import { columns } from "./datatable/columns";
import { DataTable } from "./datatable/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterData } from "./Content";

interface TableUIProps {
  filter: FilterData;
  hideRH: boolean;
}

export default function TableUI({ filter, hideRH }: TableUIProps) {
  const [page, setPage] = useState<number>(0);
  const size = 27;

  const { data, isLoading, error } = useGetHistoricalRoomMetrics({
    page,
    categoryId: filter.categoryId ?? 1,
    fromDate: filter.fromDate,
    interval: filter.interval,
    roomId: filter.roomId ?? 1,
    toDate: filter.toDate,
    size,
    sort: filter.sort,
  });

  const rows = data?.content ?? [];
  const totalPages = data?.page?.totalPages ?? 1;

  const visibleColumns = hideRH ? columns.filter((column) => column.id !== "rh") : columns;

  useEffect(() => {
    setPage(0);
  }, [filter.fromDate, filter.toDate, filter.categoryId, filter.roomId]);

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="w-full flex flex-1 overflow-x-auto">
      <div className="min-w-[200px] w-full h-full">
        <DataTable columns={visibleColumns} data={rows} page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
