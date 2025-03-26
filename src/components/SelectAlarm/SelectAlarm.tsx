import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Companies,
  fetchCompanyNameList,
} from "../../services/companiesService";
import { SelectBar } from "./SelectBar";
import { Badge } from "./Badge";
import { RecommendList } from "./RecommendList";
import {
  deleteNotifications,
  fetchRecomendedCompaniesList,
  postNotifications,
} from "../../services/notificationService";
import { fetchSusbscriptions } from "../../services/usersService";

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
          localStorage.getItem("jwtToken"),
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

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [subscriptions, setSubscriptions] = useState<
    {
      companyId: number;
      companyName: string;
      companyCode: string;
      stockCode: number;
    }[]
  >([]);
  const [addVibratingTrigger, setAddVibratingTrigger] =
    useState<boolean>(false);

  useEffect(() => {
    if (subscriptions.length >= 10) {
      setIsVibrating(true);
      setIsDisabled(true);
      setAddVibratingTrigger(true);
      setTimeout(() => setIsVibrating(false), 300);
    } else {
      setIsDisabled(false);
      setAddVibratingTrigger(false);
    }
  }, [subscriptions]);
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
  const getSubscriptions = async () => {
    try {
      const data = await fetchSusbscriptions(localStorage.getItem("jwtToken"));
      setSubscriptions(data.data.subscribedCompanies);
    } catch (error) {
      console.error("구독목록 불러오기 에러 : ", error);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
    setIsSearchBarOn(true);
  };

  const postNotificationCompany = async (companyId: number) => {
    try {
      const data = await postNotifications(
        companyId,
        localStorage.getItem("jwtToken"),
      );

      await getSubscriptions();
    } catch (error) {
      console.error("구독목록 추가 에러 : ", error);
    }
  };
  const clearSearchBar = () => {
    setIsSearchBarOn(false);
    setKeyword("");
  };

  const deleteNotificationCompany = async (id: number) => {
    setSubscriptions(subscriptions.filter((sub) => sub.companyId !== id));
    await deleteNotifications(id, localStorage.getItem("jwtToken"));
  };
  const onDeleteBadge = async (id: number) => {
    setSubscriptions(subscriptions.filter((sub) => sub.companyId !== id));
    deleteNotificationCompany(id);
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
          <div className={`${subscriptions.length >= 10 && "text-primary"}`}>
            ({subscriptions.length}/10)
          </div>
        </motion.div>
      </div>
      <SelectBar
        keyword={keyword}
        companies={companies?.companyNameList}
        onChangeKeyword={onChangeKeyword}
        isLoading={isLoading}
        onSelectCompany={postNotificationCompany}
        isSearchBarOn={isSearchBarOn}
        isDisabled={isDisabled}
        clearSearchBar={clearSearchBar}
      />

      {/* 배지추가되는부분 */}
      <div className="flex my-2 gap-2 flex-wrap">
        {subscriptions.map((sub, idx) => (
          <Badge
            key={idx}
            name={sub.companyName}
            id={sub.companyId}
            onDeleteBadge={onDeleteBadge}
          />
        ))}
      </div>
      {/* 이런기업은 어떄요 */}
      <div>
        <div>이런 기업은 어때요?</div>
        {recommendList.map((company) => (
          <RecommendList
            company={company}
            postSubscribe={postNotificationCompany}
            deleteSubscribe={deleteNotificationCompany}
          />
        ))}
      </div>
    </div>
  );
};
