"use client";

import FilterSelect from "@/components/FilterSelect";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Factory, Funnel, Home, } from "lucide-react";


export default function CategoryFilter({ categories, categoryId, loading, onFilterChange, parameterId }) {
    return (

        <div className="w-[200px] h-8">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full h-full bg-cardbackground text-primary"
                    >
                        <Funnel />
                        Filter
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="h-fit w-[280px] p-2 flex flex-col gap-3 justify-center items-center">
                    <FilterSelect
                        label="Category"
                        loading={loading}
                        icon={Factory}
                        options={categories || []}
                        value={categoryId}
                        onSelect={(selectedId) => {

                        }}
                    />

                    <FilterSelect
                        label="Parameter"
                        loading={loading}
                        icon={Home}
                        options={parameters || []}
                        value={parameterId}
                        onSelect={(selectedId) => {

                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}