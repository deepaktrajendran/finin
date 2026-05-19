import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ✅ Axios instance (API Gateway)
const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Extract userId from JWT
export const getUserId = () => {
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
