import React, { useState } from "react";
import { LoginSlider } from "./LoginSlider";
import { useLocation, useNavigate } from "react-router-dom";
import back from "../assets/back.png";
import { Modal } from "./Modal";
interface Props {
  isLogin: boolean;
}
export const HeaderLoginBack = ({ isLogin }: Props) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const location = useLocation();
  const openLoginModal = () => {
    navigate("/login", { state: { backgroundLocation: location } });
  };
  const closeModal = () => {
    setIsModalOn(false);
  };
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
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white font-bold max-h-[55px]">
      <div onClick={() => window.history.back()} className="cursor-pointer">
        <img className="w-8" src={back} alt="" />
      </div>
      <h1 className="ml-6 text-2xl">Siun</h1>
      <div className="flex justify-center w-20">
        {token ? (
          <button
            onClick={openLogoutModal}
            className="bg-primary text-white p-1 px-2 rounded-lg border border-white"
          >
            로그아웃
          </button>
        ) : (
          <button
            className="bg-white p-1 px-2 rounded-lg text-primary"
            onClick={() => setIsOpen(true)}
          >
            로그인
          </button>
        )}
      </div>
      {isOpen && <LoginSlider isOpen={isOpen} onClose={onClose} />}
      {isModalOn && <Modal modalContent={modalContent} />}
    </div>
  );
};
