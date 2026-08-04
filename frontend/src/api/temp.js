import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getProperties = () => API.get("/properties");
export const getTenants = () => API.get("/tenants");
export const getPayments = () => API.get("/payments");