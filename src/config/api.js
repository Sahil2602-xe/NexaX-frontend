// src/config/api.js
import axios from "axios";

export const API_BASE_URL = "https://nexax.up.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false // or true if you rely on cookies
});

export default api;
