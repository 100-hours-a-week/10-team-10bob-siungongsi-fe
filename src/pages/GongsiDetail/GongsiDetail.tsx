import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { HeaderLoginBack } from "../../components/HeaderLoginBack";
import { BottomNavigation } from "../../components/BottomNavigation";
import { Modal } from "../../components/Modal";
import { useParams } from "react-router-dom";
import { GongsiInfo, fetchGongsiDetail } from "../../services/gongsiService";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { fetchSusbscriptions } from "../../services/usersService";
import {
  deleteNotifications,
  postNotifications,
} from "../../services/notificationService";
import { PushNotification } from "../../components/PushNotification";

export const GongsiDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gongsiInfo, setGongsiInfo] = useState<GongsiInfo>();
  const [mySubscriptions, setMySubscriptions] = useState<
    {
      companyId: number;
      companyName: string;
      companyCode: string;
      stockCode: number;
    }[]
  >([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  // useEffect(() => {
  //   const subscriptions = async () => {
  //     const data = await fetchSusbscriptions(localStorage.getItem('jwtToken'));
  //     setMySubscriptions(data.data.subscribedCompanies);
  //   };
  //   if (localStorage.getItem('jwtToken')) {
  //     subscriptions();
  //   }
  // }, []);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const getCompaniesName = async () => {
      try {
        if (localStorage.getItem("jwtToken")) {
          const data = await fetchGongsiDetail(
            Number(id),
            localStorage.getItem("jwtToken"),
          );
          setGongsiInfo(data.data);
          console.log(data.data);
        } else {
          const data = await fetchGongsiDetail(Number(id), null);
          setGongsiInfo(data.data);
          console.log(data.data);
        }
      } catch (error) {
        console.error("공시 상세보기 에러 : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCompaniesName();
  }, []);

  // const checkSubscribe = () => {
  //   mySubscriptions.find((sub) => sub.companyId === gongsiInfo?.company.id)
  //     ? setIsSubscribed(true)
  //     : setIsSubscribed(false);
  // };
  // useEffect(() => {
  //   checkSubscribe();
  // }, []);
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState({
    titleMessage: "",
    submitMessage: "",
    helperText: null as string | null,
  });
  const onModal = (
    titleMessage: string,
    submitMessage: string,
    helperText: string | null,
  ) => {
    setModalContent({
      titleMessage: titleMessage,
      submitMessage: submitMessage,
      helperText: helperText,
    });
    setIsModalOn(true);
  };
  const closeModal = () => {
    setIsModalOn(false);
  };
  const handleSubscribe = async (id: number | undefined) => {
    if (!id || !gongsiInfo) return;
    try {
      if (gongsiInfo?.company.isSubscribed) {
        await deleteNotifications(id, localStorage.getItem("jwtToken"));
      } else {
        await postNotifications(id, localStorage.getItem("jwtToken"));
      }
      setGongsiInfo({
        ...gongsiInfo,
        company: {
          ...gongsiInfo.company,
          isSubscribed: !gongsiInfo.company.isSubscribed,
        },
      });
    } catch (error) {}
  };

  return (
    <div>
      <HeaderLoginBack isLogin={false} />
      {!isLoading ? (
        <div>
          <div className="p-2">
            <div className="my-4 text-2xl font-bold">
              {gongsiInfo?.gongsi.title}
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div>{gongsiInfo?.company.name}</div>
                  <div
                    className={`${gongsiInfo?.company.prdyCtr.toString().charAt(0) === "-" ? "bg-blue-700" : "bg-primary"} text-sm font-bold text-white px-1 rounded-xl`}
                  >
                    {gongsiInfo?.company.prdyCtr + "%"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-gray-500">{gongsiInfo?.gongsi.date}</div>
                  <div className="text-gray-500">
                    {"조회 " + gongsiInfo?.gongsi.viewCount}
                  </div>
                </div>
              </div>
              <div
                onClick={() =>
                  !localStorage.getItem("jwtToken")
                    ? onModal("로그인이 필요한 서비스입니다", "로그인", null)
                    : handleSubscribe(gongsiInfo?.company.id)
                }
                className={`border border-primary text-primary rounded-xl p-1 px-4 cursor-pointer ${gongsiInfo?.company.isSubscribed && "bg-primary text-white"}`}
              >
                알림
              </div>
            </div>
            <div style={{ whiteSpace: "pre-line" }} className="mb-4">
              {gongsiInfo?.gongsi.content}
            </div>
            <div className="text-sm text-gray-400 font-extrabold">
              <div className="">⚠️공시 요약 서비스 유의사항⚠️</div>
              <div>
                본 서비스는 AI를 활용하여 공시 문서를 요약해 정보를 제공합니다.
              </div>
              <div>
                투자와 같은 중요한 결정을 하실 때는 반드시 원본 문서를
                확인하시기 바랍니다.
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href={`${gongsiInfo?.gongsi.originalUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border p-4 m-4 mx-8 bg-primary text-center text-white rounded-xl transition ease-in-out hover:bg-white hover:text-primary hover:border-primary active:bg-white active:text-primary"
            >
              원본 보러 가기
            </a>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
      {isModalOn && (
        <Modal
          titleMessage={modalContent.titleMessage}
          submitMessage={modalContent.submitMessage}
          helperText={modalContent.helperText}
          closeModal={closeModal}
        />
      )}
      <BottomNavigation />
    </div>
  );
};
