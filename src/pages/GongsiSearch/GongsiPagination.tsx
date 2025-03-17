import React, { useState } from "react";
import { gongsiTitleList } from "../Main/dummyTitle";
import { GongsiList } from "../../components/GongsiList";

export const GongsiPagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = gongsiTitleList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(gongsiTitleList.length / postsPerPage);
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 게시글 목록 */}
      <ul className="border-b border-gray-300 divide-y">
        {currentPosts ? (
          currentPosts.map((post) => (
            <li key={post.id} className="p-3">
              <div className="font-bold truncate">{post.title}</div>
              <div className="text-gray-500 text-sm">{post.company}</div>
            </li>
          ))
        ) : (
          <div>해당하는 공시가 없습니다</div>
        )}
      </ul>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "text-gray-400 border-gray-300" : "hover:bg-gray-100"}`}
        >
          이전
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "text-gray-400 border-gray-300" : "hover:bg-gray-100"}`}
        >
          다음
        </button>
      </div>
    </div>
  );
};
