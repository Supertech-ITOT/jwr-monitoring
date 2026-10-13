"use client";

import { useState } from "react";
import dayjs from "dayjs";
import CommonFilter from "./CommonFilter";
import Download from "./Download";
import CommonRoomTable from "./CommonRoomTable";
import { useGetCommonRoomLog } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export type FilterData = {
  categoryId: number | null;
  categoryName: string;
  roomIds: number[];
  fromDate: string;
  toDate: string;
  interval: number;
};

export default function Content() {
  const now = dayjs();

  const initialFilter: FilterData = {
    categoryId: 1,
    categoryName: "Positive Room",
    roomIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    fromDate: now.subtract(1, "month").startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now.subtract(1, "month").endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
    interval: 60,
  };

  const [draftFilter, setDraftFilter] = useState<FilterData>(initialFilter);
  const [appliedFilter, setAppliedFilter] = useState<FilterData>(initialFilter);
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isError } = useGetCommonRoomLog(
    {
      categoryId: appliedFilter.categoryId ?? 1,
      fromDate: appliedFilter.fromDate,
      interval: appliedFilter.interval,
      roomIds: appliedFilter.roomIds,
      toDate: appliedFilter.toDate,
    },
    page,
    10,
  );
  const rooms = data?.content ?? [];
  const totalPages = data?.page.totalPages ?? 0;

  return (
    <div className="mt-2 space-y-2">
      {/* Toolbar */}
      <div className="flex justify-end gap-2">
        <CommonFilter
          filterData={draftFilter}
          onFilterChange={setDraftFilter}
          onApply={(filter: FilterData) => {
            setPage(0);
            setAppliedFilter(filter);
          }}
        />

        <div className="w-15">
          <Download filter={appliedFilter} />
        </div>
      </div>

      {/* Card */}
      <div className="flex h-[80vh] flex-col overflow-hidden rounded-lg shadow">
        {/* Loading */}
        {isLoading && <Skeleton className="h-full w-full" />}

        {/* Error */}
        {isError && (
          <div className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load room logs.</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && rooms.length === 0 && (
          <div className="flex h-full items-center justify-center text-muted-foreground">No logs found.</div>
        )}

        {/* Table and Pagination */}
        {!isLoading && !isError && rooms.length > 0 && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1">
              <CommonRoomTable rooms={rooms} />
            </div>

            <div className="flex items-center justify-between border-t p-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                className="rounded border px-4 py-2 disabled:opacity-50"
              >
                Previous
              </button>

              <p>
                Page {page + 1} of {totalPages}
              </p>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page + 1 >= totalPages}
                className="rounded border px-4 py-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
