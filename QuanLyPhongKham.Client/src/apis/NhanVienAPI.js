import apiClient from "../config/axios";
import { createSearchRequest } from "../helpers";

export const getNhanVienById = async (id) =>
	await apiClient.get(`/nhanvien/${id}`);

export const createNhanVien = async (payload) =>
	await apiClient.post("/nhanvien", payload);

export const updateNhanVien = async (payload) =>
	await apiClient.put("/nhanvien", payload);

export const deleteNhanVien = async (id) =>
	await apiClient.delete(`/nhanvien/${id}`);

export const searchNhanVien = async (filters = null, pageIndex = 1, pageSize = 10) => {
    const searchRequest = createSearchRequest(filters, null, pageIndex, pageSize);
    return await apiClient.post("/nhanvien/search", searchRequest);
};