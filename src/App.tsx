import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import * as Sentry from "@sentry/react";

import { GongsiSearch } from "./pages/GongsiSearch/GongsiSearch";

import { Regist } from "./pages/Regist/Regist_01";
import { Regist_02 } from "./pages/Regist/Regist_02";
import { Main } from "./pages/Main/Main";
import { SettingPage } from "./pages/SettingPage/Setting";
import { GongsiDetail } from "./pages/GongsiDetail/GongsiDetail";
import { LoginSlider } from "./components/LoginSlider";
import LoginPage from "./components/LoginPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { messaging, onMessage } from "./firebase";
import { showCustomNotification } from "./components/CustomNotification";
import { AuthProvider } from "./contexts/AuthContext";
import InstallPWA, { isIos } from "./pages/Iphone_main/InstallPWA";
import OauthKakaoCallback from "./pages/OauthKakaoCallback";
import { MyPage } from "./pages/MyPage/MyPage";

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const isInStandaloneMode = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  useEffect(() => {
    // 포그라운드에서 푸시 알림 수신
    const unsubscribe = onMessage(messaging, (payload) => {
      // 예시: 토스트 메시지로 표시
      showCustomNotification({
        title: payload.data?.title ?? "알림",
        body: payload.data?.body ?? "",
      });

      // 또는 Custom UI 알림 모달 등 사용 가능
    });

    return () => {
      // 클린업
      unsubscribe();
    };
  }, []);

  const FirstPageComponent =
    isIos() && !isInStandaloneMode() ? <InstallPWA /> : <Main />;
  return (
    <div className="w-full max-w-[430px] mx-auto overflow-y-scroll scrollbar-hide">
      <Sentry.ErrorBoundary
        fallback={<p>문제가 발생했어요! 잠시 후 다시 시도해주세요.</p>}
      >
        <AuthProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={1000} // 3초 후 자동 닫힘
            limit={3}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
          />
          <Routes location={state?.backgroundLocation || location}>
            <Route
              path="/oauth/callback/kakao"
              element={<OauthKakaoCallback />}
            />
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<GongsiSearch />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/regist" element={<Regist />} />
            <Route path="/regist_02" element={<Regist_02 />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/detail/:id" element={<GongsiDetail />} />
          </Routes>
          {state?.backgroundLocation && (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          )}
        </AuthProvider>
      </Sentry.ErrorBoundary>
    </div>
  );
}

export default App;
