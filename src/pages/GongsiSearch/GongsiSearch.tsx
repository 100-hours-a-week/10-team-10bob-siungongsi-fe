import React from "react";
import { SearchBar } from "../../components/SearchBar";
import { corpList } from "./dummyCorp";
import DateRangePicker from "../../components/Calendar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Modal } from "../../components/Modal";

export const GongsiSearch = () => {
  return (
    <div>
      <SearchBar searchList={corpList} />
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
