import React, { useState } from "react";
import Select from "react-select";

export type Company = {
  id: number;
  name: string;
  filter: string[];
};

const companyList: Company[] = [
  { id: 1, name: "삼성전자", filter: ["ㅅ", "사"] },
  { id: 2, name: "삼성물산", filter: ["ㅅ", "사"] },
  { id: 3, name: "LG전자", filter: ["ㅈ", "저"] },
  { id: 4, name: "현대자동차", filter: ["ㅎ", "혀"] },
  { id: 5, name: "네이버", filter: ["ㄴ", "네"] },
];
type SearchBarProps = {
  onSelect: (selected: Company | null) => void | null;
  isDisabled: boolean;
};

// 🔹 사용자 입력값을 기준으로 필터링 규칙을 정의
const customFilter = (option: any, inputValue: string) => {
  if (!inputValue) return true; // 입력이 없으면 모든 항목 표시

  const name = option.label.toLowerCase(); // 옵션(회사 이름)을 소문자로 변환
  const input = inputValue.toLowerCase(); // 입력값을 소문자로 변환

  return (
    name.includes(input) || // 회사 이름 포함 여부 검사
    option.data.filter.some((keyword: string) => keyword.includes(input)) // filter 배열 내 포함 여부 검사
  );
};

export const SearchBar = ({ onSelect, isDisabled }: SearchBarProps) => {
  return (
    <Select
      options={companyList.map((c) => ({
        value: c.id,
        label: c.name,
        filter: c.filter,
      }))}
      onChange={(selected) =>
        onSelect(
          selected
            ? companyList.find((c) => c.id === selected.value) || null
            : null,
        )
      }
      placeholder="기업을 검색하세요"
      filterOption={customFilter} // 🔥 커스텀 필터링 적용
      isDisabled={isDisabled}
    />
  );
};
