import React, { useState } from "react";
import { LoginSlider } from "./LoginSlider";
interface Props {
  isLogin: boolean;
}
export const HeaderLogin = ({ isLogin }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const token = localStorage.getItem("kakao_187d878b0016b88b3051032882052481");
  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white font-bold max-h-[55px]">
      <h1 className="text-2xl">Siun</h1>
      {isLogin ? (
        <button className="bg-primary text-white p-2 rounded-lg border border-white">
          로그아웃
        </button>
      ) : (
        <button
          className="bg-white p-2 rounded-lg text-primary"
          onClick={() => setIsOpen(true)}
        >
          로그인
        </button>
      )}

      {isOpen && (
        <LoginSlider isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};
