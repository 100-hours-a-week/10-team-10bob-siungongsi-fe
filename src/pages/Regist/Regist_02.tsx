import { Header } from "../../components/Header";

import { BottomNavigation } from "../../components/BottomNavigation";

import { SelectAlarm } from "../../components/SelectAlarm/SelectAlarm";

export const Regist_02 = () => {
  return (
    <div>
      <Header />
      <div className="p-2">
        <div className="font-bold text-xl mb-4">알림연결</div>
        <SelectAlarm />
      </div>
      <BottomNavigation />
    </div>
  );
};
