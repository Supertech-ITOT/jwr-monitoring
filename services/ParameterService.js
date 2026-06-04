import api from "@/lib/axios";

export const getParameters = async () => {
  const res = await api.get("/parameters");
  return res.data;
};
