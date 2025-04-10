import React, { useState } from "react";
import { Company } from "../../services/companiesService";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  keyword: string;
  companies: Company[] | undefined;
  onChangeKeyword: (value: string) => void;
  isLoading: boolean | undefined;
  onSelectCompany: (id: number) => void;
}

export const SearchBar = ({
  keyword,
  onChangeKeyword,
  companies,
  isLoading,
  onSelectCompany,
}: SearchBarProps) => {
  const navigate = useNavigate();
  const [isSearchBarOn, setIsSearchBarOn] = useState(false);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative">
        {/* 검색창 */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </span>
          <input
            className={`w-full bg-gray-50 border border-gray-100 p-3 pr-10 pl-10 text-gray-700 placeholder-gray-400 shadow-sm transition-all
              ${isSearchBarOn ? "rounded-2xl rounded-b-none" : "rounded-2xl"}`}
            value={keyword}
            onChange={(e) => {
              if (e.target.value !== "") {
                onChangeKeyword(e.target.value);
                setIsSearchBarOn(true);
              } else {
                onChangeKeyword(e.target.value);
                setIsSearchBarOn(false);
                onSelectCompany(0);
              }
            }}
            placeholder="기업명을 입력하세요"
          />
          {keyword && (
            <button
              onClick={() => {
                onChangeKeyword("");
                setIsSearchBarOn(false);
                onSelectCompany(0);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* 검색 결과 드롭다운 */}
        {isSearchBarOn && (
          <div
            className={`absolute z-10 bg-white w-full overflow-hidden shadow-md 
              border border-gray-100 border-t-0 rounded-2xl rounded-t-none
              ${keyword ? "" : "hidden"}`}
          >
            {keyword && (
              <>
                {companies && companies.length > 0 ? (
                  <div className="p-2">
                    {companies.map((company) => (
                      <div
                        onClick={() => {
                          onSelectCompany(company.companyId);
                          onChangeKeyword(company.companyName);
                          setIsSearchBarOn(false);
                        }}
                        key={company.companyName}
                        className="p-3 transition-all ease-in-out hover:bg-gray-50 rounded-xl flex items-center mb-1 cursor-pointer"
                      >
                        <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800">
                          {company.companyName}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : isLoading ? (
                  <div className="p-5 text-gray-500 text-center">
                    <div className="animate-pulse flex justify-center mb-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    </div>
                    로딩중...
                  </div>
                ) : (
                  <div className="p-5 text-gray-500 text-center">
                    <svg
                      className="w-6 h-6 mx-auto mb-2 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    검색 결과가 없습니다
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
