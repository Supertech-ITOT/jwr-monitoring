"use client";

import { useEffect, useState } from "react";

import { useGetHistoricalRoomMetrics } from "@/hooks/useDashboard";
import { columns } from "./datatable/columns";
import { DataTable } from "./datatable/data-table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableFilter {
  fromDate: string;
  toDate: string;
  [key: string]: unknown;
}

interface TableUIProps {
  filter: TableFilter;
}

export default function TableUI({ filter }: TableUIProps) {
  const [page, setPage] = useState<number>(0);
  const size = 27;

  const { data, isLoading, error } = useGetHistoricalRoomMetrics({
    ...filter,
    page,
    size,
  });

  const rows = data?.content ?? [];
  const totalPages = data?.page?.totalPages ?? 1;

  useEffect(() => {
    setPage(0);
  }, [filter.fromDate, filter.toDate]);

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="w-full flex flex-1 overflow-x-auto">
      <div className="min-w-[200px] w-full h-full">
        <DataTable columns={columns} data={rows} page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
