"use client";

import { useState } from "react";
import dayjs from "dayjs";
import CommonFilter from "./CommonFilter";
import Download from "./Download";
import { useGetCommonRoomLog } from "@/hooks/useDashboard";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CommonRoomTable from "./CommonRoomTable";

export default function Content() {
  const now = dayjs();
  const initialFilter = {
    categoryId: 1,
    categoryName: "Positive Room",
    roomIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    fromDate: now
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now
      .subtract(1, "month")
      .endOf("month")
      .format("YYYY-MM-DDTHH:mm:ss"),
    interval: 60,
  };
  const [draftFilter, setDraftFilter] = useState(initialFilter);
  const [appliedFilter, setAppliedFilter] = useState(initialFilter);
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useGetCommonRoomLog(
    appliedFilter,
    page,
    5,
  );
  const rooms = data?.content ?? [];

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex justify-end gap-2">
        <CommonFilter
          filterData={draftFilter}
          onFilterChange={setDraftFilter}
          onApply={(filter) => {
            setPage(0);
            setAppliedFilter(filter);
          }}
        />
        <Download filter={appliedFilter} />
      </div>

      {/* Card */}
      <Card className="shadow-lg rounded-xl min-h-[80vh] gap-0!">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              {isLoading ? (
                <Skeleton className="h-7 w-40" />
              ) : (
                <>
                  <h2 className="text-xl font-semibold"></h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Historical Temperature & RH Select filter to show data.
                  </p>
                </>
              )}
            </div>

            {!isLoading && data && (
              <Badge variant="secondary" className="text-sm text-white">
                Room {page + 1} / {data.page.totalPages}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-[70vh] overflow-hidden">
          {/* Loading */}
          {isLoading && (
            <div className="space-y-3 p-6">
              <Skeleton className="h-10 w-full" />
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          )}

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
          {!isLoading && !isError && rooms?.length == 0 && (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No logs found.
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && rooms.length > 0 && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 min-h-0">
                <CommonRoomTable rooms={rooms} />
              </div>

              <div className="flex items-center justify-between border-t bg-white p-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className="border rounded px-4 py-2 disabled:opacity-50"
                >
                  Previous
                </button>

                <p>
                  Page {page + 1} of {data.page.totalPages}
                </p>

                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page + 1 >= data.page.totalPages}
                  className="border rounded px-4 py-2 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
