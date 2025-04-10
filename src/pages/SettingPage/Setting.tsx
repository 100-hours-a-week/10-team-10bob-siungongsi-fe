import { useCallback, useEffect, useState } from "react";

import { getPushToken } from "../../firebase";

import { HeaderLogin } from "../../components/HeaderLogin";
import { Modal } from "../../components/Modal";
import { BottomNavigation } from "../../components/BottomNavigation";
import { SelectAlarm } from "../../components/SelectAlarm/SelectAlarm";
import { userWithdraw } from "../../services/authService";
import {
  fetchUserNotificationInfo,
  patchUserNotificationInfo,
} from "../../services/usersService";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollDown } from "../../components/Icons/ScrollDown";
import { useAuth } from "../../contexts/AuthContext";
import { LoginSlider } from "../../components/LoginSlider";
import { isIos } from "../Iphone_main/InstallPWA";

export const SettingPage = () => {
  const { isLoggedIn, setIsLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(
    Notification.permission === "granted",
  );
  const [token, setToken] = useState<string | undefined>(
    "cwkp2T0Ccn3rJs1aw0_Z3R:APA91bGiX4SQb7raYFApmaC-C6gI3FTLybcBqWFTmrblQZ_zwRBZcgsLxbMjL8CGBGatL7cUPMq5u4xs6XOwm0JREZj2n8zprYeh3zWZPohEUi_mkWW7CVo",
  );
  const [isModalOn, setIsModalOn] = useState<boolean>();
  const [isIOSDevice, setIsIOSDevice] = useState<boolean>(false);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);

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

  const sendTokenToServer = async (notiEnabled: boolean) => {
    try {
      if (notiEnabled) {
        await patchUserNotificationInfo(
          notiEnabled,
          token,
          localStorage.getItem("jwtToken"),
        );
      } else {
        await patchUserNotificationInfo(
          notiEnabled,
          "",
          localStorage.getItem("jwtToken"),
        );
      }
    } catch (error) {
      console.error("❌ FCM 토큰 서버 전송 실패:", error);
    }
  };

  // iOS 디바이스 감지
  useEffect(() => {
    const checkIOSDevice = () => {
      const userAgent = navigator.userAgent;
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      setIsIOSDevice(isIOS);
    };
    
    checkIOSDevice();
  }, []);

  //모바일 환경이면 새로고침
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleFocus = () => {
      if (isMobile) {
        window.location.reload(); // 📱 모바일일 때만 새로고침
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
  
  //Notification.permission 바뀌면 notiflag 변경
  useEffect(() => {
    sendTokenToServer(isNotificationEnabled);
  }, [isNotificationEnabled]);
  
  //토큰값 불러오기
  useEffect(() => {
    const getToken = async () => {
      if (Notification.permission === "granted") {
        const data = await getPushToken();
        setToken(data);
      }
    };
    getToken();
  }, []);
  
  const [subscribeOn, setSubscribeOn] = useState<boolean>(false);

  const handleToggle = async () => {
    if (isIOSDevice) {
      setShowIOSModal(true);
      return;
    }
    
    if (Notification.permission === "granted") {
      setIsNotificationEnabled(true);
      setSubscribeOn((prev) => !prev);
      return;
    }
    if (Notification.permission === "denied") {
      alert("알림이 차단되었습니다. 브라우저 설정에서 허용해주세요.");
      setIsNotificationEnabled(false);
      setSubscribeOn(false);
      return;
    }

    if (!isIos()) {
      const newPermission = await Notification.requestPermission();
      if (newPermission === "granted") {
        setSubscribeOn(true);
        // setIsNotificationEnabled(true);
      }
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
  
  const closeIOSModal = () => {
    setShowIOSModal(false);
  };
  
  //회원탈퇴
  const userWithDrawFunction = async () => {
    try {
      await userWithdraw(localStorage.getItem("jwtToken"));
      setIsLoggedIn(false);
    } catch (error) {
      console.error("회원탈퇴 에러 : ", error);
    } finally {
      localStorage.removeItem("jwtToken");

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLogin isLogin={true} />

      <div className="p-4">
        {/* 설정 섹션 타이틀 */}
        <div className="mb-6 mt-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            Settings
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-4">설정</h2>
        </div>

        {isLoggedIn ? (
          <div>
            {/* 알림 설정 섹션 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
              <div
                onClick={handleToggle}
                className="flex items-center justify-between p-4 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      알림 기업 설정
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      관심 기업의 공시를 받아보세요
                    </p>
                  </div>
                </div>
                <div
                  className={`transform transition-transform duration-300 text-gray-400 ${subscribeOn ? "rotate-180" : "rotate-0"}`}
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {subscribeOn && !isIOSDevice && (
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                  <SelectAlarm />
                </div>
              )}
            </div>

            {/* 계정 관리 섹션 */}
            <div className="mb-6">
              <div className="flex items-baseline mb-4">
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    Account
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 mt-1">
                    계정 관리
                  </h2>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* 로그아웃 버튼 */}
                <button
                  onClick={() =>
                    onModal(
                      "로그아웃 하시겠습니까?",
                      "확인",
                      null,
                      closeModal,
                      logout,
                    )
                  }
                  className="flex items-center w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-red-100 rounded-full p-2 mr-3">
                    <svg
                      className="w-5 h-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-red-500">
                    로그아웃
                  </span>
                </button>

                <div className="border-t border-gray-100"></div>

                {/* 회원 탈퇴 버튼 */}
                <button
                  onClick={() =>
                    onModal(
                      "회원탈퇴 하시겠습니까?",
                      "확인",
                      "회원탈퇴는 되돌릴 수 없습니다",
                      closeModal,
                      userWithDrawFunction,
                    )
                  }
                  className="flex items-center w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-gray-100 rounded-full p-2 mr-3">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-gray-400">
                    회원 탈퇴
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="mb-6">
              <div className="bg-blue-100 rounded-full p-4 mx-auto">
                <svg
                  className="w-12 h-12 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              로그인이 필요합니다
            </h3>
            <p className="text-gray-500 text-center mb-5">
              설정을 이용하시려면 로그인해주세요
            </p>
            <button
              onClick={openLoginModal}
              className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all"
            >
              로그인하기
            </button>
          </div>
        )}
      </div>

      {isModalOn && <Modal modalContent={modalContent} />}

      {/* iOS 사용자를 위한 알림 설정 안내 모달 */}
      {showIOSModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                iOS 알림 설정 안내
              </h3>
              
              <div className="mb-5">
                <p className="text-gray-600 mb-4">
                  iOS에서는 웹 알림 기능이 제한됩니다. 더 나은 사용 경험을 위해 홈 화면에 앱을 추가해 보세요.
                </p>
                
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">PWA 설치 방법</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                    <li>Safari 브라우저에서 아래 공유 버튼을 탭하세요</li>
                    <li>'홈 화면에 추가' 옵션을 선택하세요</li>
                    <li>'추가'를 탭하여 설치를 완료하세요</li>
                  </ol>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={closeIOSModal}
                  className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  확인했습니다
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};