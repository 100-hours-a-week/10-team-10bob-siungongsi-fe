import React from "react";

import { corpList } from "./dummyCorp";
import DateRangePicker from "../../components/Calendar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Modal } from "../../components/Modal";
import { SearchBar } from "../../components/SearchExample";

export const GongsiSearch = () => {
  return (
    <div>
      {/* <SearchBar /> */}
      <DateRangePicker />
      <LoadingSpinner />
      <Modal
        titleMessage="로그인하시겠습니까?"
        submitMessage="로그인"
        helperText="회원탈퇴는 되돌릴 수 없습니다"
      />
    </div>
  );
};
