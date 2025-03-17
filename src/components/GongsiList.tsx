import React from "react";

interface GongsiListProps {
  gongsiTitle: string;
  gongsiCompany: string;
}
export const GongsiList = ({ gongsiTitle, gongsiCompany }: GongsiListProps) => {
  return (
    <div className="flex max-h-[70px] flex-col gap-2 border-t border-b p-2">
      <div className="w-full text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap">
        {gongsiTitle}
      </div>
      <div className="w-full text-sm overflow-hidden text-ellipsis text-gray-400 whitespace-nowrap">
        {gongsiCompany}
      </div>
    </div>
  );
};
