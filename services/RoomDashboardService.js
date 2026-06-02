import api from "@/lib/axios";

export const getRoomDashboard = () => {
    const res = api.get(`/dashboard`);
    return res.data;
}