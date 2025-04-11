import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Lucide 아이콘 사용 시

const LoginProcessing = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      {/* 톱니바퀴 애니메이션 */}
      <div className="animate-spin text-primary mb-6">
        <Loader2 size={48} />
      </div>

      {/* 텍스트 점 애니메이션 */}
      <p className="text-lg font-semibold text-gray-700">
        로그인 처리 중입니다{".".repeat(dotCount)}
      </p>
    </div>
  );
};

export default LoginProcessing;
