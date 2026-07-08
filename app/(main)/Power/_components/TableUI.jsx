"use client";

import { useGetHistoricalRoomMetrics } from "@/hooks/useDashboard";
import { useEffect, useMemo, useState } from "react";
import { columns } from "./datatable/columns";
import { DataTable } from "./datatable/data-table";
import { Skeleton } from "@/components/ui/skeleton";

const TableUI = ({ filter }) => {
  const [page, setPage] = useState(0);
  const size = 13;
  const { data, isLoading, error } = useGetHistoricalRoomMetrics({
    ...filter,
    page,
    size,
  });

  useEffect(() => {
    setPage(0);
  }, [filter.fromDate, filter.toDate]);
  const rows = useMemo(
    () =>
      (data?.content ?? [])
        .filter((row) => row.energy != null)
        .map(({ timestamp, energy }) => ({
          timestamp,
          energy,
        })),
    [data?.content],
  );
  const totalPages = data?.page?.totalPages ?? 1;

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (error) return <p>Something went wrong</p>;

  return (
    <div className="w-full flex flex-1  overflow-x-auto">
      <div className="min-w-[400px] w-full h-full">
        <DataTable
          columns={columns}
          data={rows}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default TableUI;
