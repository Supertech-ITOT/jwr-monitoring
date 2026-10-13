import { useQuery } from "@tanstack/react-query";
import { getRoomById, getRoomsByCategoryId } from "@/services/RoomService";

export const useGetRoomByCategoryId = (categoryId: number, enabled = true) => {
  return useQuery({
    queryKey: ["rooms", categoryId],
    queryFn: async () => {
      const res = await getRoomsByCategoryId(categoryId!);
      return res.data;
    },
    enabled: enabled && !!categoryId,
  });
};

export const useGetRoomById = (id?: number) => {
  return useQuery({
    queryKey: ["rooms-by-id", id],
    queryFn: async () => {
      const res = await getRoomById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};
