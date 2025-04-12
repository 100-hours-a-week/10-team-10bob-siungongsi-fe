import React from "react";
interface IphoneWarnProps {
  onClose: () => void;
}

export const IphoneWarn = ({ onClose }: IphoneWarnProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            iOS 알림 설정 안내
          </h3>

          <div className="mb-5">
            <p className="text-gray-600 mb-4">
              iOS에서는 웹 알림 기능이 제한됩니다. 더 나은 사용 경험을 위해 홈
              화면에 앱을 추가해 보세요.
            </p>

            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">PWA 설치 방법</h4>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                <li>Safari 브라우저에서 아래 공유 버튼을 탭하세요</li>
                <li>'홈 화면에 추가' 옵션을 선택하세요</li>
                <li>'추가'를 탭하여 설치를 완료하세요</li>
              </ol>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all"
            >
              확인했습니다
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
