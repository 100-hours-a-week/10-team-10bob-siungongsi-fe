import React from "react";

export const LoginSlider = () => {
  return (
    <div className="fixed w-[392px] left-30 z-50 p-4 border bg-white">
      <header className="flex justify-between m-4">
        <div>로그인</div>
        <div>X</div>
      </header>
      <div className="flex justify-center">카카오 로그인</div>
      <div className="flex justify-center">회원가입 하시겠습니까?</div>
    </div>
  );
};
