"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRoomDashboard } from "@/hooks/useDashboard";

import { format } from "date-fns";

const TableUI = () => {
    const { data, isLoading, error } = useRoomDashboard({
        categoryId: 1,
        roomId: 1,
        fromDate: "2026-06-01T00:00:00",
        toDate: "2026-06-02T23:59:59",
    });

    const rows = data?.data?.content || [];

    const sortedData = [...rows].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Something went wrong</p>;

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[400px]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary text-white">
                            <TableHead className="text-center">
                                DATE
                            </TableHead>

                            <TableHead className="text-center">
                                TIME
                            </TableHead>

                            <TableHead className="text-center">
                                TEMP °C
                            </TableHead>

                            <TableHead className="text-center">
                                RH%
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>

                <div className="h-[550px] overflow-y-auto">
                    <Table>
                        <TableBody>
                            {sortedData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className={
                                        index % 2 === 0
                                            ? "bg-muted/50"
                                            : "bg-background"
                                    }
                                >
                                    <TableCell className="text-center">
                                        {format(
                                            new Date(row.timestamp),
                                            "dd MMM yyyy"
                                        )}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {format(
                                            new Date(row.timestamp),
                                            "hh:mm:ss a"
                                        )}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {row.avgTemperature}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {row.rh}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default TableUI;