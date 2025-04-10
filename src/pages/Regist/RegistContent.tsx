import React, { useState } from "react";
import { RadioButton } from "../../components/RadioButton";
import { ScrollDown } from "../../components/Icons/ScrollDown";

interface Props {
  title: string;
  termsOfUse: string;
  checks: boolean[];
  handleSingleClick: (index: number) => void;
  index: number;
}

export const RegistContent = ({
  title,
  termsOfUse,
  checks,
  handleSingleClick,
  index,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mb-6">
      {/* 헤더 부분 */}
      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow border border-gray-200">
        <div className="flex items-center gap-3 flex-1">
          <RadioButton
            isClick={checks[index]}
            onClick={() => handleSingleClick(index)}
          />
          <div
            className="font-medium text-gray-800 cursor-pointer flex-1"
            onClick={() => handleSingleClick(index)}
          >
            {title}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-label={isOpen ? "접기" : "펼치기"}
        >
          <ScrollDown />
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="p-5 h-[300px] bg-gray-50 rounded-xl overflow-y-auto border border-gray-200 text-sm text-gray-700 leading-relaxed shadow-sm"
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {termsOfUse}
        </div>
      </div>
    </div>
  );
};
