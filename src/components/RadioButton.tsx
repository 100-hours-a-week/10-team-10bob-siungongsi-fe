import React, { useState } from "react";

interface RadioButtonProps {
  isClick: boolean;
  onClick: () => void;
}

export const RadioButton = ({ isClick, onClick }: RadioButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-4 h-4 bg-gray-300 rounded-full transition ease-in-out ${isClick ? "bg-red-500" : "bg-gray-300 hover:bg-gray-400"}`}
    ></div>
  );
};
