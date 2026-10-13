import { useQuery } from "@tanstack/react-query";

import { getCommonRoomLog, getCurrentRoomMetrics, getEnergyRoomLog, getHistoricalRoomMetrics, getRoomStatCard } from "@/services/DashboardService";
import { CommonRoomRequest, EnergyRoomLogParams, HistoricalRoomMetricsParams } from "@/types/dashboard.types";

export const queryKeys = {
  historicalMetrics: (params: HistoricalRoomMetricsParams) => ["historical-metric", params] as const,

  currentRoomMetrics: (id: number) => ["current-room-metrics", id] as const,

  roomStatCard: () => ["room-stat"] as const,

  commonRoomLog: (filter: CommonRoomRequest, page: number, size: number) => ["common-room-log", filter, page, size] as const,

  energyRoomLog: (params: EnergyRoomLogParams) => ["energy-room-log", params] as const,
};

export const useGetHistoricalRoomMetrics = (params: HistoricalRoomMetricsParams, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.historicalMetrics(params),
    queryFn: async () => {
      const res = await getHistoricalRoomMetrics(params);
      return res.data;
    },
    refetchInterval: 60000,
    enabled,
  });
};

export const useGetCurrentRoomMetrics = (id = 1, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.currentRoomMetrics(id),
    queryFn: async () => {
      const res = await getCurrentRoomMetrics(id);
      return res.data;
    },
    enabled,
  });
};

export const useGetRoomStatCard = (enabled = true) => {
  return useQuery({
    queryKey: ["room-stat"],
    queryFn: async () => {
      const res = await getRoomStatCard();
      return res.data;
    },
    enabled,
  });
};

export const useGetCommonRoomLog = (filter: CommonRoomRequest, page: number, size: number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.commonRoomLog(filter, page, size),
    queryFn: async () => {
      const res = await getCommonRoomLog(filter, page, size);
      return res.data;
    },
    enabled: enabled && !!filter,
  });
};

export const useGetEnergyRoomLog = (params: EnergyRoomLogParams, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.energyRoomLog(params),
    queryFn: async () => {
      const res = await getEnergyRoomLog(params);
      return res.data;
    },
    refetchInterval: 60000,
    enabled: Boolean(enabled),
  });
};
