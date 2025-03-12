import React from "react";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white font-bold max-h-[55px]">
      <h1 className="text-2xl">Siun</h1>
      <button className="bg-white p-2 rounded-lg text-primary">로그인</button>
    </div>
  );
};
