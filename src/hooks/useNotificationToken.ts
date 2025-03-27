import { useEffect, useState } from "react";
import { getPushToken } from "../firebase"; // FCM 토큰을 가져오는 함수
import axios from "axios";
import { patchUserNotificationInfo } from "../services/usersService";

export const useNotificationToken = (userId: string | null) => {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null,
  );
  const [isTokenSent, setIsTokenSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendTokenToServer = async (token: string) => {
    try {
      const data = await patchUserNotificationInfo(true, token, userId);
      setIsTokenSent(true);
      console.log("✅ FCM 토큰 서버에 전송 완료");
    } catch (error) {
      console.error("❌ FCM 토큰 서버 전송 실패:", error);
    }
  };

  const checkAndSendToken = async () => {
    if (permission === "granted" && userId && !isTokenSent) {
      setIsLoading(true);
      const token = await getPushToken();
      if (token) {
        await sendTokenToServer(token);
      }
      setIsLoading(false);
    }
  };

  // 최초 permission 확인
  useEffect(() => {
    const requestPermission = async () => {
      if (permission === "granted" || permission === "denied") {
        const currentPermission = Notification.permission;
        setPermission(currentPermission);
        return;
      } else if (localStorage.getItem("jwtToken")) {
        const newPermission = await Notification.requestPermission();
        setPermission(newPermission);
      }
    };
    requestPermission();
  }, []);

  // permission 이 "granted"이면 토큰 발급 후 전송
  useEffect(() => {
    if (permission === "granted") {
      checkAndSendToken();
    }
  }, [permission, userId]);

  // 토글을 통해 수동으로 권한 요청할 수 있도록 제공
  const requestPermissionManually = async () => {
    const newPermission = await Notification.requestPermission();
    setPermission(newPermission);
  };

  return {
    permission,
    isTokenSent,
    isLoading,
    requestPermissionManually, // 수동 권한 요청 함수
  };
};
