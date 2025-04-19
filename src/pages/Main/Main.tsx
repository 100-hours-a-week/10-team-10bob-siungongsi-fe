import { SectionTitle } from "../../components/SectionTitle";
import NewsSlider from "../../components/Slider";

import { BottomNavigation } from "../../components/BottomNavigation";

import { GongsiList } from "../../components/GongsiList";
import { useLocation, useNavigate } from "react-router-dom";

import { HeaderLogin } from "../../components/HeaderLogin";
import { useEffect, useState } from "react";
import { GongsiData, fetchGongsiList } from "../../services/gongsiService";
import { ServiceButton } from "./ServiceButton";
import { useNotificationToken } from "../../hooks/useNotificationToken";
import { LoginSlider } from "../../components/LoginSlider";
// 1. 동적 import
import { lazy, Suspense } from "react";

import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

export const Main = () => {
  const [popularGongsiList, setPopularGongsiList] = useState<GongsiData>();
  const [todayGongsi, setTodayGongsi] = useState<GongsiData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const onClose = () => {
    setIsOpen(false);
  };

  const [isNotificationEnabled, setIsNotificationEnabled] = useState<
    boolean | undefined
  >();

  // useNotificationToken(localStorage.getItem("jwtToken"), true);

  useEffect(() => {
    try {
      const todayGongsi = async () => {
        const todayGongsiData = await fetchGongsiList(
          undefined,
          "latest",
          true,
          1,
          5,
          today,
          today,
        );
        setTodayGongsi(todayGongsiData.data);
      };
      todayGongsi();
    } catch (error) {
      console.error("오늘의 핫 뉴스 불러오기 에러 : ", error);
    }
  }, []);
  useEffect(() => {
    try {
      const popularGongsi = async () => {
        const popularGongsiData = await fetchGongsiList(
          undefined,
          "views",
          true,
          1,
          5,
          today,
          today,
        );

        setPopularGongsiList(popularGongsiData.data);
      };
      popularGongsi();
    } catch (error) {
      console.error("오늘의 핫 뉴스 불러오기 에러 : ", error);
    }
  }, []);
  // useEffect(() => {
  //   setIsNotificationEnabled(Notification.permission === "granted");
  // }, []);
  const navigate = useNavigate();

  const length = popularGongsiList?.gongsiList?.length || 0;
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

  const getAdjustedToday = () => {
    const now = new Date();
    const day = now.getDay();
    now.setDate(now.getDate() - (day === 6 ? 1 : day === 0 ? 2 : 0)); // 토요일이면 -1일, 일요일이면 -2일

    return now;
  };

  const today = formatDate(getAdjustedToday())?.toString();

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLogin />

      <div className="p-4">
        <div className="mt-3 mb-6">
          <div className="flex items-center mb-2">
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              Today's Spotlight
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            오늘의 핫이슈
          </h2>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <NewsSlider GongsiData={popularGongsiList} />
          </div>
        </div>

        {/* 오늘 올라온 공시 섹션 */}
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                Latest Updates
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                오늘 올라온 공시
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {length > 0 ? (
              <div>
                {todayGongsi?.gongsiList.map((gongsiTitle) => (
                  <GongsiList
                    key={gongsiTitle.gongsiId}
                    gongsiTitle={gongsiTitle.gongsiTitle}
                    gongsiCompany={gongsiTitle.companyName}
                    gongsiId={gongsiTitle.gongsiId}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full py-16">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-center text-gray-500 font-medium">
                  오늘 올라온 공시가 없습니다
                </p>
                <p className="text-center text-gray-400 text-sm mt-1">
                  나중에 다시 확인해주세요
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-5">
            <button
              onClick={() => navigate("/search")}
              className="flex items-center px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all"
            >
              더 많은 공시 보기
              <svg
                className="w-4 h-4 ml-1.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* 이런 서비스는 어때요? 섹션 - 애플 스타일로 변경 */}
        <section className="mb-8">
          <div className="mb-4">
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              Recommended For You
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              이런 서비스는 어때요?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {!isLoggedIn ? (
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-sm p-5 text-white">
                <div className="mb-4">
                  <img
                    src="./images/enter_1.png"
                    alt="로그인"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">로그인하고</h3>
                <p className="text-sm font-medium opacity-90">
                  알림을 놓치지 마세요
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="mt-4 px-3 py-1.5 bg-white text-blue-600 text-sm font-medium rounded-full"
                >
                  시작하기
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-sm p-5 text-white">
                <div className="mb-4">
                  <img
                    src="./images/exit.png"
                    alt="DART"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">DART</h3>
                <p className="text-sm font-medium opacity-90">
                  공시 정보 바로가기
                </p>
                <a
                  href="https://dart.fss.or.kr/main.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-3 py-1.5 bg-white text-green-600 text-sm font-medium rounded-full"
                >
                  방문하기
                </a>
              </div>
            )}

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-sm p-5 text-white">
              <div className="mb-4">
                <img
                  src="./images/dictionary_1.png"
                  alt="사전"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold mb-1">사전</h3>
              <p className="text-sm font-medium opacity-90">용어 이해하기</p>
              <button
                onClick={() => toast.error("미구현 기능입니다")}
                className="mt-4 px-3 py-1.5 bg-white text-purple-600 text-sm font-medium rounded-full"
              >
                살펴보기
              </button>
            </div>
          </div>
        </section>
      </div>
      {isOpen && <LoginSlider isOpen={isOpen} onClose={onClose} />}
      <BottomNavigation />
    </div>
  );
};
