import { useState, useEffect } from "react";
import { GongsiData } from "../services/gongsiService";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface NewsSliderProps {
  GongsiData: GongsiData | undefined;
}
export default function NewsSlider({ GongsiData }: NewsSliderProps) {
  const variants = {
    enter: (direction: number) => ({
      y: -30,
      x: direction > 0 ? 400 : -400,
      opacity: 0,
    }),
    center: {
      x: -33,
      y: -30,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -400 : 400,
      y: -30,
      opacity: 0,
    }),
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirections] = useState(0);
  const length = GongsiData?.gongsiList?.length || 1;
  const navigate = useNavigate();
  const handleDragEnd = (_: any, info: any) => {
    const swipePower = info.offset.x;

    if (swipePower < -100 && currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1); // 오른쪽으로 넘김
    } else if (swipePower > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // 왼쪽으로 넘김
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, length]);

  // 수동으로 슬라이드 변경
  const prevSlide = () => {
    setDirections(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setDirections(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };
  const setIndicator = (index: number) => {
    setCurrentIndex(index);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true, // 마우스 드래그도 인식
  });
  const routeDetailPage = (id: number | undefined) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div className="relative w-full mx-auto">
      {GongsiData?.gongsiListSize !== 0 ? (
        <div
          onClick={() =>
            routeDetailPage(GongsiData?.gongsiList[currentIndex].gongsiId)
          }
          {...handlers}
          className="relative max-w-[400px] h-[262px] overflow-y-hidden text-ellipsis mx-auto p-8 border rounded-lg shadow-lg cursor-pointer"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              custom={direction}
              variants={variants}
              onDragEnd={handleDragEnd}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute p-8 flex flex-col justify-center w-full h-full"
            >
              {/* 기사 내용 */}
              <h2 className="text-lg font-bold mb-1 line-clamp-1">
                {GongsiData?.gongsiList[currentIndex].gongsiTitle}
              </h2>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">
                  {GongsiData?.gongsiList[currentIndex].companyName}
                </p>
                <p className="text-xs text-gray-400">
                  {GongsiData?.gongsiList[
                    currentIndex
                  ].publishedDatetime.toString()}
                </p>
              </div>
              <div className="mt-2 text-sm line-clamp-6">
                {GongsiData?.gongsiList[currentIndex].content}
              </div>
            </motion.div>
          </AnimatePresence>

          <svg
            className="w-6 h-6 text-gray-800/10 dark:text-white absolute left-2 top-1/2 transform -translate-y-1/2 p-1 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
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
          <svg
            className="w-6 h-6 text-gray-800/10 dark:text-white absolute right-2 top-1/2 transform -translate-y-1/2 p-1 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
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
        </div>
      ) : (
        <div className="flex justify-center items-center max-w-[400px] h-[262px] overflow-y-hidden mx-auto p-8 border rounded-lg shadow-lg text-center align-middle">
          오늘 올라온 공시가 없습니다
        </div>
      )}
      {/* 인디케이터 (점) */}
      <div className="flex justify-center mt-8">
        {GongsiData?.gongsiListSize !== 0 ? (
          GongsiData?.gongsiList.map((_, index) => (
            <span
              key={index}
              onClick={() => setIndicator(index)}
              className={`w-2 h-2 mx-2 rounded-full cursor-pointer drop-shadow-lg ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
            ></span>
          ))
        ) : (
          <span
            className={`w-2 h-2 mx-2 rounded-full cursor-pointer drop-shadow-lg bg-primary`}
          ></span>
        )}
      </div>
    </div>
  );
}
