import React, { useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { Header } from "../../components/Header";
import { motion } from "framer-motion";
import { SectionTitle } from "../../components/SectionTitle";

export const Regist_02 = () => {
  const [isVibrating, setIsVibrating] = useState(false);

  const triggerVibration = () => {
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 300); // 0.3초 후 효과 제거
  };
  return (
    <div>
      <Header isLogin={false} />
      <div className="p-2">
        <div className="font-bold text-xl mb-4">알림연결</div>
        <div className={`transition`}>
          <motion.div
            className="font-bold flex gap-2"
            animate={
              isVibrating
                ? {
                    x: [-2, -2, 2, -2, 2, -2],
                    y: [-2, 2, -2, 2, -2, 0],
                  }
                : {}
            }
            transition={{ duration: 0.2 }}
            onClick={triggerVibration}
          >
            <div>알림받고 싶은 기업을 선택해주세요</div>
            <div className="text-primary">(10/10)</div>
          </motion.div>
        </div>
        <SearchBar />
        <div className="max-h-[100px]">나중에 배지 여기 넣을겁니다.</div>
        {/* 이런기업은 어떄요 */}
        <div>
          <div>이런 기업은 어때요?</div>
        </div>
      </div>
    </div>
  );
};
