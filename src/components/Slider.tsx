import { useState, useEffect } from "react";
import { GongsiData } from "../services/gongsiService";

interface NewsSliderProps {
  GongsiData: GongsiData | undefined;
}
export default function NewsSlider({ GongsiData }: NewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = GongsiData?.gongsiList?.length || 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }, 5000);

    return () => clearInterval(interval);
  }, [GongsiData]);

  // 수동으로 슬라이드 변경
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };
  const setIndicator = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div className="relative max-w-[400px] h-[262px] overflow-y-hidden text-ellipsis mx-auto p-8 border rounded-lg shadow-lg">
        {/* 기사 내용 */}
        <h2 className="text-lg font-bold mb-1">
          {GongsiData?.gongsiList[currentIndex].gongsiTitle}
        </h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">
            {GongsiData?.gongsiList[currentIndex].companyName}
          </p>
          <p className="text-xs text-gray-400">
            {GongsiData?.gongsiList[currentIndex].publishedDatetime.toString()}
          </p>
        </div>
        <div className="mt-2 text-sm line-clamp-7">
          {GongsiData?.gongsiList[currentIndex].content}
        </div>

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
        {GongsiData?.gongsiList.map((_, index) => (
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
