import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginSlider } from "../../components/LoginSlider";
interface ServiceButtonProps {
  children: ReactNode;
  imgSrc: string;
}
export const ServiceButton = ({ children, imgSrc }: ServiceButtonProps) => {
  return (
    <div>
      <div className="flex w-[146px] justify-center border bg-primary p-2 gap-2 rounded-lg">
        <div className="text-white font-bold">{children}</div>
        <img className="w-[50px]" src={imgSrc} alt="" />
      </div>
    </div>
  );
};
