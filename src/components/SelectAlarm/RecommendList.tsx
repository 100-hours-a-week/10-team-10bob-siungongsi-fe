import { useEffect } from "react";

interface RecommendListProps {
  company: {
    companyId: number;
    companyName: string;
    isSubscribed: boolean;
    subscriberCnt: number;
  };
  subscribeHandler: (id: number, isSubscribe: boolean, name: string) => void;
  isLoading: boolean;
}
export const RecommendList = ({
  company,
  subscribeHandler,
  isLoading,
}: RecommendListProps) => {
  return (
    <div className="flex justify-between items-center p-4 border my-4 rounded-xl shadow-md">
      <div className="flex flex-col">
        <div>{company.companyName}</div>
        <div className="text-gray-300 text-sm">
          {company.subscriberCnt}명이 알림받는중
        </div>
      </div>
      <div
        onClick={() => {
          if (isLoading) return; //중복처리 방지
          subscribeHandler(
            company.companyId,
            company.isSubscribed,
            company.companyName,
          );
        }}
        className="cursor-pointer transition-all ease-in-out duration-300"
      >
        <svg
          className={`w-6 h-6 transition-color duration-300 ease-in-out ${company.isSubscribed ? "text-primary" : "text-gray-500"}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 21"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"
          />
        </svg>
      </div>
    </div>
  );
};
