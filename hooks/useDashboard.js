import { getRoomDashboard } from "@/services/RoomDashboardService";
import { useQuery } from "@tanstack/react-query"

export const useRoomDashboard = (params) => {
    return useQuery({
        queryKey: ["room-dashboard", params],
        queryFn: async () => {
            const res = await getRoomDashboard(params);
            return res.data;
        },
    });
}