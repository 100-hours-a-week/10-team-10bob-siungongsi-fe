import React, { useState } from "react";
import { LoginSlider } from "./LoginSlider";
import { useLocation, useNavigate } from "react-router-dom";
interface Props {
  isLogin: boolean;
}
export const HeaderLoginBack = ({ isLogin }: Props) => {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const location = useLocation();
  const openLoginModal = () => {
    navigate("/login", { state: { backgroundLocation: location } });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate(0);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white font-bold max-h-[55px]">
      <div onClick={() => window.history.back()} className="cursor-pointer">
        {"<"}
      </div>
      <h1 className="text-2xl">Siun</h1>
      {token ? (
        <button
          onClick={logout}
          className="bg-primary text-white p-2 rounded-lg border border-white"
        >
          로그아웃
        </button>
      ) : (
        <button
          className="bg-white p-2 rounded-lg text-primary"
          onClick={openLoginModal}
        >
          로그인
        </button>
      )}
    </div>
  );
};
