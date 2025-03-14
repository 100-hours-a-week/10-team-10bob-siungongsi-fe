import React, { useState } from "react";
import Select, { components, ControlProps } from "react-select";
import { Search } from "lucide-react"; // 돋보기 아이콘
import { corpList } from "../pages/GongsiSearch/dummyCorp";
type Corp = {
  id: number;
  company: string;
  sector: string;
  market_cap: string;
  stock_price: number;
};

export const SearchBar = () => {
  const CustomControl = ({ children, ...props }: ControlProps) => {
    return (
      <components.Control {...props}>
        <div className="ml-3 text-gray-400">
          <Search size={18} />
        </div>
        {children}
      </components.Control>
    );
  };
  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "#f8f9fa", // 연한 회색 배경
      borderColor: "#d1d5db", // 테두리 색상
      borderRadius: "8px", // 둥근 모서리
      padding: "6px 12px", // 내부 여백
      display: "flex",
      alignItems: "center",
      boxShadow: "none",
      "&:hover": { borderColor: "#b0b3b8" }, // 호버 효과
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#6c757d", // 플레이스홀더 색상
      fontSize: "14px",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#212529",
      fontSize: "14px",
    }),
  };
  return (
    <>
      <div className="relative w-full max-w-md">
        {/* 검색 아이콘 */}

        <Select
          options={corpList}
          getOptionLabel={(corp) => `${corp.company} (${corp.sector})`}
          getOptionValue={(corp) => String(corp.id)}
          placeholder="기업 선택"
          styles={customStyles}
        ></Select>
      </div>
    </>
  );
};
