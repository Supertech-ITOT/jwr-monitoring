"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar1 } from "lucide-react";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const daylist = [
    "Current",
    "Yesterday",
    "Last3Days",
    "Last5Days",
    "Last7Days",
];

const FilterDuration = ({
    onChange,
}) => {
    const now = dayjs();

    const [selectedDay, setSelectedDay] =
        useState("Current");

    const [fromDate, setFromDate] =
        useState(now.subtract(1, "day"));

    const [toDate, setToDate] =
        useState(now);

    const updateRange = (
        type
    ) => {
        const current =
            dayjs();

        let from =
            current;
        let to =
            current;

        switch (type) {
            case "Current":
                from =
                    current.subtract(
                        24,
                        "hour"
                    );
                break;

            case "Yesterday":
                from =
                    current.subtract(
                        1,
                        "day"
                    );
                to =
                    current.subtract(
                        1,
                        "minute"
                    );
                break;

            case "Last3Days":
                from =
                    current.subtract(
                        3,
                        "day"
                    );
                break;

            case "Last5Days":
                from =
                    current.subtract(
                        5,
                        "day"
                    );
                break;

            case "Last7Days":
                from =
                    current.subtract(
                        7,
                        "day"
                    );
                break;

            default:
                break;
        }

        setFromDate(from);
        setToDate(to);

        onChange?.({
            fromDate: from,
            toDate: to,
            day: type,
        });
    };

    const handleDayChange = (
        value
    ) => {
        setSelectedDay(
            value
        );
        updateRange(value);
    };

    const handleFromChange = (
        value
    ) => {
        setSelectedDay("");

        setFromDate(value);

        onChange?.({
            fromDate: value,
            toDate,
            day: null,
        });
    };

    const handleToChange = (
        value
    ) => {
        setSelectedDay("");

        setToDate(value);

        onChange?.({
            fromDate,
            toDate: value,
            day: null,
        });
    };

    return (
        <>
            <div className="flex w-full gap-2 items-center">
                <Calendar1 className="size-8 text-primary" />

                <Label className="w-[110px]">
                    Day
                </Label>

                <Select
                    value={
                        selectedDay
                    }
                    onValueChange={
                        handleDayChange
                    }
                >
                    <SelectTrigger className="w-full text-text text-xs bg-transparent">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                        {daylist.map(
                            (item) => (
                                <SelectItem
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col w-full gap-2">
                <Label>
                    From DateTime
                </Label>

                <DateTimePicker
                    value={fromDate}
                    maxDateTime={now}
                    onChange={
                        handleFromChange
                    }
                    slotProps={{
                        openPickerIcon:
                        {
                            className:
                                "text-primary",
                        },
                        textField: {
                            InputProps:
                            {
                                style: {
                                    borderRadius: 6,
                                    fontSize: 12,
                                    color:
                                        "grey",
                                },
                                className:
                                    "h-8 rounded-md border border-border text-textSecondary",
                            },
                        },
                    }}
                />
            </div>

            <div className="flex flex-col w-full gap-2">
                <Label>
                    To DateTime
                </Label>

                <DateTimePicker
                    value={toDate}
                    maxDateTime={now}
                    onChange={
                        handleToChange
                    }
                    slotProps={{
                        openPickerIcon:
                        {
                            className:
                                "text-primary",
                        },
                        textField: {
                            InputProps:
                            {
                                style: {
                                    borderRadius: 6,
                                    fontSize: 12,
                                    color:
                                        "grey",
                                },
                                className:
                                    "h-8 rounded-md border border-border text-textSecondary",
                            },
                        },
                    }}
                />
            </div>
        </>
    );
};

export default FilterDuration;