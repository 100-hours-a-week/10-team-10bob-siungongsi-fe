import { useState, useEffect } from "react";

const articles = [
  {
    title: "삼성 모든 계열사- SEN 채용하기로",
    company: "삼성전자",
    date: "25.02.25. 16:04",
    content: [
      "매출: 74조 원 (전년 동기 대비 5% 증가)",
      "영업이익: 12조 원 (반도체 시장 회복 영향)",
      "주요 사업 부문:",
      "반도체: DRAM 및 NAND 플래시 수요 증가로 실적 개선",
      "스마트폰: 갤럭시 S 시리즈 및 폴더블폰 판매 호조",
      "디스플레이: OLED 패널 수요 증가",
    ],
  },
  {
    title: "애플, 새로운 M4 칩 발표",
    company: "Apple",
    date: "25.02.26. 10:30",
    content: [
      "매출: 90조 원 (전년 대비 8% 증가)",
      "영업이익: 15조 원",
      "주요 사업 부문:",
      "반도체: M4 칩 성능 향상",
      "스마트폰: 아이폰 16 출시",
      "디스플레이: 미니 LED 탑재",
    ],
  },
  {
    title: "테슬라, 새로운 전기차 공개",
    company: "Tesla",
    date: "25.02.27. 14:00",
    content: [
      "매출: 60조 원 (전년 대비 6% 증가)",
      "영업이익: 9조 원",
      "주요 사업 부문:",
      "전기차: 모델 Y 업그레이드",
      "배터리: 새로운 배터리 기술 공개",
    ],
  },
];

export default function NewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 수동으로 슬라이드 변경
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };
  const setIndicator = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div className="relative max-w-[400px] h-[262px] overflow-y-hidden text-ellipsis mx-auto p-8 border rounded-lg shadow-lg">
        {/* 기사 내용 */}
        <h2 className="text-lg font-bold mb-1">
          {articles[currentIndex].title}
        </h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">
            {articles[currentIndex].company}
          </p>
          <p className="text-xs text-gray-400">{articles[currentIndex].date}</p>
        </div>
        <ul className="mt-2 text-sm line-clamp-7">
          {articles[currentIndex].content.map((line, index) => (
            <li key={index}>• {line}</li>
          ))}
        </ul>

        <svg
          className="w-6 h-6 text-gray-800/10 dark:text-white absolute left-2 top-1/2 transform -translate-y-1/2 p-1 cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          onClick={prevSlide}
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
          />
        </svg>
        <svg
          className="w-6 h-6 text-gray-800/10 dark:text-white absolute right-2 top-1/2 transform -translate-y-1/2 p-1 cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          onClick={nextSlide}
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
          />
        </svg>

        {/* 인디케이터 (점) */}
      </div>
      <div className="flex justify-center mt-8">
        {articles.map((_, index) => (
          <span
            key={index}
            onClick={() => setIndicator(index)}
            className={`w-2 h-2 mx-2 rounded-full cursor-pointer drop-shadow-lg ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
