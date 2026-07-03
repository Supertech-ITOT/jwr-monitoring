"use client";

import { useState } from "react";
import dayjs from "dayjs";
import CommonFilter from "./CommonFilter";
import Download from "./Download";
import { useGetCommonRoomLog } from "@/hooks/useDashboard";
import { DataTable } from "./datatable/data-table";
import { columns } from "./datatable/columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  const [appliedFilter, setAppliedFilter] = useState(null);
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useGetCommonRoomLog(
    appliedFilter,
    page,
    1,
  );
  const room = data?.content?.[0];

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
                  <h2 className="text-xl font-semibold">
                    {room?.roomName ?? "Room"}
                  </h2>
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
        <CardContent className="p-0! h-160 overflow-hidden">
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
          {!isLoading && !isError && !room && (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No logs found.
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && room?.logs?.length > 0 && (
            <DataTable
              columns={columns}
              data={room.logs}
              page={page}
              setPage={setPage}
              totalPages={data.page.totalPages}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
