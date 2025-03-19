import React, { useState } from "react";
import { Header } from "../../components/Header";
import { HeaderLoginBack } from "../../components/HeaderLoginBack";
import { BottomNavigation } from "../../components/BottomNavigation";
import { Modal } from "../../components/Modal";

export const GongsiDetail = () => {
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

  return (
    <div>
      <HeaderLoginBack isLogin={false} />
      <div className="p-2">
        <div className="my-4 text-2xl font-bold">
          삼성 모든 계열사 - SEN 채용하기로
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div>삼성전자</div>
              <div className="bg-blue-700 text-sm text-white px-2 rounded-xl">
                -1.4%
              </div>
            </div>
            <div className="flex gap-2">
              <div className="text-gray-500">25.02.25 16:04</div>
              <div className="text-gray-500">조회 4</div>
            </div>
          </div>
          <div
            onClick={() =>
              onModal("로그인이 필요한 서비스입니다", "로그인", null)
            }
            className="border border-primary text-primary rounded-xl p-1 px-4 cursor-pointer"
          >
            알림
          </div>
        </div>
        <div className="mb-4">매출: 74조 원(전년 동기 대비 5%증가)</div>
        <div className="text-sm text-gray-400 font-extrabold">
          <div className="">⚠️공시 요약 서비스 유의사항⚠️</div>
          <div>
            본 서비스는 AI를 활용하여 공시 문서를 요약해 정보를 제공합니다.
          </div>
          <div>
            투자와 같은 중요한 결정을 하실 때는 반드시 원본 문서를 확인하시기
            바랍니다.
          </div>
        </div>
      </div>

      <div className="p-4 m-4 mx-8 bg-primary text-center text-white rounded-xl">
        원본 보러 가기
      </div>
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
