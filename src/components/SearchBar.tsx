import Select from "react-select";
import React from "react";
type Corp = {
  id: number;
  company: string;
  sector: string;
  market_cap: string;
  stock_price: number;
};
type Props = {
  searchList: Corp[];
};

export const SearchBar = ({ searchList }: Props) => {
  return (
    <Select
      options={searchList}
      getOptionLabel={(corp) => `${corp.company} (${corp.sector})`}
      getOptionValue={(corp) => String(corp.id)}
      placeholder="기업 선택"
    ></Select>
  );
};
