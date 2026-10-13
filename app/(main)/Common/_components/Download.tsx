"use client";

import CommonReportPDF from "@/components/pdf/CommonReportPdf";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useGetCommonRoomLog } from "@/hooks/useDashboard";

import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { DownloadIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FilterData } from "./Content";

type DownloadProps = {
  filter: FilterData;
};

export default function Download({ filter }: DownloadProps) {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetCommonRoomLog(
    {
      categoryId: filter.categoryId ?? 1,
      fromDate: filter.fromDate,
      interval: filter.interval,
      roomIds: filter.roomIds,
      toDate: filter.toDate,
    },
    0,
    999999,
  );

  const rooms = data?.content ?? [];

  const handleDownload = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (isLoading) {
      toast.error("Please wait while the report data loads.");
      return;
    }

    if (isError) {
      toast.error("Failed to load report data.");
      return;
    }

    try {
      const blob = await pdf(<CommonReportPDF data={rooms} name={name} filter={filter} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `MultipleReport-[${format(filter.fromDate!, "dd-MMM-yyyy")}-${format(filter.toDate!, "dd-MMM-yyyy")}].pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setOpen(false);
      setName("");

      toast.success("Report downloaded successfully.");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate the report.");
    }
  };

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="h-full w-full rounded-md border border-border bg-primary shadow"
            disabled={isLoading}
            aria-label="Download report"
          >
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
                Generate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
