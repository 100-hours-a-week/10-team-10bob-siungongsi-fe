// src/stores/authStore.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  exp: number; // JWT 토큰에는 보통 exp(만료시간, 초 단위)가 들어감
};

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkTokenValidity: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: !!localStorage.getItem("jwtToken"),
  token: localStorage.getItem("jwtToken"),
  login: (token: string) => {
    localStorage.setItem("jwtToken", token);
    set({ token, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("jwtToken");
    set({ isLoggedIn: false, token: null });
  },

  checkTokenValidity: () => {
    const token = get().token;
    if (!token) return;

    try {
      const decoded: JWTPayload = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        get().logout();
      }
    } catch (err) {
      console.error("JWT decode error:", err);
      get().logout(); // 토큰이 잘못된 경우도 로그아웃 처리
    }
  },
}));
