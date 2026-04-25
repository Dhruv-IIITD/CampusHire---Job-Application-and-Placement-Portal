import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async ({ url, method = "GET", data, token, params }) => {
  try {
    const authToken = token || JSON.parse(localStorage.getItem("userDetail") || "null")?.jwtToken;

    const response = await API({
      url,
      method,
      data,
      params,
      headers: authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : undefined,
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    const status = error.response?.status || 500;
    throw { message, status };
  }
};

export const getDashboardPath = (role) => {
  if (role === "STUDENT") return "/student/dashboard";
  if (role === "RECRUITER" || role === "ADMIN") return "/recruiter/dashboard";
  return "/";
};
