import api from "@/lib/axios";

export const getHistoricalRoomMetrics = async (params) => {
  const res = await api.get("/dashboard", {
    params,
  });

  return res.data;
};

export const getCurrentRoomMetrics = async (id) => {
  const res = await api.get(`/dashboard/current-metrics/${id}`);
  return res.data;
};

export const getRoomStatCard = async (params) => {
  const res = await api.get("/dashboard/room-stat");
  return res.data;
};

export const getCommonRoomLog = async (filter, page = 0, size = 1) => {
  const res = await api.post("/dashboard/common-logs", filter, {
    params: {
      page,
      size,
    },
  });

  return res.data;
};
export const getEnergyRoomLog = async (filter, page = 0, size = 1) => {
  const res = await api.post("/dashboard/energy-logs", filter, {
    params: {
      page,
      size,
    },
  });

  return res.data;
};