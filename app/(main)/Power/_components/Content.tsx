"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { AlertCircle } from "lucide-react";
import Download from "./Download";
import EnergyFilter from "./EnergyFilter";
import EnergyRoomTable from "./EnergyRoomTable";
import { useGetEnergyRoomLog } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type EnergyFilterData = {
  categoryId: number | null;
  categoryName: string;
  roomIds: number[];
  fromDate: string;
  toDate: string;
  day: string;
  sort: string;
  interval: number;
};

export default function Content() {
  const now = dayjs();

  const initialFilter: EnergyFilterData = {
    categoryId: 1,
    categoryName: "Positive Room",
    roomIds: [1, 2, 3, 4, 5],
    fromDate: now.subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now.format("YYYY-MM-DDTHH:mm:ss"),
    day: "Current",
    sort: "timestamp,desc",
    interval: 60,
  };

  const [draftFilter, setDraftFilter] = useState<EnergyFilterData>(initialFilter);
  const [appliedFilter, setAppliedFilter] = useState<EnergyFilterData>(initialFilter);
  const [page, setPage] = useState<number>(0);
  const size = 3;
  const { data, isLoading, isError } = useGetEnergyRoomLog({
    categoryId: appliedFilter.categoryId ?? 1,
    fromDate: appliedFilter.fromDate,
    interval: appliedFilter.interval,
    roomIds: appliedFilter.roomIds,
    toDate: appliedFilter.toDate,
    sort: appliedFilter.sort,
    page: page,
    size,
  });

  const rooms = data?.content ?? [];
  const totalPages = data?.page?.totalPages ?? 0;
  return (
    <div className="mt-2 space-y-2">
      {/* Toolbar */}
      <div className="flex justify-end gap-2">
        <EnergyFilter
          filterData={draftFilter}
          onFilterChange={setDraftFilter}
          onApply={(filter: EnergyFilterData) => {
            setPage(0);
            setAppliedFilter(filter);
          }}
        />

        <div className="w-15">
          <Download filter={appliedFilter} />
        </div>
      </div>

      {/* Card */}
      <div className="flex h-[80vh] flex-col overflow-hidden rounded-lg p-0 shadow">
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

        {/* Table */}
        {!isLoading && !isError && rooms.length > 0 && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1">
              <EnergyRoomTable rooms={rooms} />
            </div>

            <div className="flex items-center justify-between border-t">
              <button
                type="button"
                onClick={() => setPage((previousPage) => Math.max(previousPage - 1, 0))}
                disabled={page === 0}
                className="rounded border px-4 py-2 disabled:opacity-50"
              >
                Previous
              </button>

              <p>
                Page {page + 1} of {totalPages}
              </p>

              <button
                type="button"
                onClick={() => setPage((previousPage) => previousPage + 1)}
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
