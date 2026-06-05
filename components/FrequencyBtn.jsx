"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Clock1 } from "lucide-react";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { useGetInterval, useUpdateInterval } from "@/hooks/useLoginConfig";

const FrequencyBtn = () => {
    const { data: interval, isLoading } = useGetInterval();
    const { mutate: updateInterval, isPending } = useUpdateInterval();

    const [selectedInterval, setSelectedInterval] = useState("");

    useEffect(() => {
        if (interval) {
            setSelectedInterval(interval.toString());
        }
    }, [interval]);

    const handleSave = () => {
        if (!selectedInterval) return;

        updateInterval(
            {
                loggingIntervalMinutes: Number(selectedInterval),
            },
            {
                onSuccess: () => {
                    toast.success("Frequency updated successfully");
                },
                onError: () => {
                    toast.error("Failed to update frequency");
                },
            }
        );
    };

    return (
        <div className="w-[200px] h-8">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full h-full bg-cardbackground text-primary"
                    >
                        <Clock1 />
                        Frequency
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="right"
                    className="w-[200px] p-2 flex flex-col gap-3"
                >
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Set Frequency</Label>

                        <Select
                            value={selectedInterval}
                            onValueChange={setSelectedInterval}
                            disabled={isLoading}
                        >
                            <SelectTrigger className="w-full text-text text-xs bg-transparent">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="1">1 Min</SelectItem>
                                <SelectItem value="3">3 Min</SelectItem>
                                <SelectItem value="5">5 Min</SelectItem>
                                <SelectItem value="10">10 Min</SelectItem>
                                <SelectItem value="15">15 Min</SelectItem>
                                <SelectItem value="30">30 Min</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            onClick={handleSave}
                            disabled={isPending}
                            className="w-full bg-primary text-cardbackground"
                        >
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FrequencyBtn;