import api from "@/lib/axios";

export const getRoomsByCategoryId = async (categoryId) => {
    const res = await api.get("/rooms", { params: { categoryId } });
    return res.data;
}