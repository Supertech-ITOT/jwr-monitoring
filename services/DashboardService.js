import api from "@/lib/axios";

export const getHistoricalRoomMetrics = async (params) => {
  const res = await api.get("/dashboard", {
    params,
  });

  return res.data;
};

export const getCurrentRoomMetrics = async (params) => {
  const res = await api.get("/dashboard/current-metrics", {
    params,
  });
  return res.data;
};

export const getRoomStatCard = async (params) => {
  const res = await api.get("/dashboard/room-stat");
  return res.data;
};
