import { getInterval, updateInterval } from "@/services/LoginConfigService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetInterval = () => {
    return useQuery({
        queryKey: ["interval"],
        queryFn: async () => {
            const res = await getInterval();
            return res.data;
        },
    });
};

export const useUpdateInterval = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const res = await updateInterval(data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["interval"],
            });
        },
    });
};