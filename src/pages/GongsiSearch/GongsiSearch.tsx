import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Header } from "../../components/Header";
import { SearchBar } from "./SearchExample";
import { PostFilter } from "../../components/PostFilter";
import DatePicker from "react-datepicker";
import Calendar from "../../components/Calendar";
import { gongsiTitleList } from "../Main/dummyTitle";
import { GongsiList } from "../../components/GongsiList";
import { GongsiPagination } from "./GongsiPagination";

export const GongsiSearch = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isCalendarModalOn, setIsCalendarModalOn] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const clearModal = () => {
    setIsCalendarModalOn(false);
  };
  const onSubmitDate = (startDate: Date | null, endDate: Date | null) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setIsCalendarModalOn(false);
  };
  const clearDate = () => {
    setStartDate(null);
    setEndDate(null);
    setIsCalendarModalOn(false);
  };

  const formatDate = (date: Date | null) => {
    if (date) {
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(date)
        .replace(/\. /g, "-")
        .replace(".", "");
    }
  };
  return (
    <div>
      <Header isLogin={true} />
      <SearchBar onSelect={() => null} isDisabled={false} />
      <div className="flex p-2 justify-between items-center">
        <PostFilter />
        <div className="flex flex-col items-end">
          <div
            className="border border-primary rounded-xl p-1 text-sm text-primary cursor-pointer"
            onClick={() => setIsCalendarModalOn(!isCalendarModalOn)}
          >
            {startDate ? (
              <div className="flex gap-2 ">
                {formatDate(startDate)} ~ {formatDate(endDate)}
                <svg
                  className="w-4 text-primary dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
              </div>
            ) : (
              "전체조회"
            )}
          </div>
        </div>
      </div>
      {/* 공시목록 */}
      <div>
        <GongsiPagination />
      </div>
      <div className="flex justify-center">
        {isCalendarModalOn && (
          <Calendar
            onSubmitDate={onSubmitDate}
            clearDate={clearDate}
            clearModal={clearModal}
          />
        )}
      </div>
    </div>
  );
};
