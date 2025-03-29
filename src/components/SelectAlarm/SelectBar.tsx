import React, { useState } from "react";
import { Company } from "../../services/companiesService";
import { postNotifications } from "../../services/notificationService";
interface SearchBarProps {
  keyword: string;
  companies: Company[] | undefined;
  onChangeKeyword: (value: string) => void;
  isLoading: boolean | undefined;
  onSelectCompany: (companyId: number, name: string) => void;
  isSearchBarOn: boolean;
  isDisabled: boolean;
  clearSearchBar: () => void;
}

export const SelectBar = ({
  keyword,
  onChangeKeyword,
  companies,
  isLoading,
  onSelectCompany,
  isSearchBarOn,
  isDisabled,
  clearSearchBar,
}: SearchBarProps) => {
  return (
    <div>
      <div>
        <input
          className="w-full max-w-[350px] border p-1 placeholder-gray-400"
          value={keyword}
          onChange={(e) => onChangeKeyword(e.target.value)}
          disabled={isDisabled}
          placeholder="기업명을 입력하세요"
        ></input>
      </div>
      {isSearchBarOn && (
        <div
          className={`absolute bg-white w-full max-w-[340px] rounded-br-lg rounded-bl-lg border${keyword ? "" : "hidden"}`}
        >
          {keyword && (
            <>
              {
                companies && companies.length > 0 ? (
                  companies.slice(0, 5).map((company) => (
                    <div
                      onClick={() => {
                        onSelectCompany(company.companyId, company.companyName);
                        clearSearchBar();
                      }}
                      key={company.companyName} // 🔹 key 추가
                      className="p-1 transition ease-in-out hover:bg-gray-100 rounded-br-lg rounded-bl-lg"
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
