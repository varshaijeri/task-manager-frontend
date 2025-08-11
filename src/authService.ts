import axios from "axios";
import API_BASE_URL from "./config/config.ts";

const apiUrl = `${API_BASE_URL}/api/auth`;

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${apiUrl}/login`, { username, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const register = async (username: string, password: string) => {
    const response = await axios.post(`${apiUrl}/register`, { username, password });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};
