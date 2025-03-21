import React, { useEffect, useState } from "react";
import { gongsiTitleList } from "../Main/dummyTitle";
import { GongsiList } from "../../components/GongsiList";
import { useNavigate } from "react-router-dom";
import { GongsiData, fetchGongsiList } from "../../services/gongsiService";
import { LoadingSpinner } from "../../components/LoadingSpinner";

interface GongsiPaginationProps {
  filterMenu: string;
  startDate: string | undefined;
  endDate: string | undefined;
  selectedCompany: number | undefined;
}

export const GongsiPagination = ({
  filterMenu,
  startDate,
  endDate,
  selectedCompany,
}: GongsiPaginationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    const getGongsiList = async () => {
      try {
        setIsLoading(true);

        const response = await fetchGongsiList(
          selectedCompany,
          filterMenu,
          false,
          currentPage,
          8,
          startDate,
          endDate,
        );

        setGongsiData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("공시목록 조회 에러 : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getGongsiList();
  }, [currentPage, filterMenu, startDate, endDate, selectedCompany]);
  useEffect(() => {
    setCurrentPage(1);
  }, [filterMenu, startDate, endDate, selectedCompany]);
  const [gongsiData, setGongsiData] = useState<GongsiData>();
  const navigate = useNavigate();

  const totalPages = gongsiData?.pagination.totalPages;

  const maxVisibleButton = 5;
  const currentGroupStart =
    Math.floor((currentPage - 1) / maxVisibleButton) * maxVisibleButton + 1;

  const currentGroupEnd = Math.min(
    currentGroupStart + maxVisibleButton - 1,
    totalPages ?? 1,
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 게시글 목록 */}
      <ul className="flex flex-col max-h-content">
        {!isLoading ? (
          gongsiData?.gongsiList.map((gongsi) => (
            <li
              onClick={() => navigate(`/detail/${gongsi.gongsiId}`)}
              key={gongsi.gongsiId}
              className="border-b border-gray-300 p-3 cursor-pointer"
            >
              <div className="font-bold truncate">{gongsi.gongsiTitle}</div>
              <div className="flex justify-between">
                <div className="text-gray-500 text-sm">
                  {gongsi.companyName}
                </div>
                <div className="text-gray-500 text-sm">
                  {gongsi.publishedDatetime.toString()}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="flex h-[545px] items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </ul>
      <div className="flex justify-center mt-4 space-x-5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || isLoading}
          className={`px-3 py-1 ${currentPage === 1 || isLoading ? "text-gray-400 border-gray-300" : "hover:bg-gray-100"}`}
        >
          {"<"}
        </button>

        {/* ⭐ 현재 그룹의 페이지 버튼 */}
        {Array.from(
          { length: currentGroupEnd - currentGroupStart + 1 },
          (_, index) => (
            <button
              key={currentGroupStart + index}
              disabled={isLoading}
              onClick={() => setCurrentPage(currentGroupStart + index)}
              className={`px-3 ${currentPage === currentGroupStart + index ? "bg-blue-500 text-white rounded-lg" : "hover:bg-gray-100"} ${
                isLoading ? "text-gray-400 border-gray-300" : ""
              }`}
            >
              {currentGroupStart + index}
            </button>
          ),
        )}

        {/* ▶ 다음 그룹 */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages ?? 1))
          }
          disabled={currentPage === totalPages || isLoading}
          className={`px-3 py-1 ${currentPage === totalPages || isLoading ? "text-gray-400 border-gray-300" : "hover:bg-gray-100"}`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
