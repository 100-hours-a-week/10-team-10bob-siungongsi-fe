import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import kakao from "../assets/kakao_login.png";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: any;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export const LoginSlider = ({ isOpen, onClose }: Props) => {
  const y = useMotionValue(0);
  useEffect(() => {
    y.set(0); // 매번 열릴 때 초기화
  }, [isOpen, y]);

  const [loginError, setLoginError] = useState<string | null>(null);

  // 리다이렉트 URI 설정 - 카카오 개발자 콘솔에 등록된 URI와 일치해야 함

  const kakaoLoginRedirect = () => {
    const REST_API_KEY = "d43a4cbe49488a5f573822fc64ccd95e";
    const REDIRECT_URI =
      process.env.NODE_ENV === "production"
        ? "https://www.siungongsi.site/oauth/callback/kakao"
        : "http://localhost:3000/oauth/callback/kakao";
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  // useEffect(() => {
  //   // 카카오 SDK 초기화
  //   if (!window.Kakao.isInitialized()) {
  //     console.log('카카오 SDK 초기화 시작');
  //     window.Kakao.init('dc0dfb49278efc7bde35eb001c7c4d5e'); // JavaScript Key 입력
  //     console.log('카카오 SDK 초기화 완료:', window.Kakao.isInitialized());
  //   }

  //   // 리다이렉트 후 처리
  //   const handleKakaoCallback = async () => {
  //     console.log('카카오 로그인 콜백 처리 중...');
  //     try {
  //       // getAuthInfo를 사용하여 인증 정보 확인
  //       const authObj = window.Kakao.Auth.getAuthInfo();
  //       if (!authObj) {
  //         console.log('인증 정보가 없음, 로그인 프로세스 중단');
  //         return;
  //       }

  //       const accessToken = authObj.access_token;

  //       console.log('백엔드 로그인 시도 중...');
  //       const data = await login(accessToken);
  //       console.log('백엔드 응답:', data);

  //       if (data.data.isUser) {
  //         console.log('로그인 성공, JWT 토큰 저장');
  //         localStorage.setItem('jwtToken', data.data.accessToken);
  //         setIsLoggedIn(true);
  //         // 알림 토큰 처리
  //         handleNotificationToken();
  //         // URL에서 인증 코드 파라미터 제거 (선택사항)
  //         window.history.replaceState(
  //           {},
  //           document.title,
  //           window.location.pathname
  //         );
  //       } else {
  //         console.log('신규 사용자, 회원가입 페이지로 이동');
  //         navigate('/regist', { state: accessToken });
  //       }
  //     } catch (error: any) {
  //       console.error('로그인 처리 중 에러:', error);
  //       let errorMessage = '로그인 처리 중 오류가 발생했습니다';
  //       setLoginError(errorMessage);
  //       toast.error(errorMessage);
  //     }
  //   };

  //   // URL에서 인증 코드 확인 (리다이렉트 되었는지 체크)
  //   const url = new URL(window.location.href);
  //   const code = url.searchParams.get('code');
  //   if (code) {
  //     console.log('인가 코드 감지:', code);
  //     // 인가 코드가 있으면 이미 리다이렉트된 것이므로 인증 처리
  //     window.Kakao.Auth.setAccessToken()
  //       .then(() => {
  //         console.log('액세스 토큰 설정 완료');
  //         handleKakaoCallback();
  //       })
  //       .catch((err: any) => {
  //         console.error('액세스 토큰 설정 실패:', err);
  //         setLoginError('카카오 인증 처리 중 오류가 발생했습니다');
  //         toast.error('인증 처리 중 오류가 발생했습니다');
  //       });
  //   }
  // }, [navigate, setIsLoggedIn]);

  // // 알림 토큰 처리 함수
  // const handleNotificationToken = async () => {
  //   try {
  //     console.log('FCM 토큰 처리 시작');
  //     const newToken = await getPushToken();
  //     const oldToken = localStorage.getItem('fcmToken');

  //     if (newToken && newToken !== oldToken && !isIos()) {
  //       console.log('FCM 토큰 업데이트 필요:', newToken);
  //       const jwtToken = localStorage.getItem('jwtToken');

  //       if (jwtToken) {
  //         await patchUserNotificationInfo(true, newToken, jwtToken);
  //         localStorage.setItem('fcmToken', newToken); // 중복 호출 방지
  //         console.log('✅ FCM 토큰 서버에 등록 완료');
  //         toast.info('로그인 되었습니다');
  //       } else {
  //         console.log('JWT 토큰이 없어 FCM 토큰 업데이트를 건너뜁니다');
  //       }
  //     } else {
  //       console.log(
  //         'FCM 토큰 업데이트 불필요. iOS:',
  //         isIos(),
  //         '토큰 동일:',
  //         newToken === oldToken
  //       );
  //       toast.info('로그인 되었습니다');
  //     }
  //   } catch (fcmError) {
  //     console.error('FCM 토큰 처리 중 오류:', fcmError);
  //   }
  // };

  // // 카카오 로그인 리다이렉트 방식 구현
  // const loginWithKakao = () => {
  //   console.log('카카오 로그인 리다이렉트 시작...');
  //   try {
  //     // 리다이렉트 방식으로 인증 시작 (팝업 대신)
  //     window.Kakao.Auth.authorize({
  //       redirectUri: REDIRECT_URI,

  //       throughTalk: false,
  //     });
  //   } catch (error) {
  //     console.error('카카오 리다이렉트 시작 중 오류:', error);
  //     setLoginError('카카오 로그인을 시작할 수 없습니다');
  //     toast.error('로그인을 시작할 수 없습니다');
  //   }
  // };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-end z-[1000]"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-t-2xl shadow-xl w-full max-w-sm mx-auto overflow-hidden"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 100 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y > 100) {
            onClose(); // 아래로 많이 드래그하면 닫힘
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 핸들 - iOS 스타일 */}
        <div className="w-full flex justify-center mt-3 mb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">로그인</h2>
            <button
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              onClick={onClose}
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-50 w-full rounded-2xl p-4 mb-5 text-center">
              <p className="text-gray-700 text-sm mb-4">
                간편하게 로그인하고 원하는 기업의
                <br />
                공시 정보를 받아보세요
              </p>

              {loginError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-xs text-left">
                  <p className="font-bold mb-1">로그인 오류:</p>
                  <p>{loginError}</p>
                </div>
              )}

              <button
                onClick={kakaoLoginRedirect}
                className="flex items-center justify-center w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <img
                  className="w-full max-w-[200px]"
                  src={kakao}
                  alt="카카오 로그인"
                />
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
