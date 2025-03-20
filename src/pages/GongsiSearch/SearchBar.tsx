import React from "react";
import { Company } from "../../services/companiesService";
interface SearchBarProps {
  keyword: string;
  companies: Company[] | undefined;
  onChangeKeyword: (value: string) => void;
  isLoading: boolean | null;
}

export const SearchBar = ({
  keyword,
  onChangeKeyword,
  companies,
  isLoading,
}: SearchBarProps) => {
  return (
    <div>
      <input
        className="w-full max-w-[392px] border p-1"
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
      ></input>
      <div className={`rounded-br-lg rounded-bl-lg ${keyword && "border"}`}>
        {keyword && (
          <>
            {
              companies && companies.length > 0 ? (
                companies.map((company) => (
                  <div
                    key={company.companyName} // 🔹 key 추가
                    className="p-1 transition ease-in-out hover:bg-gray-100 rounded-br-lg rounded-bl-lg"
                  >
                    {company.companyName}
                  </div>
                ))
              ) : isLoading ? (
                <div>로딩중</div>
              ) : (
                <div className="p-1 text-gray-500">검색 결과가 없습니다</div>
              ) // 🔹 검색 결과 없음 표시
            }
          </>
        )}
      </div>
    </div>
  );
};
