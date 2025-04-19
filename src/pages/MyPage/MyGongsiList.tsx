import React, { useEffect, useState } from "react";
import { GongsiData, fetchGongsiList } from "../../services/gongsiService";
import { GongsiList } from "../../components/GongsiList";

interface Props {
  selectedCompany: number;
}
export const MyGongsiList = ({ selectedCompany }: Props) => {
  const [myGongsi, setMyGongsi] = useState<GongsiData>();
  useEffect(() => {
    const getMyGongsi = async () => {
      try {
        const todayGongsiData = await fetchGongsiList(
          selectedCompany,
          "latest",
          false,
          1,
          null,
          undefined,
          undefined,
        );
        setMyGongsi(todayGongsiData.data);
      } catch (error) {
        console.error("마이 공시리스트 불러오기 에러 : ", error);
      }
    };

    getMyGongsi();
  }, []);
  return (
    <div>
      <GongsiList
        gongsiTitle={myGongsi?.gongsiList[0]?.gongsiTitle}
        gongsiCompany={myGongsi?.gongsiList[0]?.companyName}
        gongsiId={myGongsi?.gongsiList[0]?.gongsiId}
      />
    </div>
  );
};
