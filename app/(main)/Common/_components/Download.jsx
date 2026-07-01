"use client";
import SensorReportPDF from "@/components/pdf/sensorReportpdf";
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
import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { DownloadIcon, Loader2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

const Download = ({ filterData }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const rows = [];
  const isLoading = false;

  const handleDownload = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (isLoading || !rows) {
      return;
    }
    const blob = await pdf(
      <SensorReportPDF data={rows} name={name} />,
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CommonReport-[${format(date.fromDate, "dd-MMM-yyyy")}-${format(date.toDate, "dd-MMM-yyyy")}]`;
    link.click();
    URL.revokeObjectURL(url);

    setOpen(false);
    setName("");
  };
  return (
    <div className="size-8 ">
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
    </div>
  );
};

export default Download;
