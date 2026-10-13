import { getCategories, getCategoryById } from "@/services/CategoryService";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getCategories();
      return res.data;
    },
  });
};

export const useGetCategoryById = (id?: number) => {
  return useQuery({
    queryKey: ["categories-by-id", id],
    queryFn: async () => {
      const res = await getCategoryById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};
