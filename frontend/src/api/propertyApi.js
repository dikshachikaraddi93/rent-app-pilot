import api from "./axiosConfig";

export const getProperties = () => api.get("/properties");

export const addProperty = (property) =>
  api.post("/properties", property);

export const updateProperty = (id, property) =>
  api.put(`/properties/${id}`, property);

export const deleteProperty = (id) =>
  api.delete(`/properties/${id}`);