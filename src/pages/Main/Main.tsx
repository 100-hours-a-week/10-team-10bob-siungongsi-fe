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

export const Main = () => {
  const [popularGongsiList, setPopularGongsiList] = useState<GongsiData>();
  const [todayGongsi, setTodayGongsi] = useState<GongsiData>();

  const [isNotificationEnabled, setIsNotificationEnabled] = useState<
    boolean | undefined
  >();

  useNotificationToken(localStorage.getItem("jwtToken"), isNotificationEnabled);

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
  useEffect(() => {
    setIsNotificationEnabled(Notification.permission === "granted");
  }, []);
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
  // const twoDaysAgo = new Date();
  // twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const today = formatDate(new Date())?.toString(); // 현재 날짜

  return (
    <div className="min-h-screen">
      <HeaderLogin isLogin={false} />
      <div className="p-2">
        <div className="my-4">
          <SectionTitle>오늘의 핫이슈</SectionTitle>
        </div>
        <section className="flex justify-center mb-12">
          <NewsSlider GongsiData={popularGongsiList} />
        </section>

        <section className="mb-12">
          <div className="flex justify-center gap-2 mb-8">
            <svg
              className="w-6 h-6 text-red-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 19"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z"
              />
            </svg>
            <SectionTitle>오늘 올라온 공시</SectionTitle>
          </div>
          <div className="border-t">
            {length > 0 ? (
              todayGongsi?.gongsiList.map((gongsiTitle) => (
                <GongsiList
                  key={gongsiTitle.gongsiId}
                  gongsiTitle={gongsiTitle.gongsiTitle}
                  gongsiCompany={gongsiTitle.companyName}
                  gongsiId={gongsiTitle.gongsiId}
                />
              ))
            ) : (
              <div className="flex items-center w-full h-[300px] border-b">
                <p className="w-full text-center">
                  오늘 올라온 공시가 없습니다.
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => navigate("/search")}
              className="max-w-fit text-right text-gray-400 text-sm mt-2 cursor-pointer"
            >
              더보기 &gt;&gt;
            </div>
          </div>
        </section>
        <section>
          <SectionTitle>이런 서비스는 어때요?</SectionTitle>
          <article className="flex justify-center m-2 gap-2">
            {!localStorage.getItem("jwtToken") ? (
              <ServiceButton route="/login" imgSrc="./images/enter_1.png">
                로그인하고<br></br>알림받기
              </ServiceButton>
            ) : (
              <ServiceButton
                route="https://dart.fss.or.kr/main.do"
                imgSrc="./images/exit.png"
              >
                DART<br></br>바로가기
              </ServiceButton>
            )}

            <ServiceButton route="/" imgSrc="./images/dictionary_1.png">
              사전<br></br>이용하기<br></br>
            </ServiceButton>
          </article>
        </section>
      </div>
      <BottomNavigation />
    </div>
  );
};
