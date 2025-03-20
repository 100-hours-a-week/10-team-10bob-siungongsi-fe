import React, { useEffect, useState } from "react";
import { gongsiTitleList } from "../Main/dummyTitle";
import { GongsiList } from "../../components/GongsiList";
import { useNavigate } from "react-router-dom";
import { GongsiData, fetchGongsiList } from "../../services/gongsiService";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const GongsiPagination = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    const getGongsiList = async () => {
      try {
        setIsLoading(true);
        const response = await fetchGongsiList(
          null,
          "latest",
          false,
          currentPage,
          8,
          null,
          null,
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
  }, [currentPage]);
  const [gongsiData, setGongsiData] = useState<GongsiData>();
  const navigate = useNavigate();

  // const postsPerPage = 9;

  // const startIndex = (currentPage - 1) * postsPerPage;
  // const endIndex = startIndex + postsPerPage;
  // const currentPosts = gongsiTitleList.slice(startIndex, endIndex);

  const totalPages = gongsiData?.pagination.totalPages;
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 게시글 목록 */}
      <ul className="flex flex-col max-h-content">
        {!isLoading ? (
          gongsiData?.gongsiList.map((gongsi) => (
            <li key={gongsi.gongsiId} className="border-b border-gray-300 p-3">
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
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || isLoading}
          className={`px-3 py-1 border rounded-md ${currentPage === 1 || isLoading ? "text-gray-400 border-gray-300" : "hover:bg-gray-100"}`}
        >
          이전
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            disabled={isLoading}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"} ${isLoading ? "text-gray-400 border-gray-300" : ""}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || isLoading}
          className={`px-3 py-1 border rounded-md ${currentPage === totalPages || isLoading ? "text-gray-400 border-gray-300" : "hover:bg-gray-100"}`}
        >
          다음
        </button>
      </div>
    </div>
  );
};
