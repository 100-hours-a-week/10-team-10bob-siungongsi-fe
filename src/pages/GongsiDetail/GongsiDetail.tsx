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
    <div className="min-h-screen bg-gray-50">
      <HeaderLoginBack isLogin={false} />

      {!isLoading ? (
        <div className="p-5">
          <div className="mb-2">
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              Disclosure Detail
            </span>
          </div>

          {/* 통합된 공시 카드 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            {/* 공시 헤더 */}
            <div className="p-5 pb-3 border-b border-gray-100">
              <h1 className="text-xl font-bold mb-4 text-gray-900 leading-tight">
                {gongsiInfo?.gongsi.title}
              </h1>

              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-medium">
                      {gongsiInfo?.company.name}
                    </div>
                    <div
                      className={`${
                        gongsiInfo?.company.prdyCtr === -101
                          ? "hidden"
                          : gongsiInfo?.company.prdyCtr.toString().charAt(0) ===
                              "-"
                            ? "bg-blue-500"
                            : gongsiInfo?.company.prdyCtr === 0
                              ? "bg-gray-400"
                              : "bg-primary"
                      } text-xs font-bold text-white px-2 py-0.5 rounded-full`}
                    >
                      {gongsiInfo?.company.prdyCtr + "%"}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-sm text-gray-500">
                      {gongsiInfo?.gongsi.date}
                    </div>
                    <div className="text-sm text-gray-500">
                      조회 {gongsiInfo?.gongsi.viewCount}
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                    gongsiInfo?.company.isSubscribed
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-primary"
                  }`}
                >
                  <span className="text-sm font-medium">알림</span>
                  <svg
                    className="w-4 h-4"
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
            </div>

            {/* 공시 내용 */}
            <div className="p-5">
              <div
                style={{ whiteSpace: "pre-line" }}
                className="text-gray-700 leading-relaxed mb-6"
              >
                {gongsiInfo?.gongsi.content}
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="text-sm font-bold text-gray-500 mb-1">
                  ⚠️ 공시 요약 서비스 유의사항
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  본 서비스는 AI를 활용하여 공시 문서를 요약해 정보를
                  제공합니다. 투자와 같은 중요한 결정을 하실 때는 반드시 원본
                  문서를 확인하시기 바랍니다.
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-6">
            <a
              href={`${gongsiInfo?.gongsi.originalUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-white font-medium rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              원본 공시 보러가기
            </a>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <LoadingSpinner />
        </div>
      )}

      {isOpen && <LoginSlider isOpen={isOpen} onClose={onClose} />}
      {isModalOn && <Modal modalContent={modalContent} />}

      <BottomNavigation />
    </div>
  );
};
