import { useState, useEffect, useRef } from "react";
import { GongsiData } from "../services/gongsiService";
import { useNavigate } from "react-router-dom";

interface NewsSliderProps {
  GongsiData: GongsiData | undefined;
}

export default function NewsSlider({ GongsiData }: NewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const length = GongsiData?.gongsiList?.length || 1;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  // 터치 관련 상태
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const navigate = useNavigate();

  // 애니메이션 스타일 정의
  const animations = {
    slideInRight: {
      animation:
        "slide-in-right 500ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
    },
    slideInLeft: {
      animation:
        "slide-in-left 500ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
    },
    slideOutLeft: {
      animation:
        "slide-out-left 500ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
    },
    slideOutRight: {
      animation:
        "slide-out-right 500ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
    },
  };

  // 스타일 요소 생성 및 주입
  useEffect(() => {
    // 이미 존재하는 스타일 태그가 있는지 확인
    const existingStyle = document.getElementById("slider-animations");
    if (existingStyle) return;

    const styleTag = document.createElement("style");
    styleTag.id = "slider-animations";
    styleTag.innerHTML = `
      @keyframes slide-in-right {
        from {
          transform: translateX(100%);
          opacity: 0.5;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slide-in-left {
        from {
          transform: translateX(-100%);
          opacity: 0.5;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slide-out-left {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(-100%);
          opacity: 0;
        }
      }
      
      @keyframes slide-out-right {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleTag);

    // 컴포넌트 언마운트 시 스타일 태그 제거
    return () => {
      const styleElement = document.getElementById("slider-animations");
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      goToSlide((currentIndex + 1) % length, "right");
    }, 5000);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  useEffect(() => {
    if (GongsiData?.gongsiListSize !== 0 && !isTouching && !isAnimating) {
      startInterval();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    length,
    GongsiData?.gongsiListSize,
    isTouching,
    isAnimating,
    currentIndex,
  ]);

  // 슬라이드 전환 함수
  const goToSlide = (index: number, slideDirection: "left" | "right") => {
    if (isAnimating || index === currentIndex) return;

    setPrevIndex(currentIndex);
    setCurrentIndex(index);
    setDirection(slideDirection);
    setIsAnimating(true);

    // 애니메이션 종료 후 상태 리셋
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 600);
  };

  // 수동으로 슬라이드 변경
  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isAnimating) return;

    const newIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;
    goToSlide(newIndex, "left");
    resetInterval();
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isAnimating) return;

    const newIndex = (currentIndex + 1) % length;
    goToSlide(newIndex, "right");
    resetInterval();
  };

  const setIndicator = (index: number) => {
    if (isAnimating) return;

    const slideDirection = index > currentIndex ? "right" : "left";
    goToSlide(index, slideDirection);
    resetInterval();
  };

  // 네이티브 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
    setIsTouching(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsTouching(false);

    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 50; // 스와이프로 감지할 최소 거리 (픽셀)

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // 왼쪽으로 스와이프 -> 다음 슬라이드
          nextSlide();
        } else {
          // 오른쪽으로 스와이프 -> 이전 슬라이드
          prevSlide();
        }
      }
    }

    // 터치 상태 초기화
    touchStartX.current = null;
    touchEndX.current = null;

    // 타이머 재시작
    resetInterval();
  };

  const routeDetailPage = (id: number | undefined) => {
    if (isAnimating || isTouching) return;
    navigate(`/detail/${id}`);
  };

  // 빈 데이터 처리
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

  // 슬라이드 카드 렌더링 함수
  const renderSlide = (
    index: number,
    zIndex: number,
    animationType: string = "",
  ) => {
    // 기본 스타일
    const baseStyle = {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex,
      cursor: "pointer",
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      padding: "1.5rem",
      transition:
        "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
    };

    // 애니메이션 타입에 따라 스타일 추가
    const animationStyle = animationType
      ? { ...animations[animationType as keyof typeof animations] }
      : {};

    // 최종 스타일 병합
    const finalStyle = { ...baseStyle, ...animationStyle };

    return (
      <div
        key={`slide-${index}`}
        onClick={() => routeDetailPage(GongsiData?.gongsiList[index].gongsiId)}
        style={finalStyle}
      >
        <div className="mb-2">
          <p className="text-sm text-gray-500 font-medium">
            {GongsiData?.gongsiList[index].companyName}
          </p>
        </div>
        <h2 className="text-xl font-bold mb-3 line-clamp-2">
          {GongsiData?.gongsiList[index].gongsiTitle}
        </h2>
        <div className="mt-2 text-sm line-clamp-4 text-gray-600">
          {GongsiData?.gongsiList[index].content ||
            "주요 내용은 상세 페이지에서 확인해주세요."}
        </div>
        <div className="mt-4 text-xs text-gray-400">
          {GongsiData?.gongsiList[index].publishedDatetime?.toString()}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="relative h-72"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 현재 슬라이드 */}
        {renderSlide(
          currentIndex,
          30,
          isAnimating
            ? direction === "right"
              ? "slideInRight"
              : "slideInLeft"
            : "",
        )}

        {/* 이전 슬라이드 (애니메이션 중일 때만 표시) */}
        {isAnimating &&
          renderSlide(
            prevIndex,
            20,
            direction === "right" ? "slideOutLeft" : "slideOutRight",
          )}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center shadow-lg opacity-80 hover:opacity-100 hover:bg-white transition-all duration-200 z-40"
          aria-label="이전 슬라이드"
        >
          <svg
            className="w-5 h-5 text-gray-800"
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
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center shadow-lg opacity-80 hover:opacity-100 hover:bg-white transition-all duration-200 z-40"
          aria-label="다음 슬라이드"
        >
          <svg
            className="w-5 h-5 text-gray-800"
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

      {/* 인디케이터 */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-40">
        {GongsiData?.gongsiList.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndicator(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-gray-300 w-1.5 opacity-60 hover:opacity-90"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
