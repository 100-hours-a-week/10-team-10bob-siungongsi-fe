import React from "react";
import { HeaderLogin } from "../../components/HeaderLogin";
import { SubscribeListInput } from "../../components/SubscribeListInput";

export const MyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLogin />
      <SubscribeListInput />
    </div>
  );
};
