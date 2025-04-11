import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { RadioButton } from "../../components/RadioButton";
import { ScrollDown } from "../../components/Icons/ScrollDown";
import { RegistContent } from "./RegistContent";
import { ReactComponent as Close } from "../../assets/close-svgrepo-com.svg";

import { BottomNavigation } from "../../components/BottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createUser, fetchTermsOfUse } from "../../services/authService";
import { termsOfUse } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import { getPushToken } from "../../firebase";
import { patchUserNotificationInfo } from "../../services/usersService";
import { isIos } from "../Iphone_main/InstallPWA";
export const Regist = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const loginInfo = location.state;
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState([false, false]);
  const [termsOfUse, setTermsOfUse] = useState<termsOfUse[]>([]);

  const agreedTermsIds = checks
    .map((checked, index) => (checked ? index + 1 : null))
    .filter((id): id is number => id !== null);

  useEffect(() => {
    const getTermsofUse = async () => {
      try {
        const data = await fetchTermsOfUse();
        setTermsOfUse(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTermsofUse();
  }, []);

  const onRegistSubmit = async () => {
    try {
      const data = await createUser(loginInfo, agreedTermsIds);
      localStorage.setItem("jwtToken", data.data);
      setIsLoggedIn(true);

      const newToken = await getPushToken();
      const oldToken = localStorage.getItem("fcmToken");

      if (newToken && newToken !== oldToken && !isIos()) {
        await patchUserNotificationInfo(
          true,
          newToken,
          localStorage.getItem("jwtToken"),
        );
        localStorage.setItem("fcmToken", newToken); // 중복 호출 방지
        console.log("✅ FCM 토큰 서버에 등록 완료");
      } else {
        return;
      }
    } catch (error) {
      console.error("회원가입 오류 : ", error);
    } finally {
      // navigate('/');
    }
  };

  const handleAllClick = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setChecks([newState, newState]);
  };
  const handleSingleClick = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];

    setChecks(newChecks);
    setAllChecked(newChecks.every((check) => check));
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">약관동의</div>
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <Close />
          </div>
        </div>
        <div className="flex items-center border-b gap-2 py-2">
          <div>
            <RadioButton isClick={allChecked} onClick={handleAllClick} />
          </div>
          <div>약관에 전체 동의합니다</div>
        </div>
        {termsOfUse.map((tou, index) => (
          <RegistContent
            title={tou.termsTitle}
            termsOfUse={tou.termsContent}
            checks={checks}
            handleSingleClick={handleSingleClick}
            index={index}
          />
        ))}
      </div>
      <div
        onClick={onRegistSubmit}
        className={`m-12 p-4 rounded-xl text-center text-white transition ease-in-out ${allChecked ? "bg-primary cursor-pointer" : "bg-gray-300"}  `}
      >
        다음으로
      </div>
      <BottomNavigation />
    </div>
  );
};
