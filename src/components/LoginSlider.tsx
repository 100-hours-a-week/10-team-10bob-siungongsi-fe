import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import kakao from "../assets/kakao_login.png";
import { getPushToken } from "../firebase";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { patchUserNotificationInfo } from "../services/usersService";
import { isIos } from "../pages/Iphone_main/InstallPWA";
import { X } from "lucide-react";

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
  const y = useMotionValue(0);
  useEffect(() => {
    y.set(0); // 매번 열릴 때 초기화
  }, [isOpen, y]);
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
        // if (!isMobile) {
        //   navigate(0);
        // }
        onClose();
      } else {
        navigate("/regist", { state: accessToken });
      }
    } catch (error) {
      console.error("로그인 에러: ", error);
    } finally {
      const newToken = await getPushToken();
      const oldToken = localStorage.getItem("fcmToken");

      if (newToken && newToken !== oldToken && !isIos()) {
        await patchUserNotificationInfo(
          true,
          newToken,
          localStorage.getItem("jwtToken"),
        );
        localStorage.setItem("fcmToken", newToken); // 중복 호출 방지
        console.log("✅ FCM 토큰 서버에 등록 완료");
      } else {
        return;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
        onClick={onClose}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={onClose}
        />
        <motion.div
          className="fixed bottom-0 bg-white rounded-tl-xl rounded-tr-xl shadow-xl w-96 max-h-[500px]"
          initial={{ y: "100%", opacity: 0 }} // 처음 등장할 때
          animate={{ y: 0, opacity: 1 }} // 보일 때
          exit={{ y: "100%", opacity: 0 }} // 사라질 때
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 100 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.offset.y > 100) {
              onClose(); // 아래로 많이 드래그하면 닫힘
            }
          }}
          onClick={(e) => e.stopPropagation()} // 바텀시트 내부 클릭 시 닫힘 방지
        >
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 mt-4" />
          <div className="flex justify-between px-6 rounded-tl-lg rounded-tr-lg">
            <h2 className="text-xl font-bold text-black">로그인</h2>

            <button onClick={onClose}>
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
          <div className="flex flex-col p-8 items-center gap-8">
            <img
              className="cursor-pointe"
              onClick={postAccessToken}
              src={kakao}
              alt=""
            />
            {/* <button
            className="text-gray-300 font-normal"
            onClick={() => navigate("/regist")}
          >
            회원가입 하시겠습니까?
          </button> */}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
