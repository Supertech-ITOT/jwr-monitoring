import { ApiResponse } from "@/app/common/api.types";
import api from "@/lib/axios";
import { EnergyConsumptionRequest, EnergyConsumptionResponse } from "@/types/consumption.types";

export const getEnergyConsumption = async (request: EnergyConsumptionRequest) => {
  const res = await api.post<ApiResponse<EnergyConsumptionResponse>>("/energy/consumption", request);
  return res.data;
};
