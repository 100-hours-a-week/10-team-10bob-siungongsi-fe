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
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <RadioButton
            isClick={checks[index]}
            onClick={() => handleSingleClick(index)}
          />
          <div>{title}</div>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <ScrollDown />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0"}`}
      >
        <div
          className={`p-4 h-[300px] bg-gray-200 rounded-lg overflow-y-auto`}
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {termsOfUse}
        </div>
      </div>
    </>
  );
};
