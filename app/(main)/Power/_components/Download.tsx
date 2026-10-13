"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { format, parseISO } from "date-fns";
import { DownloadIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import EnergyReportPDF from "@/components/pdf/EnergyReportPdf";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetEnergyRoomLog } from "@/hooks/useDashboard";
import { EnergyFilterData } from "./Content";

type DownloadProps = {
  filter: EnergyFilterData;
};

export default function Download({ filter }: DownloadProps) {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetEnergyRoomLog({
    categoryId: filter.categoryId ?? 1,
    fromDate: filter.fromDate,
    interval: filter.interval,
    roomIds: filter.roomIds,
    toDate: filter.toDate,
    sort: filter.sort,
    page: 0,
    size: 999999,
  });

  const rooms = data?.content ?? [];

  const handleDownload = async (): Promise<void> => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (isLoading) {
      toast.error("Please wait while the room logs are loading");
      return;
    }

    if (isError) {
      toast.error("Failed to load room logs. Please try again.");
      return;
    }

    try {
      const blob = await pdf(<EnergyReportPDF data={rooms} name={name.trim()} filter={filter} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `EnergyReport-[${format(parseISO(filter.fromDate), "dd-MMM-yyyy")}-${format(parseISO(filter.toDate), "dd-MMM-yyyy")}].pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setOpen(false);
      setName("");
      toast.success("Report generated successfully");
    } catch (error: unknown) {
      console.error("Failed to generate energy report:", error);
      toast.error("Failed to generate report. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" aria-label="Download energy report" className="h-full w-full rounded-md border border-border bg-primary shadow">
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <DownloadIcon className="size-4" />}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>Before generating a report, kindly enter your name.</DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="space-y-4 p-2">
            <Label htmlFor="report-name">Enter Name</Label>
            <Input
              id="report-name"
              type="text"
              placeholder="e.g. John"
              className="bg-card"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <div className="flex justify-end">
              <Button type="button" onClick={handleDownload} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
