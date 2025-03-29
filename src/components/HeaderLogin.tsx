import React, { useState } from "react";
import { LoginSlider } from "./LoginSlider";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
interface Props {
  isLogin: boolean;
}
export const HeaderLogin = ({ isLogin }: Props) => {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const location = useLocation();
  //모달정보 입력
  const [isModalOn, setIsModalOn] = useState<boolean>(false);

  const [modalContent, setModalContent] = useState<{
    titleMessage: string;
    submitMessage: string;
    helperText: string | null;
    closeModal: () => void;
    onSubmit?: () => void;
  }>({
    titleMessage: "",
    submitMessage: "",
    helperText: null as string | null,
    closeModal: () => {},
    onSubmit: () => {},
  });

  const openLoginModal = () => {
    navigate("/login", { state: { backgroundLocation: location } });
  };
  const closeModal = () => {
    setIsModalOn(false);
  };

  const openLogoutModal = () => {
    setModalContent({
      titleMessage: "로그아웃 하시겠습니까?",
      submitMessage: "확인",
      helperText: null,
      closeModal: closeModal,
      onSubmit: logout,
    });
    setIsModalOn(true);
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate(0);
  };
  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white font-bold max-h-[55px]">
      <h1 className="text-2xl">Siun</h1>
      {token ? (
        <button
          onClick={openLogoutModal}
          className="bg-primary text-white p-2 rounded-lg border border-white"
        >
          로그아웃
        </button>
      ) : (
        <button
          className="bg-white p-2 rounded-lg text-primary"
          onClick={openLoginModal}
        >
          로그인
        </button>
      )}
      {isModalOn && <Modal modalContent={modalContent} />}
    </div>
  );
};
