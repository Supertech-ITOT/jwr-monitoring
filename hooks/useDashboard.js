import {
  getCurrentRoomMetricsByCategory,
  getHistoricalRoomMetrics,
  getRoomStatCard,
} from "@/services/DashboardService";
import { useQuery } from "@tanstack/react-query";

export const useGetHistoricalRoomMetrics = (params) => {
  return useQuery({
    queryKey: ["historical-metric", params],
    queryFn: async () => {
      const res = await getHistoricalRoomMetrics(params);
      return res.data;
    },
  });
};

export const useGetCurrentRoomMetricsByCategory = (params) => {
  return useQuery({
    queryKey: ["current-room-metrics", params],
    refetchInterval: 5000,
    queryFn: async () => {
      const res = await getCurrentRoomMetricsByCategory(params);
      return res.data;
    },
  });
};

export const useGetRoomStatCard = () => {
  return useQuery({
    queryKey: ["room-stat"],
    queryFn: async () => {
      const res = await getRoomStatCard();
      return res.data;
    },
  });
};
