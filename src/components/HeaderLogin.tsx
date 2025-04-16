import React, { useEffect, useState } from "react";
import { LoginSlider } from "./LoginSlider";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "./Modal";

import { useAuthStore } from "../store/authStore";

export const HeaderLogin = () => {
  // const { isLoggedIn, logout } = useAuth();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const logout = useAuthStore((state) => state.logout);
  const checkTokenValidity = useAuthStore((state) => state.checkTokenValidity);
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);

  // 모달정보 입력
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const closeModal = () => {
    setIsModalOn(false);
  };

  const onClose = () => {
    setIsOpen(false);
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

  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white shadow-sm">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Siun
      </h1>
      <div className="flex items-center gap-2">
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

      {isModalOn && <Modal modalContent={modalContent} />}
      {isOpen && <LoginSlider isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};
