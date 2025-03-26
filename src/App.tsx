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

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Sentry.ErrorBoundary
      fallback={<p>문제가 발생했어요! 잠시 후 다시 시도해주세요.</p>}
    >
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
  );
}

export default App;
