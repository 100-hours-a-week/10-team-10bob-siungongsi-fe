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
    <div className="min-h-screen bg-gray-50">
      <HeaderLogin isLogin={false} />

      <div className="p-4">
        {/* 검색 섹션 타이틀 */}
        <div className="mb-4 mt-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            Search
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-4">
            공시 검색
          </h2>

          {/* 검색바 */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <SearchBar
              keyword={keyword}
              onChangeKeyword={onChangeKeyword}
              companies={companies?.companyNameList}
              isLoading={isLoading}
              onSelectCompany={onSelectCompany}
            />
          </div>
        </div>

        {/* 필터 영역 - 애플 스타일로 변경 */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            필터 옵션
          </h3>

          {/* 정렬 필터 - 세로 배치로 변경 */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500 mb-2">정렬 기준</p>
            <PostFilter filter={filterMenu} onChangeFilter={onChangeFilter} />
          </div>

          {/* 기간 선택 필터 - 별도 행으로 분리 */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">기간 설정</p>
            <button
              className="flex items-center w-full justify-between py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors border border-gray-200"
              onClick={() => setIsCalendarModalOn(!isCalendarModalOn)}
            >
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 text-primary mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                {startDate ? (
                  <span>
                    {startDate} ~ {endDate}
                  </span>
                ) : (
                  <span>전체 기간</span>
                )}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* 검색 결과 섹션 - 타이틀 제거 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <GongsiPagination
            filterMenu={filterMenu}
            startDate={startDate}
            endDate={endDate}
            selectedCompany={selectedCompany}
          />
        </div>

        {/* 캘린더 모달 */}
        <div className="flex justify-center">
          {isCalendarModalOn && (
            <Calendar
              initialStartDate={new Date(startDate)}
              initialEndDate={new Date(endDate)}
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
