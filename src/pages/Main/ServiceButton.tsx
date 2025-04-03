import React, { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginSlider } from "../../components/LoginSlider";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = () => {
    if (route === "/login") {
      setIsOpen(true);
    } else if (route === "https://dart.fss.or.kr/main.do") {
      window.open(route, "_blank");
    } else {
      navigate(route);
      toast.error("미구현 기능입니다");
    }
  };
  return (
    <div onClick={openLoginModal}>
      <div className="flex  w-[146px] justify-center border bg-primary p-2 gap-2 rounded-lg cursor-pointer min-h-lg">
        <div className="text-white font-bold">{children}</div>
        <img className="aspect-square w-12" src={imgSrc} alt="" />
      </div>
      {isOpen && <LoginSlider isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};
