// src/pages/OauthKakaoCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../services/authService";
import { patchUserNotificationInfo } from "../services/usersService";
import { getPushToken } from "../firebase";
import { isIos } from "../pages/Iphone_main/InstallPWA";
import LoginProcessing from "../components/LoginProcessing";
import { toast } from "react-toastify";

const REST_API_KEY = "d43a4cbe49488a5f573822fc64ccd95e";
const REDIRECT_URI = "https://www.siungongsi.site/oauth/callback/kakao";

export const OauthKakaoCallback = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      toast.error("인가 코드가 없습니다.");
      navigate("/");
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
        localStorage.setItem("kakaoAccessToken", kakaoAccessToken);

        const loginRes = await login(kakaoAccessToken);
        const { accessToken, isUser } = loginRes.data;

        if (isUser) {
          localStorage.setItem("jwtToken", accessToken);
          setIsLoggedIn(true);
          handleNotificationToken();

          navigate(-1);
        } else {
          navigate("/regist", { state: kakaoAccessToken });
        }
      } catch (err) {
        console.error("카카오 로그인 처리 중 에러:", err);
        toast.error("로그인에 실패했습니다.");
        navigate("/");
      } finally {
      }
    };

    const handleNotificationToken = async () => {
      try {
        const newToken = await getPushToken();
        const oldToken = localStorage.getItem("fcmToken");

        if (newToken && newToken !== oldToken && !isIos()) {
          const jwtToken = localStorage.getItem("jwtToken");
          if (jwtToken) {
            await patchUserNotificationInfo(true, newToken, jwtToken);
            localStorage.setItem("fcmToken", newToken);
          }
        }
      } catch (err) {
        console.error("FCM 처리 오류:", err);
      }
    };

    getKakaoAccessToken();
  }, [code, navigate, setIsLoggedIn]);

  return <LoginProcessing />;
};

export default OauthKakaoCallback;
