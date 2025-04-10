import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GongsiData, fetchGongsiList } from "../../services/gongsiService";
import { LoadingSpinner } from "../../components/LoadingSpinner";

interface GongsiPaginationProps {
  filterMenu: string;
  startDate: string;
  endDate: string;
  selectedCompany: number;
}

export const GongsiPagination = ({
  filterMenu,
  startDate,
  endDate,
  selectedCompany,
}: GongsiPaginationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [searchParams, setSearchParams] = useSearchParams();
  const initalPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initalPage);
  const [prevFilterKey, setPrevFilterKey] = useState("");

  useEffect(() => {
    // 🔹 URL 쿼리 파라미터로 현재 페이지 반영
    setSearchParams(
      {
        page: currentPage.toString(),
        companyId: selectedCompany.toString(),
        sort: filterMenu,
        startDate: startDate,
        endDate: endDate,
      },
      { replace: true },
    );
  }, [currentPage, filterMenu, startDate, endDate, selectedCompany]);

  useEffect(() => {
    const getGongsiList = async () => {
      try {
        setIsLoading(true);
        const response = await fetchGongsiList(
          selectedCompany,
          filterMenu,
          false,
          currentPage,
          null,
          startDate,
          endDate,
        );
        setGongsiData(response.data);
      } catch (error) {
        console.error("공시목록 조회 에러 : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getGongsiList();
  }, [currentPage, filterMenu, startDate, endDate, selectedCompany]);

  //조건을 바꾸면 currentPage = 1 로 됨
  useEffect(() => {
    const newFilterKey = `${filterMenu}_${startDate}_${endDate}_${selectedCompany}`;
    if (prevFilterKey && prevFilterKey !== newFilterKey) {
      setCurrentPage(1);
      setSearchParams(
        {
          page: "1",
          companyId: selectedCompany.toString(),
          sort: filterMenu,
          startDate: startDate,
          endDate: endDate,
        },
        { replace: true },
      );
    }
    setPrevFilterKey(newFilterKey);
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
      <ul className="flex flex-col max-h-content rounded-2xl overflow-hidden shadow-sm bg-white mb-4">
        {!isLoading ? (
          gongsiData?.gongsiListSize !== 0 ? (
            gongsiData?.gongsiList.map((gongsi, index) => (
              <li
                onClick={() => navigate(`/detail/${gongsi.gongsiId}`)}
                key={gongsi.gongsiId}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  index !== gongsiData.gongsiList.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="font-medium text-gray-900 mb-2 line-clamp-2">
                  {gongsi.gongsiTitle}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm flex items-center">
                    <span className="font-medium text-primary">
                      {gongsi.companyName}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {gongsi.publishedDatetime.toString()}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="flex h-[400px] items-center justify-center flex-col p-8 text-gray-500">
              <svg
                className="w-12 h-12 mb-3 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 005.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-center">해당하는 공시가 없습니다.</p>
              <p className="text-center text-xs mt-1">
                다른 검색 조건을 시도해보세요.
              </p>
            </div>
          )
        ) : (
          <div className="flex h-[400px] items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </ul>

      {/* 페이지네이션 */}
      {gongsiData?.gongsiListSize !== 0 && (
        <div className="flex justify-center mt-6 mb-8">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full shadow-sm">
            {/* 이전 버튼 */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                currentPage === 1 || isLoading
                  ? "text-gray-400"
                  : "text-gray-700 hover:bg-white hover:shadow-sm"
              }`}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 페이지 버튼 */}
            {Array.from(
              { length: currentGroupEnd - currentGroupStart + 1 },
              (_, index) => (
                <button
                  key={currentGroupStart + index}
                  disabled={isLoading}
                  onClick={() => setCurrentPage(currentGroupStart + index)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-medium transition-all ${
                    currentPage === currentGroupStart + index
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-700 hover:bg-white hover:shadow-sm"
                  } ${isLoading ? "opacity-50" : ""}`}
                >
                  {currentGroupStart + index}
                </button>
              ),
            )}

            {/* 다음 버튼 */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages ?? 1))
              }
              disabled={currentPage === totalPages || isLoading}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                currentPage === totalPages || isLoading
                  ? "text-gray-400"
                  : "text-gray-700 hover:bg-white hover:shadow-sm"
              }`}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
