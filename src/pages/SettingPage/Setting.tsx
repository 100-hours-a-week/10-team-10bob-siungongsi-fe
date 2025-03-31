import { useCallback, useEffect, useState } from "react";

import { getPushToken } from "../../firebase";

import { HeaderLogin } from "../../components/HeaderLogin";
import { Modal } from "../../components/Modal";
import { BottomNavigation } from "../../components/BottomNavigation";
import { SelectAlarm } from "../../components/SelectAlarm/SelectAlarm";
import { userWithdraw } from "../../services/authService";
import { patchUserNotificationInfo } from "../../services/usersService";
import { useLocation, useNavigate } from "react-router-dom";

export const SettingPage = () => {
  const navigate = useNavigate();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null,
  );
  const [isModalOn, setIsModalOn] = useState<boolean>();

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

  const sendTokenToServer = useCallback(async () => {
    try {
      if (isNotificationEnabled) {
        const token = await getPushToken();
        await patchUserNotificationInfo(
          isNotificationEnabled,
          token,
          localStorage.getItem("jwtToken"),
        );
        console.log("✅ FCM 토큰 서버에 전송 완료");
      }
    } catch (error) {
      console.error("❌ FCM 토큰 서버 전송 실패:", error);
    }
  }, [permission]);
  useEffect(() => {
    setPermission(Notification.permission);
    if (permission === "default" || permission === "denied") {
      setIsNotificationEnabled(false);
    } else {
      setIsNotificationEnabled(true);
    }

    sendTokenToServer();
  }, [sendTokenToServer]);

  const handleToggle = async () => {
    if (permission === "granted") {
      // 알림 해제 로직: 브라우저에서는 직접 차단 불가능하므로 안내

      alert("브라우저 설정에서 직접 알림을 해제해야 합니다.");
      return;
    }

    if (permission === "denied") {
      alert("알림이 차단되었습니다. 브라우저 설정에서 허용해주세요.");
      return;
    }

    // 사용자가 알림 권한을 요청
    const newPermission = await Notification.requestPermission();
    setPermission(newPermission);
    setIsNotificationEnabled(newPermission === "granted");

    if (newPermission === "granted") {
      // Firebase 푸시 토큰 요청

      setIsNotificationEnabled(true);
      sendTokenToServer();
    }
  };
  //모달 내 내용 설정
  const onModal = (
    titleMessage: string,
    submitMessage: string,
    helperText: string | null,
    closeModal: () => void,
    onSubmit?: () => void,
  ) => {
    setModalContent({
      titleMessage: titleMessage,
      submitMessage: submitMessage,
      helperText: helperText,
      closeModal: closeModal,
      onSubmit,
    });
    setIsModalOn(true);
  };
  const closeModal = () => {
    setIsModalOn(false);
  };
  const userWithDrawFunction = async () => {
    try {
      await userWithdraw(localStorage.getItem("jwtToken"));
    } catch (error) {
      console.error("회원탈퇴 에러 : ", error);
    } finally {
      localStorage.removeItem("jwtToken");
      navigate("/");
    }
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const location = useLocation();

  const openLoginModal = () => {
    navigate("/login", { state: { backgroundLocation: location } });
  };

  return (
    <div>
      <HeaderLogin isLogin={true} />
      {localStorage.getItem("jwtToken") ? (
        <div className="max-w-md mx-auto p-4 bg-white">
          {/* 알림 허용 토글 */}
          <div className="border-b">
            <div className="flex items-center justify-between py-4 mb-4">
              <span className="text-lg font-medium">알림 허용</span>
              <button
                onClick={handleToggle}
                className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  isNotificationEnabled ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    isNotificationEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {isNotificationEnabled && <SelectAlarm />}
          </div>

          <div className="flex flex-col ">
            {/* 로그아웃 버튼 */}
            <div
              onClick={() =>
                onModal(
                  "로그아웃 하시겠습니까?",
                  "확인",
                  null,
                  closeModal,
                  logout,
                )
              }
              className="text-red-500 text-lg font-semibold py-4 border-b cursor-pointer"
            >
              로그아웃
            </div>

            {/* 회원 탈퇴 (비활성화) */}
            <div
              onClick={() =>
                onModal(
                  "회원탈퇴 하시겠습니까?",
                  "확인",
                  "회원탈퇴는 되돌릴 수 없습니다",
                  closeModal,
                  userWithDrawFunction,
                )
              }
              className="text-gray-400 text-lg font-medium py-4 cursor-pointer"
            >
              회원 탈퇴
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md h-[50vh] flex flex-col gap-2 justify-center items-center p-4">
          <div className="text-2xl font-bold">로그인이 필요합니다</div>
          <div
            onClick={openLoginModal}
            className="text-gray-400 cursor-pointer"
          >
            로그인하러 가기 {">>"}
          </div>
        </div>
      )}
      {isModalOn && <Modal modalContent={modalContent} />}
      <BottomNavigation />
    </div>
  );
};
