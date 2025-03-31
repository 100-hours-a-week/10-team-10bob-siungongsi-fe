import api from "../api/api";
interface APIData {
  code: number;
  message: string;
  data: Companies;
}
export interface Companies {
  companyNameListSize: number;
  companyNameList: Company[];
}
export type Company = {
  companyId: number;
  companyName: string;
};

const apiKey = process.env.REACT_APP_API_URL;
export const fetchCompanyNameList = async (
  keyword: string,
  signal?: AbortSignal,
): Promise<APIData> => {
  try {
    const response = await api.get<APIData>(
      `${apiKey}companies/name?keyword=${keyword}`,
      { signal },
    );
    return response.data;
  } catch (error: any) {
    if (error.name === "CanceledError") {
      console.log("요청 취소됨");
    } else {
      console.error("기업명 자동완성 목록 불러오기 에러: ", error);
    }

    throw error;
  }
};
