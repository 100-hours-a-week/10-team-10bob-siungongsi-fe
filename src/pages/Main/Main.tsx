import React from "react";
import { Header } from "../../components/Header";

import { SectionTitle } from "../../components/SectionTitle";
import NewsSlider from "../../components/Slider";
import { gongsiTitleList } from "./dummyTitle";
import { BottomNavigation } from "../../components/BottomNavigation";
import { LoginSlider } from "../../components/LoginSlider";

export const Main = () => {
  function getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString();
  }
  return (
    <div>
      <Header></Header>

      <div className="my-4">
        <SectionTitle>오늘의 핫이슈</SectionTitle>
      </div>
      <section className="mb-12">
        <NewsSlider />
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z"
            />
          </svg>
          <SectionTitle>오늘 올라온 공시</SectionTitle>
        </div>
        {gongsiTitleList.length > 0 ? (
          gongsiTitleList.map((gongsiTitle) => (
            <div
              key={gongsiTitle.id}
              className="flex max-h-[70px] flex-col gap-2 border-t border-b p-2"
            >
              <div className="w-full text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {gongsiTitle.title}
              </div>
              <div className="w-full text-sm overflow-hidden text-ellipsis text-gray-400 whitespace-nowrap">
                {gongsiTitle.company}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center w-full h-[300px] border-t border-b">
            <p className="w-full text-center">오늘 올라온 공시가 없습니다.</p>
          </div>
        )}

        <div className="text-right text-gray-400 text-sm mt-2 cursor-pointer">
          더보기 &gt;&gt;
        </div>
      </section>
      <section>
        <SectionTitle>이런 서비스는 어때요?</SectionTitle>
        <article className="flex m-2">
          <div className="w-[50%] border">로그인 하고 알림받기</div>
          <div className="w-[50%] border">사전 이용하기 </div>
        </article>
      </section>
      <div>
        <BottomNavigation />
      </div>
      <div></div>
    </div>
  );
};
