import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getPlatos = () => api.get("/platos").then(r => r.data);
export const getMesas = () => api.get("/mesas").then(r => r.data);

export default api;