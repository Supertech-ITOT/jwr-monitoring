"use client";

import { PageResponse, RoomHistoricalValueDto } from "@/app/common/api.types";
import SensorReportPDF from "@/components/pdf/sensorReportpdf";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { toPng } from "html-to-image";
import { DownloadIcon, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface DownloadProps {
  fromDate: string;
  toDate: string;
  categoryName: string;
  roomName: string;
  data?: PageResponse<RoomHistoricalValueDto>;
  isLoading: boolean;
}

export default function Download({ fromDate, toDate, categoryName, roomName, data, isLoading }: DownloadProps) {
  const rows = useMemo(() => data?.content ?? [], [data?.content]);

  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (isLoading || generating) {
      return;
    }

    const tchart = document.getElementById("temp-chart-visible");
    const rchart = document.getElementById("rh-chart-visible");

    if (!tchart || !rchart) {
      toast.error("Chart elements could not be found.");
      return;
    }

    setGenerating(true);

    try {
      tchart.style.display = "block";

      await new Promise((resolve) => setTimeout(resolve, 10));

      const tdataUrl = await toPng(tchart, {
        cacheBust: true,
        pixelRatio: 1,
      });

      tchart.style.display = "none";

      rchart.style.display = "block";

      await new Promise((resolve) => setTimeout(resolve, 10));

      const rdataUrl = await toPng(rchart, {
        cacheBust: true,
        pixelRatio: 1,
      });

      rchart.style.display = "none";

      const blob = await pdf(
        <SensorReportPDF
          data={rows}
          roomName={roomName}
          tchartImg={tdataUrl}
          rchartImg={rdataUrl}
          categoryName={categoryName}
          fromDate={fromDate}
          toDate={toDate}
          name={name}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${categoryName}-[${format(new Date(fromDate), "dd-MMM-yyyy")}-${format(new Date(toDate), "dd-MMM-yyyy")}].pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setOpen(false);
      setName("");

      toast.success("Report generated successfully");
    } catch (error) {
      console.error("Report generation failed:", error);
      toast.error("Failed to generate report.");
    } finally {
      tchart.style.display = "";
      rchart.style.display = "";
      setGenerating(false);
    }
  };

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="rounded-md shadow border border-border w-full h-full bg-primary"
            disabled={isLoading || generating}
            aria-label="Download report"
          >
            {isLoading || generating ? <Loader2 className="animate-spin size-4" /> : <DownloadIcon className="size-4" />}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>Before generating a report, kindly enter your name.</DialogDescription>
          </DialogHeader>

          <Separator />

          <div className="p-2 space-y-4">
            <Label htmlFor="report-name">Enter Name</Label>

            <Input
              id="report-name"
              type="text"
              placeholder="e.g. John"
              className="bg-card"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={generating}
            />

            <div className="flex justify-end">
              <Button type="button" onClick={handleDownload} disabled={generating || isLoading}>
                {generating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
