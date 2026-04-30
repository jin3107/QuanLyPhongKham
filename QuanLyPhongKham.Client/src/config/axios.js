import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:7032"
});

instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;