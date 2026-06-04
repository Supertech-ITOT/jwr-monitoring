"use client"

import PowerReportPDF from '@/components/pdf/PowerReportPdf';
import { Button } from '@/components/ui/button'
import { useRoomDashboard } from '@/hooks/useDashboard';
import { pdf } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { toPng } from 'html-to-image';
import { DownloadIcon, Loader2 } from 'lucide-react';
import React, { useMemo } from 'react'

const Download = ({ categoryId, roomId, date, categoryName, roomName }) => {
    const { data, isLoading } = useRoomDashboard({
        categoryId: categoryId,
        roomId: roomId,
        fromDate: date.fromDate,
        toDate: date.toDate,
        sort: "timestamp,desc",
    });
    const rows = useMemo(() => data?.content ?? [], [data?.content]);

    const handleDownload = async () => {
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
            <PowerReportPDF data={rows} roomName={roomName} chartImg={dataUrl} categoryName={categoryName} date={date} />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `PowerReport-[${format(date.fromDate, "dd-MMM-yyyy")}-${format(date.toDate, "dd-MMM-yyyy")}]`;
        link.click();
        URL.revokeObjectURL(url);
    }
    return (
        <div className='size-8 '>
            <Button className=' rounded-md shadow  border border-border w-full h-full bg-primary' onClick={handleDownload} >
                {isLoading ? <Loader2 className='animate-spin size-4' /> : <DownloadIcon className='size-4' />}
            </Button>
        </div>
    )
}

export default Download