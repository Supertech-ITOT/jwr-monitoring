"use client";

import React from "react";
import { Building2, Sun, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";

const Card = () => {
    const { data: positiveRooms = [] } = useGetRoomByCategoryId(1);
    const { data: negativeRooms = [] } = useGetRoomByCategoryId(2);
    const { data: mezzanineRooms = [] } = useGetRoomByCategoryId(3);
    const { data: anteRooms = [] } = useGetRoomByCategoryId(4);
    const { data: truckdockRooms = [] } = useGetRoomByCategoryId(5);

    const totalRooms =
        positiveRooms.length +
        negativeRooms.length +
        mezzanineRooms.length +
        anteRooms.length +
        truckdockRooms.length;

    const stats = [
        {
            label: "Total Rooms",
            value: totalRooms,
            category: "all",
            icon: <Building2 className="size-6" style={{ color: "#166534" }} />,
            color: "#E9FBEF",
        },
        {
            label: "Positive Rooms",
            value: positiveRooms.length,
            category: "+veRoom",
            icon: <Sun className="size-6" style={{ color: "#C2410C" }} />,
            color: "#FFF5E8",
        },
        {
            label: "Negative Rooms",
            value: negativeRooms.length,
            category: "-veRoom",
            icon: <Snowflake className="size-6" style={{ color: "#1E40AF" }} />,
            color: "#E8F1FF",
        },
        {
            label: "Mezzanine Rooms",
            value: mezzanineRooms.length,
            category: "mezzanine",
            icon: <Building2 className="size-6" style={{ color: "#7C3AED" }} />,
            color: "#F3E8FF",
        },
        {
            label: "Ante Rooms",
            value: anteRooms.length,
            category: "ante",
            icon: <Building2 className="size-6" style={{ color: "#0891B2" }} />,
            color: "#ECFEFF",
        },
        {
            label: "Truckdock Rooms",
            value: truckdockRooms.length,
            category: "truckdock",
            icon: <Building2 className="size-6" style={{ color: "#B45309" }} />,
            color: "#FEF3C7",
        },
    ];

    return (
        <div className="w-full min-w-0 overflow-x-auto no-scrollbar mt-6">
            <div className="flex gap-4 w-max pb-2">
                {stats.map((item) => (
                    <Button
                        key={item.label}
                        className="w-[80vw] max-w-[300px] h-[100px] sm:h-[120px] shrink-0 shadow-xl p-3 sm:p-4 rounded-xl border border-border bg-cardbackground hover:bg-cardhover flex items-center gap-3 sm:gap-4"                    >
                        <div
                            style={{ backgroundColor: item.color }}
                            className="rounded-full size-16 flex justify-center items-center"
                        >
                            {item.icon}
                        </div>

                        <div className="flex flex-col items-start">
                            <strong className="font-bold text-text text-sm sm:text-xl">
                                {item.value}
                            </strong>
                            <span className="font-semibold text-textsecondary text-xs sm:text-lg">
                                {item.label}
                            </span>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Card;