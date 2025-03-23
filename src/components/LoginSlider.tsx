import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import kakao from "../assets/kakao_login.png";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("dc0dfb49278efc7bde35eb001c7c4d5e"); // 🔹 JavaScript Key 입력
    }
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      success: (authObj: any) => {
        console.log("로그인 성공", authObj);
        alert(`토큰: ${authObj.access_token}`);
      },
      fail: (err: any) => {
        console.error("로그인 실패", err);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <motion.div
        className="fixed bottom-0 bg-white p-6 rounded-tl-xl rounded-tr-xl shadow-xl w-96 max-h-[290px]"
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }} //이거 만약 모바일로 옮기면 수치 수정해야겠음
        exit={{ y: "100vh", opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭시 닫히지 않도록
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-black">로그인</h2>
          <button className="text-black rounded-md" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col p-8 items-center gap-8">
          <img
            className="cursor-pointer"
            onClick={loginWithKakao}
            src={kakao}
            alt=""
          />
          <button
            className="text-gray-300 font-normal"
            onClick={() => navigate("/regist")}
          >
            회원가입 하시겠습니까?
          </button>
        </div>
      </motion.div>
    </div>
  );
};
