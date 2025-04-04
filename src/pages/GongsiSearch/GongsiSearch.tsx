import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { SearchBar } from "./SearchBar";
import { PostFilter } from "./PostFilter";

import Calendar from "../../components/Calendar";

import { GongsiPagination } from "./GongsiPagination";
import { BottomNavigation } from "../../components/BottomNavigation";
import { HeaderLogin } from "../../components/HeaderLogin";
import {
  Companies,
  fetchCompanyNameList,
} from "../../services/companiesService";
import { useSearchParams } from "react-router-dom";

export const GongsiSearch = () => {
  const [isCalendarModalOn, setIsCalendarModalOn] = useState<boolean>(false);

  const [companies, setCompanies] = useState<Companies>();
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialStartDate = searchParams.get("startDate") || "";
  const [startDate, setStartDate] = useState<string>(initialStartDate);
  const initialEndDate = searchParams.get("endDate") || "";
  const [endDate, setEndDate] = useState<string>(initialEndDate);
  const initalFilter = searchParams.get("sort") || "latest";
  const [filterMenu, setFilterMenu] = useState<string>(initalFilter);
  const initalSelectedCompany = parseInt(
    searchParams.get("companyId") || "0",
    10,
  );
  const [selectedCompany, setSelectedCompany] = useState<number>(
    initalSelectedCompany,
  );

  // useEffect(() => {
  //   // 🔹 URL 쿼리 파라미터로 현재 페이지 반영
  //   setSearchParams({ sort: filterMenu });
  // }, [filterMenu]);

  useEffect(() => {
    if (!keyword) return;

    const controller = new AbortController(); // ✅ 새 컨트롤러 생성
    const signal = controller.signal;

    const getCompaniesName = async () => {
      setIsLoading(true);
      try {
        const response = await fetchCompanyNameList(keyword, signal);
        setCompanies(response.data);
      } catch (error: any) {
        if (error.name !== "CanceledError") {
          console.error("검색자동완성 에러 : ", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCompaniesName();

    return () => {
      controller.abort(); // ✅ 이전 요청 취소
    };
  }, [keyword]);

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  //달력 관련
  const clearModal = () => {
    setIsCalendarModalOn(false);
  };
  const onSubmitDate = (
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) => {
    setStartDate(formatDate(startDate).toString());
    setEndDate(formatDate(endDate).toString());
    setIsCalendarModalOn(false);
  };
  const clearDate = () => {
    setStartDate("");
    setEndDate("");
    setIsCalendarModalOn(false);
  };

  //필터 상태 변경
  const onChangeFilter = (condition: string) => {
    setFilterMenu(condition);
  };

  //선택된 기업 불러오기
  const onSelectCompany = (id: number) => {
    setSelectedCompany(id);
  };

  const formatDate = (date: Date | undefined) => {
    if (date) {
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(date)
        .replace(/\. /g, "-")
        .replace(".", "");
    } else return "";
  };
  return (
    <div>
      <HeaderLogin isLogin={false} />
      <div className="p-2">
        <div className="mt-4">
          {/* <SearchBar onSelect={() => null} isDisabled={false} /> */}
          <SearchBar
            keyword={keyword}
            onChangeKeyword={onChangeKeyword}
            companies={companies?.companyNameList}
            isLoading={isLoading}
            onSelectCompany={onSelectCompany}
          />
        </div>
        <div className="flex py-2 justify-between items-center border-b">
          <PostFilter filter={filterMenu} onChangeFilter={onChangeFilter} />
          <div className="flex flex-col items-end">
            <div
              className="border border-primary rounded-xl p-1 px-3 text-sm text-primary cursor-pointer"
              onClick={() => setIsCalendarModalOn(!isCalendarModalOn)}
            >
              {startDate ? (
                <div className="flex gap-2 ">
                  {startDate} ~ {endDate}
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
                <div className="flex gap-4">
                  전체 기간
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
              )}
            </div>
          </div>
        </div>
        {/* 공시목록 */}
        <div>
          <GongsiPagination
            filterMenu={filterMenu}
            startDate={startDate}
            endDate={endDate}
            selectedCompany={selectedCompany}
          />
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
      <BottomNavigation />
    </div>
  );
};
