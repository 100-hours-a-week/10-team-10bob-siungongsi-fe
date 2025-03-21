import { useEffect } from "react";

const SentryTest: React.FC = () => {
  useEffect(() => {
    throw new Error("🔥 Sentry 테스트 에러입니다!");
  }, []);

  return <div>센트리 테스트용 컴포넌트입니다.</div>;
};

export default SentryTest;
