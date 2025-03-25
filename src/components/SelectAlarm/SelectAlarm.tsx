import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Companies,
  fetchCompanyNameList,
} from "../../services/companiesService";
import { SelectBar } from "./SelectBar";
import { Badge } from "./Badge";
import { RecommendList } from "./RecommendList";
import { fetchRecomendedCompaniesList } from "../../services/notificationService";

export const SelectAlarm = () => {
  const [recommendList, setRecommendList] = useState<
    {
      companyId: number;
      companyName: string;
      subscriberCnt: number;
      isSubscribed: boolean;
    }[]
  >([]);
  useEffect(() => {
    const getRecommend = async () => {
      try {
        const data = await fetchRecomendedCompaniesList(
          localStorage.getItem("accessToken"),
        );
        console.log(data.data.companies);
        setRecommendList(data.data.companies);
      } catch (error) {
        console.error("기업 추천 목록 에러 : ", error);
      }
    };
    getRecommend();
  }, []);
  const [isVibrating, setIsVibrating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Companies>();
  const [keyword, setKeyword] = useState<string>("");
  const [isSearchBarOn, setIsSearchBarOn] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
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
  useEffect(() => {
    const getCompaniesName = async () => {
      setIsLoading(true);
      try {
        const response = await fetchCompanyNameList(keyword);
        setCompanies(response.data);
        setIsLoading(true);
      } catch (error) {
        console.error("검색자동완성 에러 : ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCompaniesName();
  }, [keyword]);

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
    setIsSearchBarOn(true);
  };

  const onSelectCompany = (company: string) => {
    setSelectedCompany((prev) => [...new Set([...prev, company])]);

    setIsSearchBarOn(false);
    setKeyword("");
  };
  const onDeleteBadge = (index: number) => {
    setSelectedCompany(
      selectedCompany.filter((company) => company !== selectedCompany[index]),
    );
  };
  return (
    <div>
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
          <div className={`${selectedCompany.length >= 10 && "text-primary"}`}>
            ({selectedCompany.length}/10)
          </div>
        </motion.div>
      </div>
      <SelectBar
        keyword={keyword}
        companies={companies?.companyNameList}
        onChangeKeyword={onChangeKeyword}
        isLoading={isLoading}
        onSelectCompany={onSelectCompany}
        isSearchBarOn={isSearchBarOn}
        isDisabled={isDisabled}
      />

      {/* 배지추가되는부분 */}
      <div className="flex my-2 gap-2 flex-wrap">
        {selectedCompany.map((company, idx) => (
          <Badge
            key={idx}
            name={company}
            index={idx}
            onDeleteBadge={onDeleteBadge}
          />
        ))}
      </div>
      {/* 이런기업은 어떄요 */}
      <div>
        <div>이런 기업은 어때요?</div>
        {recommendList.map((company) => (
          <RecommendList company={company} />
        ))}
      </div>
    </div>
  );
};
