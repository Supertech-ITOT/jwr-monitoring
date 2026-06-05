"use client";

import { columns } from "./datatable/columns";
import { DataTable } from "./datatable/data-table";
import { Skeleton } from "@/components/ui/skeleton";

const TableUI = ({ rows, loading, filterData }) => {
  if (loading || !rows) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="w-full flex flex-1  overflow-x-auto">
      <div className="min-w-[400px] w-full h-full">
        <DataTable columns={columns(filterData)} data={rows} />
      </div>
    </div>
  );
};

export default TableUI;
