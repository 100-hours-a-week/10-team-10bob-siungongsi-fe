import React from "react";
import { useNavigate } from "react-router-dom";

interface GongsiListProps {
  gongsiTitle: string;
  gongsiCompany: string;
  gongsiId: number;
}
export const GongsiList = ({
  gongsiTitle,
  gongsiCompany,
  gongsiId,
}: GongsiListProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detail/${gongsiId}`)}
      className="flex max-h-[70px] flex-col gap-2 border-t border-b p-2 cursor-pointer"
    >
      <div className="w-full text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap">
        {gongsiTitle}
      </div>
      <div className="w-full text-sm overflow-hidden text-ellipsis text-gray-400 whitespace-nowrap">
        {gongsiCompany}
      </div>
    </div>
  );
};
