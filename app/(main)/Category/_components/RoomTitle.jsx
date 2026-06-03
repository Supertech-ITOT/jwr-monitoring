"use client";

import { useGetCategory } from "@/hooks/useCategory";
import { useGetRoomByCategoryId } from "@/hooks/useRoom";

const RoomTitle = ({ categoryId, roomId, }) => {
    const { data: categories, isLoading: categoriesLoading, } = useGetCategory();
    const { data: rooms, isLoading: roomsLoading, } = useGetRoomByCategoryId(categoryId);
    if (categoriesLoading || roomsLoading) { return null; }
    const categoryName = categories?.find((c) => c.id === categoryId)?.name ?? "";
    const roomName = rooms?.find((r) => r.id === roomId)?.name ?? "";

    return (
        <h1 className="font-bold sm:text-3xl text-2xl text-textsecondary tracking-[2px] uppercase mt-2 animate-in slide-in-from-top-100 duration-1200">
            {categoryName} :
            {" "}
            {roomName}
        </h1>
    );
};

export default RoomTitle;