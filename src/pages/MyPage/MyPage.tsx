import React, { useEffect, useState } from "react";
import { HeaderLogin } from "../../components/HeaderLogin";
import { SubscribeListInput } from "../../components/SubscribeListInput";
import { BottomNavigation } from "../../components/BottomNavigation";

import Select from "react-select";
import { CompanyMultiSelect } from "./CompanyMultiSelect";
import { fetchSusbscriptions } from "../../services/usersService";
import { GongsiList } from "../../components/GongsiList";
import { GongsiData, fetchGongsiList } from "../../services/gongsiService";
import { MyGongsiList } from "./MyGongsiList";

export const MyPage = () => {
  const [todayGongsi, setTodayGongsi] = useState<GongsiData>();

  const [subCompany, setSubCompany] = useState<
    {
      companyId: number;
      companyName: string;
      companyCode: string;
      stockCode: number;
    }[]
  >();

  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    const fetchSub = async () => {
      const companyList = await fetchSusbscriptions(
        localStorage.getItem("jwtToken"),
      );
      setSubCompany(companyList.data.subscribedCompanies);
    };
    fetchSub();
  }, []);

  const handleToggle = (company: number) => {
    setSelected((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company],
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLogin />
      <div className="p-4">
        <SubscribeListInput />
        <CompanyMultiSelect
          subscriptions={subCompany}
          selected={selected}
          handleToggle={handleToggle}
        />

        <div className="bg-white p-2 rounded-2xl shadow-sm mt-4">
          {selected.length > 0 ? (
            selected.map((company, idx) => (
              <MyGongsiList key={idx} selectedCompany={company} />
            ))
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
      <div>
        <BottomNavigation />
      </div>
    </div>
  );
};
