import { getCategories } from "@/services/CategoryService"
import { useQuery } from "@tanstack/react-query"

export const useGetCategory = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await getCategories();
            return res.data;
        }
    })
}