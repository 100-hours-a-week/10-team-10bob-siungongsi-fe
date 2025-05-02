// src/pages/OauthKakaoCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import { login } from "../services/authService";
import { patchUserNotificationInfo } from "../services/usersService";
import { getPushToken } from "../firebase";
import { isIos } from "../pages/Iphone_main/InstallPWA";
import LoginProcessing from "../components/LoginProcessing";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

const REST_API_KEY = "d43a4cbe49488a5f573822fc64ccd95e";
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://www.siungongsi.site/oauth/callback/kakao"
    : "http://localhost:3000/oauth/callback/kakao";

export const OauthKakaoCallback = () => {
  const navigate = useNavigate();

  const setLogin = useAuthStore((state) => state.login);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      return;
    }

    const getKakaoAccessToken = async () => {
      try {
        const tokenRes = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );

        const kakaoAccessToken = tokenRes.data.access_token;

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        localStorage.setItem("kakaoAccessToken", kakaoAccessToken);

        const loginRes = await login(kakaoAccessToken);
        const { accessToken, isUser } = loginRes.data;

        if (isUser) {
          localStorage.setItem("jwtToken", accessToken);
          // setIsLoggedIn(true);
          setLogin(accessToken);
          console.time("kakaoTokenRequest");

          await handleNotificationToken();
          console.timeEnd("kakaoTokenRequest");
        } else {
          navigate("/regist", { state: kakaoAccessToken });
        }
      } catch (err) {
        console.error("카카오 로그인 처리 중 에러:", err);

        navigate("/");
      }
    };

    const handleNotificationToken = async () => {
      try {
        if (Notification.permission === "granted") {
          const newToken = await getPushToken();

          if (!isIos()) {
            await patchUserNotificationInfo(
              true,
              newToken,
              localStorage.getItem("jwtToken"),
            );

            console.log("✅ FCM 토큰 서버에 등록 완료");
          }
        } else {
          return;
        }
      } catch (err) {
        console.error("FCM 처리 오류:", err);
      } finally {
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    };

    getKakaoAccessToken();
  }, [code, navigate, setLogin]);

  return <LoginProcessing />;
};

export default OauthKakaoCallback;
