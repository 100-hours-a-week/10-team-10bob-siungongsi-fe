import React, { useEffect, useState } from "react";

import { HeaderLoginBack } from "../../components/HeaderLoginBack";
import { BottomNavigation } from "../../components/BottomNavigation";
import { Modal } from "../../components/Modal";
import { useParams } from "react-router-dom";
import { GongsiInfo, fetchGongsiDetail } from "../../services/gongsiService";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAuth } from "../../contexts/AuthContext";

import {
  deleteNotifications,
  postNotifications,
} from "../../services/notificationService";
import { LoginSlider } from "../../components/LoginSlider";
import { useManageNotifications } from "../../hooks/useNotificationList";

export const GongsiDetail = () => {
  const { isLoggedIn } = useAuth();
  const { subscribe, unsubscribe } = useManageNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gongsiInfo, setGongsiInfo] = useState<GongsiInfo>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const { id } = useParams();
  //상세정보 조회
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
        } else {
          const data = await fetchGongsiDetail(Number(id), null);
          setGongsiInfo(data.data);
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
    closeModal: () => {},
    onSubmit: () => {},
    isOpen: false,
  });
  const onModal = (
    titleMessage: string,
    submitMessage: string,
    helperText: string | null,
    closeModal: () => void,
    openLoginModal: () => void,
    isOpen: boolean,
  ) => {
    setModalContent({
      titleMessage: titleMessage,
      submitMessage: submitMessage,
      helperText: helperText,
      closeModal: closeModal,
      onSubmit: openLoginModal,
      isOpen: isOpen,
    });
    setIsModalOn(true);
  };
  const closeModal = () => {
    setIsModalOn(false);
  };
  const handleSubscribe = async (id: number | undefined) => {
    if (!id || !gongsiInfo) return;
    try {
      setIsLoading(true);
      if (gongsiInfo?.company.isSubscribed) {
        unsubscribe(id);
      } else {
        subscribe(id);
      }
      setGongsiInfo({
        ...gongsiInfo,
        company: {
          ...gongsiInfo.company,
          isSubscribed: !gongsiInfo.company.isSubscribed,
        },
      });
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const openLoginModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="">
      <HeaderLoginBack isLogin={false} />
      {!isLoading ? (
        <div className="p-4 text-lg">
          <div className="">
            <div className="my-4 text-2xl font-bold font">
              {gongsiInfo?.gongsi.title}
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div>{gongsiInfo?.company.name}</div>
                  <div
                    className={`${
                      gongsiInfo?.company.prdyCtr === -101
                        ? "hidden"
                        : gongsiInfo?.company.prdyCtr.toString().charAt(0) ===
                            "-"
                          ? "bg-blue-700"
                          : gongsiInfo?.company.prdyCtr === 0
                            ? "bg-gray-500"
                            : "bg-primary"
                    } text-sm font-bold text-white px-1 rounded-xl`}
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
              <button
                onClick={() =>
                  !isLoggedIn
                    ? onModal(
                        "로그인이 필요한 서비스입니다",
                        "로그인",
                        null,
                        closeModal,
                        openLoginModal,
                        isOpen,
                      )
                    : handleSubscribe(gongsiInfo?.company.id)
                }
                className={`flex transition ease-in-out gap-1.5 mr-2 border border-primary text-primary rounded-xl p-1 px-2 cursor-pointer text-sm ${gongsiInfo?.company.isSubscribed && "bg-primary text-white"}`}
              >
                <div>알림</div>
                <svg
                  className={`w-5 h-5 ${!gongsiInfo?.company.isSubscribed ? "text-primary" : "text-white"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 21"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"
                  />
                </svg>
              </button>
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
      {isOpen && <LoginSlider isOpen={isOpen} onClose={onClose} />}
      {isModalOn && <Modal modalContent={modalContent} />}
      <BottomNavigation />
    </div>
  );
};
