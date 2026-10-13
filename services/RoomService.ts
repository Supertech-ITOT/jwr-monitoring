import { ApiResponse } from "@/app/common/api.types";
import api from "@/lib/axios";

export interface Room {
  id: number;
  name: string;
}

export const getRoomsByCategoryId = async (categoryId: number) => {
  const res = await api.get<ApiResponse<Room[]>>("/rooms", {
    params: { categoryId },
  });

  return res.data;
};

export const getRoomById = async (id: number) => {
  const res = await api.get<ApiResponse<Room>>(`rooms/${id}`);
  return res.data;
};
