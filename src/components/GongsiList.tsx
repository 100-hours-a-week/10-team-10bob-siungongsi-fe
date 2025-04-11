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

  // 타이틀 25자 제한 함수
  const truncateTitle = (title: string) => {
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  };

  return (
    <div
      onClick={() => navigate(`/detail/${gongsiId}`)}
      className="flex max-h-[70px] flex-col gap-2 border-b p-2 cursor-pointer"
    >
      <div className="w-full font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1">
        {truncateTitle(gongsiTitle)}
      </div>
      <div className="w-full text-sm font-medium overflow-hidden text-ellipsis text-primary whitespace-nowrap">
        {gongsiCompany}
      </div>
    </div>
  );
};
