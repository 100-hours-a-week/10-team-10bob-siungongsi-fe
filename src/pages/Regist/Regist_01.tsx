import React, { useState } from "react";
import { Header } from "../../components/Header";
import { RadioButton } from "../../components/RadioButton";
import { ScrollDown } from "../../components/Icons/ScrollDown";
import { RegistContent } from "./RegistContent";
import { ReactComponent as Close } from "../../assets/close-svgrepo-com.svg";
import { registInfo } from "./RegistContentDummy";

export const Regist = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState([false, false]);

  const handleAllClick = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setChecks([newState, newState]);
  };
  const handleSingleClick = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];

    setChecks(newChecks);
    setAllChecked(newChecks.every((check) => check));
  };
  return (
    <div>
      <Header isLogin={false} />
      <div className="flex  flex-col gap-4 p-4">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">약관동의</div>
          <div>
            {/*나중에 onClick으로 뒤로가기 효과 넣기 */}
            <Close />
          </div>
        </div>
        <div className="flex items-center border-b gap-2 py-2">
          <div>
            <RadioButton isClick={allChecked} onClick={handleAllClick} />
          </div>
          <div>약관에 전체 동의합니다</div>
        </div>
        {registInfo.map((info, index) => (
          <RegistContent
            title={info.title}
            termsOfUse={info.termsOfUse}
            checks={checks}
            handleSingleClick={handleSingleClick}
            index={index}
          />
        ))}
      </div>
      <div
        className={`m-12 p-4 rounded-xl text-center text-white transition ease-in-out ${allChecked ? "bg-primary cursor-pointer" : "bg-gray-300"}  `}
      >
        다음으로
      </div>
    </div>
  );
};
