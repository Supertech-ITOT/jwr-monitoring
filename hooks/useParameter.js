import { getParameters } from "@/services/ParameterService";
import { useQuery } from "@tanstack/react-query";

export const useGetParameter = () => {
  return useQuery({
    queryKey: ["parameters"],
    queryFn: async () => {
      const res = await getParameters();
      return res.data;
    },
  });
};
