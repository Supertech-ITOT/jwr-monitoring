import { ApiResponse } from "@/app/common/api.types";
import api from "@/lib/axios";

export interface Parameter {
  id: number;
  name: string;
}

export const getParameters = async (): Promise<ApiResponse<Parameter[]>> => {
  const res = await api.get<ApiResponse<Parameter[]>>("/parameters");
  return res.data;
};
