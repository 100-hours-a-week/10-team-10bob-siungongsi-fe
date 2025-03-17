import React, { useState } from "react";

import { Header } from "../../components/Header";
import { SearchBar } from "./SearchExample";
import { PostFilter } from "../../components/PostFilter";
import DateRangePicker from "../../components/Calendar";

export const GongsiSearch = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isCalendarModalOn, setIsCalendarModalOn] = useState<boolean>(false);

  return (
    <div>
      <Header isLogin={true} />
      <SearchBar onSelect={() => null} isDisabled={false} />
      <div className="flex p-2 justify-between">
        <PostFilter />
        <div onClick={() => setIsCalendarModalOn(!isCalendarModalOn)}>
          캘린더버튼
        </div>
        <div>{isCalendarModalOn && <DateRangePicker />}</div>
      </div>
    </div>
  );
};
