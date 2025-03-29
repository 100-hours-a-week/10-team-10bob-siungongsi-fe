import React, { useState } from "react";
import { Company } from "../../services/companiesService";
import { postNotifications } from "../../services/notificationService";
interface SearchBarProps {
  keyword: string;
  companies: Company[] | undefined;
  onChangeKeyword: (value: string) => void;
  isLoading: boolean | undefined;
  onSelectCompany: (companyId: number, name: string) => void;

  isDisabled: boolean;
}

export const SelectBar = ({
  keyword,
  onChangeKeyword,
  companies,
  isLoading,
  onSelectCompany,
  isDisabled,
}: SearchBarProps) => {
  const [isSearchBarOn, setIsSearchBarOn] = useState<boolean>(false);
  return (
    <div>
      <div>
        <input
          className={`w-full max-w-[350px] border p-2 placeholder-gray-400 ${isSearchBarOn ? "rounded-tl-lg rounded-tr-lg" : "rounded-lg"}`}
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
          disabled={isDisabled}
          placeholder="기업명을 입력하세요"
        ></input>
      </div>
      {isSearchBarOn && (
        <div
          className={`absolute bg-white w-full max-w-[318px] rounded-br-lg rounded-bl-lg border${keyword ? "" : "hidden"}`}
        >
          {keyword && (
            <>
              {
                companies && companies.length > 0 ? (
                  companies.slice(0, 5).map((company) => (
                    <div
                      onClick={() => {
                        onSelectCompany(company.companyId, company.companyName);
                        onChangeKeyword("");
                        setIsSearchBarOn(false);
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
