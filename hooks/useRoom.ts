import { useQuery } from "@tanstack/react-query";
import { getRoomsByCategoryId } from "@/services/RoomService";

export const useGetRoomByCategoryId = (categoryId: number | string | undefined, enabled = true) => {
  return useQuery({
    queryKey: ["rooms", categoryId],
    queryFn: async () => {
      const res = await getRoomsByCategoryId(categoryId!);
      return res.data;
    },
    enabled: enabled && !!categoryId,
  });
};
