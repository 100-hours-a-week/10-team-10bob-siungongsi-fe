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
import { toast } from "react-toastify";

export const SelectAlarm = () => {
  //추천기업 목록 불러오기
  const [recommendList, setRecommendList] = useState<
    {
      companyId: number;
      companyName: string;
      subscriberCnt: number;
      isSubscribed: boolean;
    }[]
  >([]);

  const getRecommend = async () => {
    try {
      const data = await fetchRecomendedCompaniesList(
        localStorage.getItem("jwtToken"),
      );

      setRecommendList(data.data.companies);
    } catch (error) {
      console.error("기업 추천 목록 에러 : ", error);
    }
  };
  useEffect(() => {
    getRecommend();
  }, [recommendList]);

  const [isVibrating, setIsVibrating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Companies>();
  const [keyword, setKeyword] = useState<string>("");

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [subscriptions, setSubscriptions] = useState<
    {
      companyId: number;
      companyName: string;
      companyCode: string;
      stockCode: number;
    }[]
  >([]);

  //텍스트 진동
  useEffect(() => {
    if (subscriptions.length >= 10) {
      setIsVibrating(true);
      setIsDisabled(true);
      setTimeout(() => setIsVibrating(false), 300);
    } else {
      setIsDisabled(false);
    }
  }, [subscriptions]);

  //자동완성 불러오기
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getCompaniesName = async () => {
      setIsLoading(true);
      try {
        const response = await fetchCompanyNameList(keyword, signal);
        setCompanies(response.data);
      } catch (error: any) {
        if (error.name !== "CanceledError") {
          console.error("검색자동완성 에러 : ", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (keyword) {
      getCompaniesName();
    }
    return () => {
      controller.abort();
    };
  }, [keyword]);

  //현재 알림받고있는 기업들 불러오기
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
  };

  const postNotificationCompany = async (companyId: number, name: string) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      setIsLoading(true);
      if (!subscriptions.find((sub) => sub.companyId === companyId)) {
        await postNotifications(
          companyId,
          localStorage.getItem("jwtToken"),
          signal,
        );
        setSubscriptions((prev) => [
          ...prev,
          {
            companyId,
            companyName: name, // 필요시 저장된 리스트에서 가져오거나 API 응답 사용
            companyCode: "",
            stockCode: 0,
          },
        ]);
        setRecommendList((prev) =>
          prev.map((item) =>
            item.companyId === companyId
              ? { ...item, isSubscribed: true }
              : item,
          ),
        );
      } else {
        toast.error("중복된 기업입니다");
      }

      // await getSubscriptions();
      // getRecommend();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    return () => {
      controller.abort();
    };
  };

  const deleteNotificationCompany = async (id: number) => {
    setSubscriptions(subscriptions.filter((sub) => sub.companyId !== id));
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      setIsLoading(true);
      await deleteNotifications(id, localStorage.getItem("jwtToken"), signal);
      setRecommendList((prev) =>
        prev.map((item) =>
          item.companyId === id ? { ...item, isSubscribed: false } : item,
        ),
      );
    } catch (error: any) {
      if (error !== "CanceledError") {
        console.error("구독목록 삭제 에러 : ", error);
      }
    } finally {
      setIsLoading(false);
    }
    return () => {
      controller.abort();
    };
  };
  const subscribeHandler = (id: number, isSubscribe: boolean, name: string) => {
    !isSubscribe
      ? postNotificationCompany(id, name)
      : deleteNotificationCompany(id);
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
          <div className="mb-2">알림받고 싶은 기업을 선택해주세요</div>
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
        isDisabled={isDisabled}
      />

      {/* 배지추가되는부분 */}
      <div className="flex my-2 gap-2 flex-wrap mb-4">
        {subscriptions.map((sub, idx) => (
          <Badge
            key={sub.companyId}
            name={sub.companyName}
            id={sub.companyId}
            onDeleteBadge={deleteNotificationCompany}
          />
        ))}
      </div>
      {/* 이런기업은 어떄요 */}
      <div>
        <div className="font-bold">이런 기업은 어때요?</div>
        {recommendList.map((company) => (
          <RecommendList
            key={company.companyId}
            company={company}
            subscribeHandler={subscribeHandler}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};
