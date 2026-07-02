import {
  getCommonRoomLog,
  getCurrentRoomMetrics,
  getHistoricalRoomMetrics,
  getRoomStatCard,
} from "@/services/DashboardService";
import { useQuery } from "@tanstack/react-query";

export const useGetHistoricalRoomMetrics = (params) => {
  return useQuery({
    queryKey: ["historical-metric", params],
    refetchInterval: 60000,
    queryFn: async () => {
      const res = await getHistoricalRoomMetrics(params);
      return res.data;
    },
  });
};

export const useGetCurrentRoomMetrics = (params) => {
  return useQuery({
    queryKey: ["current-room-metrics", params],
    queryFn: async () => {
      const res = await getCurrentRoomMetrics(params);
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

export const useGetCommonRoomLog = (filter, page, size) => {
  return useQuery({
    queryKey: ["common-room-log", filter, page, size],
    enabled: !!filter,
    queryFn: async () => {
      const res = await getCommonRoomLog(filter, page, size);
      return res.data;
    },
  });
};