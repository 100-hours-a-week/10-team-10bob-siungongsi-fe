import React, { useState } from "react";
import { LoginSlider } from "./LoginSlider";
interface Props {
  isLogin: boolean;
}
export const HeaderLoginBack = ({ isLogin }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white font-bold max-h-[55px]">
      <div onClick={() => window.history.back()} className="cursor-pointer">
        {"<"}
      </div>
      <h1 className="text-2xl">Siun</h1>
      {isLogin ? (
        <button className="bg-white p-2 rounded-lg text-primary">
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
