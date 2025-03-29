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
): Promise<APIData> => {
  try {
    const response = await api.get<APIData>(
      `${apiKey}companies/name?keyword=${keyword}`,
    );
    return response.data;
  } catch (error) {
    console.error("기업명 자동완성 목록 불러오기 에러: ", error);
    throw error;
  }
};
