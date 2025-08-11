import axios from "axios";
import {getToken} from "../authService.ts";
import API_BASE_URL from "./config.ts";

const base_api = axios.create({
    baseURL: API_BASE_URL,
});

base_api.interceptors.request.use((config) => {
    const token = getToken();
    config.withCredentials = true;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default base_api;
