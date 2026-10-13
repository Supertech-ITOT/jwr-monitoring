import { ApiResponse, PageResponse, RoomHistoricalValueDto } from "@/app/common/api.types";
import api from "@/lib/axios";
import {
  CommonRoomRequest,
  CommonRoomResponse,
  EnergyRoomLogParams,
  EnergyRoomResponse,
  HistoricalRoomMetricsParams,
  RoomCurrentValueDto,
  RoomStatCard,
} from "@/types/dashboard.types";

export const getHistoricalRoomMetrics = async (params: HistoricalRoomMetricsParams) => {
  const res = await api.get<ApiResponse<PageResponse<RoomHistoricalValueDto>>>("/dashboard", { params });
  return res.data;
};

export const getCurrentRoomMetrics = async (id: number | string) => {
  const res = await api.get<ApiResponse<RoomCurrentValueDto[]>>(`/dashboard/current-metrics/${id}`);
  return res.data;
};

export const getRoomStatCard = async (): Promise<ApiResponse<RoomStatCard[]>> => {
  const res = await api.get<ApiResponse<RoomStatCard[]>>("/dashboard/room-stat");
  return res.data;
};

export const getCommonRoomLog = async (filter: CommonRoomRequest, page = 0, size = 1) => {
  const res = await api.post<ApiResponse<PageResponse<CommonRoomResponse>>>("/dashboard/common-logs", filter, { params: { page, size } });
  return res.data;
};

export const getEnergyRoomLog = async (params: EnergyRoomLogParams) => {
  const { page, size, sort, ...request } = params;
  const res = await api.post<ApiResponse<PageResponse<EnergyRoomResponse>>>("/dashboard/energy-logs", request, { params: { page, size, sort } });
  return res.data;
};
