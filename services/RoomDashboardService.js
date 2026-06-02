import api from "@/lib/axios";

export const getRoomDashboard = async (params) => {
    const res = await api.get("/dashboard", {
        params,
    });

    return res.data;
};