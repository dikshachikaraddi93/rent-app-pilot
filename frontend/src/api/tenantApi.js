import api from "./axiosConfig";

export const getTenants = () => api.get("/tenants");

export const addTenant = (tenant) => api.post("/tenants", tenant);

export const updateTenant = (id, tenant) =>
  api.put(`/tenants/${id}`, tenant);

export const deleteTenant = (id) =>
  api.delete(`/tenants/${id}`);