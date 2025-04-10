import { useState, useEffect, useRef } from "react";
import { GongsiData } from "../services/gongsiService";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

interface NewsSliderProps {
  GongsiData: GongsiData | undefined;
}

export default function NewsSlider({ GongsiData }: NewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = GongsiData?.gongsiList?.length || 1;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  const navigate = useNavigate();

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }, 5000);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  useEffect(() => {
    if (GongsiData?.gongsiListSize !== 0 && !isTouching) {
      startInterval();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [length, GongsiData?.gongsiListSize, isTouching]);

  // 수동으로 슬라이드 변경
  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    resetInterval();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    resetInterval();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const setIndicator = (index: number) => {
    resetInterval();
    setCurrentIndex(index);
  };

  // useSwipeable 훅 설정 - onTouchStart/onTouchEnd 속성 제거
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true, // 마우스 드래그도 인식
  });

  // 터치 이벤트를 위한 별도 핸들러
  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  const routeDetailPage = (id: number | undefined) => {
    navigate(`/detail/${id}`);
  };

  if (GongsiData?.gongsiListSize === 0) {
    return (
      <div className="flex flex-col justify-center items-center max-w-full h-64 mx-auto text-center p-6">
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
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <p className="text-gray-500 font-medium">오늘 올라온 공시가 없습니다</p>
        <p className="text-gray-400 text-sm mt-1">나중에 다시 확인해주세요</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative">
        <div
          onClick={() =>
            routeDetailPage(GongsiData?.gongsiList[currentIndex].gongsiId)
          }
          {...handlers}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-72 p-6 cursor-pointer"
        >
          <div className="mb-2">
            <p className="text-sm text-gray-500 font-medium">
              {GongsiData?.gongsiList[currentIndex].companyName}
            </p>
          </div>
          <h2 className="text-xl font-bold mb-3 line-clamp-2">
            {GongsiData?.gongsiList[currentIndex].gongsiTitle}
          </h2>
          <div className="mt-2 text-sm line-clamp-4 text-gray-600">
            {GongsiData?.gongsiList[currentIndex].content ||
              "주요 내용은 상세 페이지에서 확인해주세요."}
          </div>
          <div className="mt-4 text-xs text-gray-400">
            {GongsiData?.gongsiList[currentIndex].publishedDatetime?.toString()}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md opacity-80 hover:opacity-100 hover:bg-white transition-all duration-200 z-10"
          aria-label="이전 슬라이드"
        >
          <svg
            className="w-4 h-4 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md opacity-80 hover:opacity-100 hover:bg-white transition-all duration-200 z-10"
          aria-label="다음 슬라이드"
        >
          <svg
            className="w-4 h-4 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </button>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {GongsiData?.gongsiList.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndicator(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-gray-300 w-1.5 opacity-60"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
