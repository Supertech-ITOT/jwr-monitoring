import { getRoomsByCategoryId } from "@/services/RoomService"
import { useQuery } from "@tanstack/react-query"

export const useGetRoomByCategoryId = (categoryId) => {
    return useQuery({
        queryKey: ["rooms", categoryId],
        queryFn: async () => {
            const res = await getRoomsByCategoryId(categoryId);
            return res.data;
        },
        enabled: !!categoryId,
    })
}