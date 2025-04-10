import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import kakao from "../assets/kakao_login.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: any;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export const LoginSlider = ({ isOpen, onClose }: Props) => {
  const { setIsLoggedIn } = useAuth();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("dc0dfb49278efc7bde35eb001c7c4d5e"); // 🔹 JavaScript Key 입력
    }
  }, []);

  const loginWithKakao = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      window.Kakao.Auth.login({
        success: (authObj: any) => {
          resolve(authObj.access_token); // ✅ resolve로 access_token 전달
        },
        fail: (err: any) => {
          console.error("로그인 실패", err);
          reject(err);
        },
      });
    });
  };

  const postAccessToken = async () => {
    try {
      const accessToken = await loginWithKakao();
      const data = await login(accessToken);
      if (data.data.isUser) {
        localStorage.setItem("jwtToken", data.data.accessToken);
        setIsLoggedIn(true);
        onClose();
      } else {
        navigate("/regist", { state: accessToken });
      }
    } catch (error) {
      console.error("로그인 에러: ", error);
    } finally {
      if (!isMobile) {
        navigate(0);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-end z-[1000]"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-t-2xl shadow-xl w-full max-w-sm mx-auto overflow-hidden"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 핸들 - iOS 스타일 */}
        <div className="w-full flex justify-center mt-3 mb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">로그인</h2>
            <button
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              onClick={onClose}
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-50 w-full rounded-2xl p-4 mb-5 text-center">
              <p className="text-gray-700 text-sm mb-4">
                간편하게 로그인하고 원하는 기업의
                <br />
                공시 정보를 받아보세요
              </p>

              <button
                onClick={postAccessToken}
                className="flex items-center justify-center w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <img
                  className="w-full max-w-[200px]"
                  src={kakao}
                  alt="카카오 로그인"
                />
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
