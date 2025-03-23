import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  subMonths,
  addMonths,
  getDay,
  isSameDay,
  isWithinInterval,
  subDays,
} from "date-fns";
import { ko } from "date-fns/locale";

interface CalendarProps {
  onSubmitDate: (
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) => void;
  clearDate: () => void;
  clearModal: () => void;
}

export const Calendar = ({
  onSubmitDate,
  clearDate,
  clearModal,
}: CalendarProps) => {
  const today = new Date(); // 현재 날짜
  const [currentMonth, setCurrentMonth] = useState(today); // 현재 달력의 월
  const [startDate, setStartDate] = useState<Date | undefined>(today); // 시작 날짜
  const [endDate, setEndDate] = useState<Date | undefined>(undefined); // 종료 날짜

  // 현재 월의 시작과 끝을 구하기
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDay = getDay(monthStart); // 시작 요일 (0: 일요일, 1: 월요일, ... 6: 토요일)
  //   const totalDays = 42; // 7x6 배열로 채우기 (달력의 최대 크기)

  // 📌 달력에 표시할 날짜 배열 생성
  const days = [];

  // 1️⃣ 이전 달 날짜 추가
  const prevMonthEnd = subDays(monthStart, 1); // 이전 달의 마지막 날
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(subDays(prevMonthEnd, i));
  }

  // 2️⃣ 이번 달 날짜 추가
  for (let i = 0; i < monthEnd.getDate(); i++) {
    days.push(addDays(monthStart, i));
  }

  // 3️⃣ 다음 달 날짜 추가 (빈칸이 남으면 다음 달 날짜로 채움)
  //   const nextMonthStart = addDays(monthEnd, 1);
  //   for (let i = days.length; i < totalDays; i++) {
  //     days.push(addDays(nextMonthStart, i - ));
  //   }

  // 📌 날짜 선택 핸들러
  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(undefined);
    } else {
      if (isSameDay(date, startDate)) {
        setEndDate(date);
      } else if (date > startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(undefined);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="w-[350px] bg-white rounded-lg shadow-md p-4 relative">
        {/* 📌 월 변경 */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            {"<"}
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentMonth, "yyyy. MM", { locale: ko })}
          </h2>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            {">"}
          </button>
        </div>

        {/* 📌 요일 표시 */}
        <div className="grid grid-cols-7 text-center font-bold text-gray-600">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* 📌 날짜 표시 */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isToday = isSameDay(day, today);
            const isSelectedStart = startDate && isSameDay(day, startDate);
            const isSelectedEnd = endDate && isSameDay(day, endDate);
            const isInRange =
              startDate &&
              endDate &&
              isWithinInterval(day, { start: startDate, end: endDate });
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

            return (
              <div
                key={index}
                className={`h-10 w-10 flex items-center justify-center rounded-md cursor-pointer
                ${isToday ? "border border-gray-500" : ""}
                ${isSelectedStart || isSelectedEnd ? "bg-gray-500 text-white" : ""}
                ${isInRange ? "bg-red-500 text-white" : ""}
                ${isCurrentMonth ? "text-black" : "text-gray-400"} 
                ${day ? "hover:bg-gray-200" : "opacity-0"}`}
                onClick={() => handleDateClick(day)}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>

        {/* 📌 버튼 */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md"
            onClick={clearDate}
          >
            전체 기간 조회
          </button>
          <div className="space-x-2">
            <button
              onClick={clearModal}
              className="border border-red-500 text-red-500 px-3 py-1 rounded-md"
            >
              취소
            </button>
            <button
              onClick={() => onSubmitDate(startDate, endDate)}
              className="border border-red-500 bg-red-500 text-white px-3 py-1 rounded-md"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
