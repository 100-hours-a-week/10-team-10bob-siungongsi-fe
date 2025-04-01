import React, { useState } from "react";
import { Company } from "../../services/companiesService";
interface SearchBarProps {
  keyword: string;
  companies: Company[] | undefined;
  onChangeKeyword: (value: string) => void;
  isLoading: boolean | undefined;
  onSelectCompany: (id: number, name: string) => void;
}

export const SearchBar = ({
  keyword,
  onChangeKeyword,
  companies,
  isLoading,
  onSelectCompany,
  // isSearchBarOn,
}: SearchBarProps) => {
  const [isSearchBarOn, setIsSearchBarOn] = useState(false);
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
        className={`w-full max-w-sm border pl-10 pr-10 p-2 placeholder-gray-400 ${isSearchBarOn ? "rounded-tl-lg rounded-tr-lg" : "rounded-lg"}`}
        value={keyword}
        onChange={(e) => {
          if (e.target.value !== "") {
            onChangeKeyword(e.target.value);
            setIsSearchBarOn(true);
          } else {
            onChangeKeyword(e.target.value);
            setIsSearchBarOn(false);
          }
        }}
        placeholder="기업명을 입력하세요"
      ></input>
      {keyword && (
        <button
          onClick={() => onChangeKeyword("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      {isSearchBarOn && (
        <div
          className={`absolute bg-white p-1 w-full max-w-sm mx-auto rounded-br-lg rounded-bl-lg border${keyword ? "" : "hidden"}`}
        >
          {keyword && (
            <>
              {
                companies && companies.length > 0 ? (
                  companies.map((company) => (
                    <div
                      onClick={() => {
                        onSelectCompany(company.companyId, company.companyName);
                        onChangeKeyword(company.companyName);
                        setIsSearchBarOn(false);
                      }}
                      key={company.companyName} // 🔹 key 추가
                      className="w-full max-w-sm p-1 transition ease-in-out hover:bg-gray-100 rounded-br-lg rounded-bl-lg"
                    >
                      {company.companyName}
                    </div>
                  ))
                ) : isLoading ? (
                  <div className="p-1 text-gray-500">로딩중</div>
                ) : (
                  <div className="p-1 text-gray-500">검색 결과가 없습니다</div>
                ) // 🔹 검색 결과 없음 표시
              }
            </>
          )}
        </div>
      )}
    </div>
  );
};
