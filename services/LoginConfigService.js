import api from "@/lib/axios";

export const getInterval = async () => {
    const res = await api.get("/logging-config");
    return res.data;
}

export const updateInterval = async (data) => {
    const res = await api.post("/logging-config", data);
    return res.data;
}