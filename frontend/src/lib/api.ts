import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ✅ Axios instance (API Gateway)
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token safely (browser-only)
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {   // ✅ FIX
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Extract userId safely (SSR-safe)
export const getUserId = () => {
  if (typeof window === "undefined") return null; // ✅ FIX

  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.userId;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export default API;