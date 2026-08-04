import api from "./axiosConfig";

export const getProperties = () => api.get("/properties");

export const getTenants = () => api.get("/tenants");

export const getPayments = () => api.get("/payments");