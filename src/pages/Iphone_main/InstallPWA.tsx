import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import iphone1 from "../../assets/iphone1.jpg";
import iphone2 from "../../assets/iphone2.jpg";
import iphone3 from "../../assets/iphone3.jpg";

export const isIos = () => {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
};

const isInStandaloneMode = () =>
  "standalone" in window.navigator && (window.navigator as any).standalone;

export default function InstallPWA() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) {
      setShowPrompt(true);
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div>
      <Header />
      <p className="text-gray-700 mb-4">
        더 편하게 이용하려면 이 웹앱을 <strong>홈 화면에 추가</strong>해주세요.
      </p>
      <div className="text-sm text-gray-500">
        <p className="mb-1">1. Safari에서 아래 공유 버튼을 눌러주세요.</p>
        <p className="mb-1">2. "홈 화면에 추가"를 선택하세요.</p>
        <div className="flex flex-wrap">
          <img
            src={iphone1} // 안내 이미지
            alt="홈화면 추가 가이드"
            className="mt-4 w-44 border rounded"
          />
          <img
            src={iphone2} // 안내 이미지
            alt="홈화면 추가 가이드"
            className="mt-4 w-44 border rounded"
          />
          <img
            src={iphone3} // 안내 이미지
            alt="홈화면 추가 가이드"
            className="mt-4 w-44 border rounded"
          />
        </div>
      </div>
    </div>
  );
}
