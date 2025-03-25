import React, { useState } from "react";
import { Company } from "../../services/companiesService";
import { postNotifications } from "../../services/notificationService";
interface SearchBarProps {
  keyword: string;
  companies: Company[] | undefined;
  onChangeKeyword: (value: string) => void;
  isLoading: boolean | undefined;
  onSelectCompany: (company: string) => void;
  isSearchBarOn: boolean;
  isDisabled: boolean;
}

export const SelectBar = ({
  keyword,
  onChangeKeyword,
  companies,
  isLoading,
  onSelectCompany,
  isSearchBarOn,
  isDisabled,
}: SearchBarProps) => {
  const postNotificationCompany = async (companyId: number) => {
    const data = await postNotifications(
      companyId,
      localStorage.getItem("accessToken"),
    );
  };
  return (
    <div>
      <div>
        <input
          className="w-full max-w-[350px] border p-1"
          value={keyword}
          onChange={(e) => onChangeKeyword(e.target.value)}
          disabled={isDisabled}
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
                      onClick={() => postNotificationCompany(company.companyId)}
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
