import React, { useEffect, useState } from "react";
import { HeaderLogin } from "../../components/HeaderLogin";

import { BottomNavigation } from "../../components/BottomNavigation";

import Select from "react-select";
import { CompanyMultiSelect } from "./CompanyMultiSelect";
import { fetchSusbscriptions } from "../../services/usersService";
import { GongsiList } from "../../components/GongsiList";
import { GongsiData, fetchGongsiList } from "../../services/gongsiService";
import { MyGongsiList } from "./MyGongsiList";
import { useAuthStore } from "../../store/authStore";
import { LoginSlider } from "../../components/LoginSlider";

export const MyPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [subCompany, setSubCompany] = useState<
    {
      companyId: number;
      companyName: string;
      companyCode: string;
      stockCode: number;
    }[]
  >();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const [selected, setSelected] = useState<number | undefined>(() => {
    const stored = localStorage.getItem("selectedCompany");
    return stored ? Number(stored) : undefined;
  });

  useEffect(() => {
    const fetchSub = async () => {
      const companyList = await fetchSusbscriptions(
        localStorage.getItem("jwtToken"),
      );
      setSubCompany(companyList.data.subscribedCompanies);
    };
    if (isLoggedIn) {
      fetchSub();
    }
  }, []);

  const handleToggle = (company: number | undefined) => {
    setSelected(company);
    if (company !== undefined) {
      localStorage.setItem("selectedCompany", String(company));
    } else {
      localStorage.removeItem("selectedCompany");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLogin />
      <div className="mt-2 p-4">
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          My Page
        </span>
        <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-4">
          마이페이지
        </h2>
      </div>
      <div className="px-4">
        {isLoggedIn ? (
          <div>
            <CompanyMultiSelect
              subscriptions={subCompany}
              selected={selected}
              handleToggle={handleToggle}
            />

            <div className="bg-white p-2 rounded-2xl shadow-sm mt-4">
              {selected ? (
                <MyGongsiList selectedCompany={selected} />
              ) : (
                <div className="flex flex-col items-center justify-center w-full py-16">
                  <svg
                    className="w-16 h-16 text-gray-300 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-center text-gray-500 font-medium">
                    구독한 기업을 선택해주세요!
                  </p>
                  <p className="text-center text-gray-400 text-sm mt-1">
                    구독한 기업의 게시글이 표시됩니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="mb-6">
              <div className="bg-blue-100 rounded-full p-4 mx-auto">
                <svg
                  className="w-12 h-12 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              로그인이 필요합니다
            </h3>
            <p className="text-gray-500 text-center mb-5">
              마이페이지를 이용하시려면 로그인해주세요
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all"
            >
              로그인하기
            </button>
          </div>
        )}
      </div>
      <div>
        <BottomNavigation />
        {isOpen && <LoginSlider isOpen={isOpen} onClose={onClose} />}
      </div>
    </div>
  );
};
