// src/pages/OauthKakaoCallback.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../services/authService";
import { patchUserNotificationInfo } from "../services/usersService";
import { getPushToken } from "../firebase";
import { isIos } from "./Iphone_main/InstallPWA";
import LoginProcessing from "../components/LoginProcessing";

const REST_API_KEY = "dc0dfb49278efc7bde35eb001c7c4d5e";
const REDIRECT_URI = "https://www.siungongsi.site/oauth/callback/kakao";

export const OauthKakaoCallback = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [isUser, setIsUser] = useState<boolean>(false);

  console.log("인가코드 : ", code);

  useEffect(() => {
    if (!code) {
      console.error("❌ 인가코드가 없습니다. 로그인 실패 처리.");
      return;
    }

    const getTokenAndLogin = async () => {
      try {
        // 1. 카카오 access token 요청
        const res = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY as string,
            redirect_uri: REDIRECT_URI as string,
            code: code as string,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );

        const kakaoAccessToken = res.data.access_token;
        localStorage.setItem("kakaoAccessToken", kakaoAccessToken);

        console.log(kakaoAccessToken);

        // 2. 우리 백엔드 login API로 access token 전송 → JWT 발급

        const loginResponse = await login(kakaoAccessToken);

        if (loginResponse.data.isUser) {
          localStorage.setItem("jwtToken", loginResponse.data.accessToken);
          setIsLoggedIn(true);
          setIsUser(true);
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
          }
        } else {
          setIsUser(false);
          navigate("/regist", { state: kakaoAccessToken, replace: true });
        }
      } catch (error) {
        console.error("카카오 로그인 중 에러 발생:", error);
        navigate("/"); // 실패 시 홈으로
      } finally {
        navigate(0);
      }
    };

    if (code) {
      getTokenAndLogin();
    }
  }, [code, navigate, setIsLoggedIn]);

  return <LoginProcessing />;
};

export default OauthKakaoCallback;
