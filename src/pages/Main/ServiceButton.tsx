import React, { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ServiceButtonProps {
  children: ReactNode;
  imgSrc: string;
  route: string;
}
export const ServiceButton = ({
  children,
  imgSrc,
  route,
}: ServiceButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = () => {
    if (route === "/login") {
      navigate(route, { state: { backgroundLocation: location } });
    } else if (route === "https://dart.fss.or.kr/main.do") {
      window.open(route, "_blank");
    } else {
      navigate(route);
      toast.error("미구현 기능입니다");
    }
  };
  return (
    <div onClick={openLoginModal}>
      <div className="flex max-w-[146px] justify-center border bg-primary p-2 gap-2 rounded-lg cursor-pointer min-h-lg">
        <div className="text-white font-bold">{children}</div>
        <img className="aspect-square w-12" src={imgSrc} alt="" />
      </div>
    </div>
  );
};
