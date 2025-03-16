import React, { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { motion } from "framer-motion";
import { SectionTitle } from "../../components/SectionTitle";
import { Company, SearchBar } from "../../components/SearchExample";
import { Badge } from "./Badge";
import { corpList } from "../GongsiSearch/dummyCorp";
import { CorpCard } from "./CorpCard";

export const Regist_02 = () => {
  const [isVibrating, setIsVibrating] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [addVibratingTrigger, setAddVibratingTrigger] =
    useState<boolean>(false);
  useEffect(() => {
    if (selectedCompany.length >= 10) {
      console.log(selectedCompany.length);
      setIsVibrating(true);
      setIsDisabled(true);
      setAddVibratingTrigger(true);
      setTimeout(() => setIsVibrating(false), 300);
    } else {
      setIsDisabled(false);
      setAddVibratingTrigger(false);
    }
  }, [selectedCompany]);

  const triggerVibration = () => {
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 300); // 0.3초 후 효과 제거
  };

  const addSelectedCompany = (selected: Company | null) => {
    if (selected) {
      setSelectedCompany([...selectedCompany, selected]);
    }
  };
  const onDeleteBadge = (index: number) => {
    setSelectedCompany(
      selectedCompany.filter(
        (company) => company.id !== selectedCompany[index].id,
      ),
    );
  };
  return (
    <div>
      <Header isLogin={false} />
      <div className="p-2">
        <div className="font-bold text-xl mb-4">알림연결</div>
        <div className={`transition`}>
          {/* 진동텍스트 */}
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
          >
            <div>알림받고 싶은 기업을 선택해주세요</div>
            <div className="text-primary">(10/10)</div>
          </motion.div>
        </div>
        {addVibratingTrigger ? (
          <div onClick={triggerVibration}>
            <SearchBar onSelect={addSelectedCompany} isDisabled={isDisabled} />
          </div>
        ) : (
          <SearchBar onSelect={addSelectedCompany} isDisabled={isDisabled} />
        )}

        {/* 배지추가되는부분 */}
        <div className="flex my-2 gap-2 flex-wrap">
          {selectedCompany.map((company, idx) => (
            <Badge
              key={idx}
              name={company.name}
              index={idx}
              onDeleteBadge={onDeleteBadge}
            />
          ))}
        </div>
        {/* 이런기업은 어떄요 */}
        <div>
          <div>이런 기업은 어때요?</div>
          {corpList.slice(0, 5).map((corp, idx) => (
            <CorpCard key={idx} name={corp.company} />
          ))}
        </div>
      </div>
    </div>
  );
};
