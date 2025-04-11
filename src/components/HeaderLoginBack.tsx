import React, { useState } from "react";
import { LoginSlider } from "./LoginSlider";
import back from "../assets/back.png";
import { Modal } from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  isLogin: boolean;
}

export const HeaderLoginBack = ({ isLogin }: Props) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white shadow-sm">
      <button
        onClick={() => window.history.back()}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-white"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Siun
      </h1>

      <div className="flex justify-center min-w-[80px]">
        {isLoggedIn ? (
          <button
            onClick={openLogoutModal}
            className="bg-primary text-white px-3 py-1.5 rounded-lg border border-white text-sm font-medium"
          >
            로그아웃
          </button>
        ) : (
          <button
            className="bg-white px-3 py-1.5 rounded-lg text-primary text-sm font-medium shadow-sm"
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
