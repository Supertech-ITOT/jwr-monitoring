import { ApiResponse } from "@/app/common/api.types";
import api from "@/lib/axios";

export interface Category {
  id: number;
  name: string;
}

export const getCategories = async () => {
  const res = await api.get<ApiResponse<Category[]>>("/categories");
  return res.data;
};

export const getCategoryById = async (id: number) => {
  const res = await api.get<ApiResponse<Category>>(`categories/${id}`);
  return res.data;
};
