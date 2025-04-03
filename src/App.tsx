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

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    // 포그라운드에서 푸시 알림 수신
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🔥 포그라운드 메시지 수신:", payload);

      // 예시: 토스트 메시지로 표시
      toast.info(
        `${payload.data?.title}\n${payload.data?.body}\n${payload.data?.url}`,
        {
          autoClose: 5000,
          position: "top-right",
        },
      );

      // 또는 Custom UI 알림 모달 등 사용 가능
    });

    return () => {
      // 클린업
      unsubscribe();
    };
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto overflow-y-scroll scrollbar-hide">
      <Sentry.ErrorBoundary
        fallback={<p>문제가 발생했어요! 잠시 후 다시 시도해주세요.</p>}
      >
        <ToastContainer
          position="bottom-center"
          autoClose={1000} // 3초 후 자동 닫힘
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<GongsiSearch />} />
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
      </Sentry.ErrorBoundary>
    </div>
  );
}

export default App;
