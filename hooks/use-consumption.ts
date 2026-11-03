import { getEnergyConsumption } from "@/services/ConsumptionService";
import { EnergyConsumptionRequest } from "@/types/consumption.types";
import { useQuery } from "@tanstack/react-query";

export const UseGetEnergyConsumption = (request: EnergyConsumptionRequest) => {
  return useQuery({
    queryKey: ["energy-consumption", request],
    queryFn: async () => {
      const res = await getEnergyConsumption(request);
      return res.data;
    },
  });
};
