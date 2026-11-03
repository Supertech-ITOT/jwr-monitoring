"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { AlertCircle, Loader2 } from "lucide-react";
import { UseGetEnergyConsumption } from "@/hooks/use-consumption";
import { RoomType } from "@/types/consumption.types";
import ConsumptionFilter from "./ConsumptionFilter";
import Download from "./Download";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ConsumptionRoomTable from "./ConsumptionRoomTable";

export type FilterData = {
  categoryId: number;
  roomIds: number[];
  roomType: RoomType;
  fromDate: string;
  toDate: string;
};

export default function ConsumptionContent() {
  const now = dayjs();

  const initialFilter: FilterData = {
    categoryId: 1,
    roomIds: [1, 2, 3, 4, 5],
    roomType: "POSITIVE",
    fromDate: now.subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss"),
    toDate: now.format("YYYY-MM-DDTHH:mm:ss"),
  };

  const [draftFilter, setDraftFilter] = useState<FilterData>(initialFilter);
  const [appliedFilter, setAppliedFilter] = useState<FilterData | null>(null);

  const { data, isLoading, isError, isFetching } = UseGetEnergyConsumption({
    roomIds: appliedFilter?.roomIds ?? [],
    roomType: appliedFilter?.roomType ?? "POSITIVE",
    fromDate: appliedFilter?.fromDate ?? "",
    toDate: appliedFilter?.toDate ?? "",
  });

  return (
    <div className="mt-2 space-y-2">
      {/* Toolbar */}
      <div className="flex justify-end gap-2">
        <ConsumptionFilter
          filterData={draftFilter}
          onFilterChange={setDraftFilter}
          onApply={(filter: FilterData) => {
            setAppliedFilter(filter);
          }}
        />

        <div className="w-15">{data && <Download filter={appliedFilter!} data={data} />}</div>
      </div>

      {/* Report Card */}
      <div className="flex h-[80vh] flex-col overflow-hidden rounded-lg shadow">
        {/* Loading */}
        {isLoading && <Skeleton className="h-full w-full" />}

        {/* Error */}
        {isError && !isLoading && (
          <div className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load consumption report.</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Initial State */}
        {!appliedFilter && !isLoading && <div className="flex h-full items-center justify-center text-muted-foreground">No Logs Data Found.</div>}

        {/* Empty */}
        {appliedFilter && !isFetching && !isLoading && !isError && data && data.rooms.length === 0 && (
          <div className="flex h-full items-center justify-center text-muted-foreground">No consumption data found.</div>
        )}

        {/* Data */}
        {!isLoading && !isError && data && data.rooms.length > 0 && (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ConsumptionRoomTable data={data} roomType={appliedFilter!.roomType} fromDate={appliedFilter!.fromDate} toDate={appliedFilter!.toDate} />
          </div>
        )}

        {/* FETCHING LOADER OVERLAY */}
        {isFetching && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/30">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />

              <p className="text-sm font-semibold text-primary">Loading consumption report...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
