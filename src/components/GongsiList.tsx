import React from "react";
import { useNavigate } from "react-router-dom";

interface GongsiListProps {
  gongsiTitle: string | undefined;
  gongsiCompany: string | undefined;
  gongsiId: number | undefined;
}

export const GongsiList = ({
  gongsiTitle,
  gongsiCompany,
  gongsiId,
}: GongsiListProps) => {
  const navigate = useNavigate();

  return (
    <>
      {gongsiTitle && (
        <div
          onClick={() => navigate(`/detail/${gongsiId}`)}
          className="flex max-h-[70px] flex-col gap-2 border-b p-2 cursor-pointer"
        >
          <div className="w-full font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1">
            {gongsiTitle}
          </div>
          <div className="w-full text-sm font-medium overflow-hidden text-ellipsis text-primary whitespace-nowrap">
            {gongsiCompany}
          </div>
        </div>
      )}
    </>
  );
};
