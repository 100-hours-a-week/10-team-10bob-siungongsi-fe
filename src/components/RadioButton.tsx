import React from "react";

interface RadioButtonProps {
  isClick: boolean;
  onClick: () => void;
}

export const RadioButton = ({ isClick, onClick }: RadioButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 flex items-center justify-center focus:outline-none"
      aria-checked={isClick}
      role="radio"
    >
      <div
        className={`
        w-5 h-5 rounded-full border-2 flex items-center justify-center
        ${
          isClick
            ? "border-primary bg-white"
            : "border-gray-300 bg-white hover:border-gray-400"
        }
        transition-colors duration-200
      `}
      >
        {isClick && <div className="w-3 h-3 rounded-full bg-primary"></div>}
      </div>
    </button>
  );
};
