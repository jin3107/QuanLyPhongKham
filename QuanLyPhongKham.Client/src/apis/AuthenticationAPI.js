import apiClient from "../config/axios";

export const login = async (payload) =>
	await apiClient.post("/authentication/login", payload);

export const register = async (payload) =>
	await apiClient.post("/authentication/register", payload);

export const logout = async () => await apiClient.post("/authentication/logout");

export const getProfile = async () =>
	await apiClient.get("/authentication/me");
