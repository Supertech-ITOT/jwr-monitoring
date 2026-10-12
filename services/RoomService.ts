import { ApiResponse } from "@/app/common/api.types";
import api from "@/lib/axios";

export interface Room {
  id: number;
  name: string;
  categoryId: number;
}

export const getRoomsByCategoryId = async (categoryId: number | string): Promise<ApiResponse<Room[]>> => {
  const res = await api.get<ApiResponse<Room[]>>("/rooms", {
    params: { categoryId },
  });

  return res.data;
};
