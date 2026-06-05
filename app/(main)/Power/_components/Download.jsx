"use client";

import PowerReportPDF from "@/components/pdf/PowerReportPdf";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetHistoricalRoomMetrics } from "@/hooks/useDashboard";
import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { toPng } from "html-to-image";
import { DownloadIcon, Loader2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

const Download = ({ categoryId, roomId, date, categoryName, roomName }) => {
  const { data, isLoading } = useGetHistoricalRoomMetrics({
    categoryId: categoryId,
    roomId: roomId,
    fromDate: date.fromDate,
    toDate: date.toDate,
    sort: "timestamp,desc",
  });
  const rows = useMemo(() => data?.content ?? [], [data?.content]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleDownload = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (isLoading || !rows) {
      return;
    }
    const chart = document.getElementById("power-chart-visible");
    chart.style.display = "block";
    await new Promise((res) => setTimeout(res, 10));
    const dataUrl = await toPng(chart, {
      cacheBust: true,
      quality: 1,
    });
    chart.style.display = "none";
    const blob = await pdf(
      <PowerReportPDF
        data={rows}
        roomName={roomName}
        chartImg={dataUrl}
        categoryName={categoryName}
        date={date}
        name={name}
      />,
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PowerReport-[${format(date.fromDate, "dd-MMM-yyyy")}-${format(date.toDate, "dd-MMM-yyyy")}]`;
    link.click();
    URL.revokeObjectURL(url);
    setOpen(false);
    setName("");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className=" rounded-md shadow  border border-border w-full h-full bg-primary">
            {isLoading ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <DownloadIcon className="size-4" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>
              Before generating a report kindly input your name.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="p-2 space-y-4 ">
            <Label>Enter Name</Label>
            <Input
              type="text"
              placeholder="e.g. John"
              className="bg-card"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleDownload}>Generate</Button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Download;
