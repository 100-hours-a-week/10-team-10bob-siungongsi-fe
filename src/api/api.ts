// src/api/api.ts
import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // 기본 URL 설정 (예제)
  timeout: 10000, // 요청 제한 시간 (10초)
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (Request Interceptor)
api.interceptors.request.use(
  (config) => {
    // 🔹 예: 토큰이 필요한 경우 헤더에 추가
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (Response Interceptor)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwtToken");
    }
    return Promise.reject(error);
  },
);

export default api;
