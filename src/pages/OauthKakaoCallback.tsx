// src/pages/OauthKakaoCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../services/authService";

const REST_API_KEY = "dc0dfb49278efc7bde35eb001c7c4d5e";
const REDIRECT_URI = "http://siungongsi.site/oauth/kakao/callback";

export const OauthKakaoCallback = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    const getTokenAndLogin = async () => {
      try {
        // 1. 카카오 access token 요청
        const res = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code || "",
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );

        const kakaoAccessToken = res.data.access_token;

        // 2. 우리 백엔드 login API로 access token 전송 → JWT 발급

        const loginResponse = await login(kakaoAccessToken);

        localStorage.setItem("jwtToken", loginResponse.data.accessToken);
        setIsLoggedIn(true);

        navigate(-1); // 로그인 완료 후 메인으로
      } catch (error) {
        console.error("카카오 로그인 중 에러 발생:", error);
        navigate("/"); // 실패 시 홈으로
      }
    };

    if (code) {
      getTokenAndLogin();
    }
  }, [navigate, setIsLoggedIn]);

  return <div>로그인 처리 중입니다...</div>;
};

export default OauthKakaoCallback;
