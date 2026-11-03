"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { pdf } from "@react-pdf/renderer";
import { format, parseISO } from "date-fns";
import { DownloadIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { EnergyConsumptionResponse } from "@/types/consumption.types";
import { FilterData } from "./content";
import EnergyConsumptionPdf from "@/components/pdf/EnergyConsumptionPdf";

type DownloadProps = {
  filter: FilterData;
  data: EnergyConsumptionResponse;
};

export default function Download({ filter, data }: DownloadProps) {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!data || data.rooms.length === 0) {
      toast.error("No report data available.");
      return;
    }

    try {
      setIsDownloading(true);

      const blob = await pdf(<EnergyConsumptionPdf data={data} name={name.trim()} filter={filter} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `ConsumptionReport-[${format(parseISO(filter.fromDate), "dd-MMM-yyyy")}-${format(parseISO(filter.toDate), "dd-MMM-yyyy")}].pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 1000);

      setOpen(false);
      setName("");

      toast.success("Report downloaded successfully.");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate the report.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="h-full w-full rounded-md border border-border bg-primary shadow"
            disabled={isDownloading}
            aria-label="Download report"
          >
            {isDownloading ? <Loader2 className="size-4 animate-spin" /> : <DownloadIcon className="size-4" />}
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
              disabled={isDownloading}
            />

            <div className="flex justify-end">
              <Button type="button" onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Generating...
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
