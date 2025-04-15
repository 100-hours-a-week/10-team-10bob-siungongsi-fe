import React from "react";

function SentryTest() {
  const throwError = () => {
    throw new Error("🔥 테스트용 오류 발생! (Sentry로 전송됩니다)");
  };

  return <button onClick={throwError}>Sentry 테스트용 에러 발생시키기</button>;
}

export default SentryTest;
