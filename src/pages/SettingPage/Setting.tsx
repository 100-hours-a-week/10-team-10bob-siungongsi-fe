import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { getPushToken } from "../../firebase";
import { Regist_02 } from "../Regist/Regist_02";
import { AlarmSelect } from "./AlarmSelect";
import { HeaderLogin } from "../../components/HeaderLogin";
import { Modal } from "../../components/Modal";
import { BottomNavigation } from "../../components/BottomNavigation";
import {
  Companies,
  fetchCompanyNameList,
} from "../../services/companiesService";
import { motion } from "framer-motion";
import { SearchBar } from "../Regist/SearchBarRegist";

export const SettingPage = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null,
  );
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState({
    titleMessage: "",
    submitMessage: "",
    helperText: null as string | null,
  });

  const [isVibrating, setIsVibrating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Companies>();
  const [keyword, setKeyword] = useState<string>("");
  const [isSearchBarOn, setIsSearchBarOn] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [addVibratingTrigger, setAddVibratingTrigger] =
    useState<boolean>(false);

  useEffect(() => {
    if (selectedCompany.length >= 10) {
      console.log(selectedCompany.length);
      setIsVibrating(true);
      setIsDisabled(true);
      setAddVibratingTrigger(true);
      setTimeout(() => setIsVibrating(false), 300);
    } else {
      setIsDisabled(false);
      setAddVibratingTrigger(false);
    }
  }, [selectedCompany]);

  useEffect(() => {
    setPermission(Notification.permission);
    setIsNotificationEnabled(Notification.permission === "granted");
  }, []);
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
      const token = await getPushToken();
      console.log("푸시 토큰:", token);
      setIsNotificationEnabled(true);
    }
  };
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
  const triggerVibration = () => {
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 300); // 0.3초 후 효과 제거
  };
  const onChangeKeyword = (value: string) => {
    setKeyword(value);
    setIsSearchBarOn(true);
  };
  const onSelectCompany = (company: string) => {
    setSelectedCompany((prev) => [...new Set([...prev, company])]);

    setIsSearchBarOn(false);
    setKeyword("");
  };

  return (
    <div>
      <HeaderLogin isLogin={true} />
      <div className="max-w-md mx-auto p-4 bg-white">
        {/* 알림 허용 토글 */}
        <div className="border-b">
          <div className="flex items-center justify-between py-4">
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
          {isNotificationEnabled && (
            <div>
              <motion.div
                className="font-bold flex gap-2"
                animate={
                  isVibrating
                    ? {
                        x: [-2, -2, 2, -2, 2, -2],
                        y: [-2, 2, -2, 2, -2, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.2 }}
              >
                <div>알림받고 싶은 기업을 선택해주세요</div>
                <div
                  className={`${selectedCompany.length >= 10 && "text-primary"}`}
                >
                  ({selectedCompany.length}/10)
                </div>
              </motion.div>
              {addVibratingTrigger ? (
                <div onClick={triggerVibration}>
                  <SearchBar
                    keyword={keyword}
                    companies={companies?.companyNameList}
                    onChangeKeyword={onChangeKeyword}
                    isLoading={isLoading}
                    onSelectCompany={onSelectCompany}
                    isSearchBarOn={isSearchBarOn}
                    isDisabled={isDisabled}
                  />
                </div>
              ) : (
                <SearchBar
                  keyword={keyword}
                  companies={companies?.companyNameList}
                  onChangeKeyword={onChangeKeyword}
                  isLoading={isLoading}
                  onSelectCompany={onSelectCompany}
                  isSearchBarOn={isSearchBarOn}
                  isDisabled={isDisabled}
                />
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col ">
          {/* 로그아웃 버튼 */}
          <div
            onClick={() => onModal("로그아웃 하시겠습니까?", "확인", null)}
            className="text-red-500 text-lg font-semibold py-4 border-b"
          >
            로그아웃
          </div>

          {/* 회원 탈퇴 (비활성화) */}
          <div
            onClick={() =>
              onModal(
                "회원탈퇴 하시겠습니까?",
                "확인",
                "회원탈퇴는 되돌릴 수 없습니다.",
              )
            }
            className="text-gray-400 text-lg font-medium py-4"
          >
            회원 탈퇴
          </div>
        </div>
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
