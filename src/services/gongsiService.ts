import api from "../api/api";
interface APIData {
  code: number;
  message: string;
  data: GongsiData;
}
export interface GongsiData {
  gongsiList: Gongsi[];
  gongsiListSize: number;
  pagination: pagination;
}
interface Gongsi {
  gongsiId: number;
  gongsiTitle: string;
  companyName: string;
  publishedDatetime: Date;
  content: null;
}
interface pagination {
  currentPage: number;
  totalPages: number;
  totalResults: number;
}
const apiKey = process.env.REACT_APP_API_URL;

// 공시목록 불러오기
export const fetchGongsiList = async (
  companyId: number | null,
  sortCondition: string | null,
  contentVisible: boolean | null,
  page: number | null,
  size: number | null,
  startDate: Date | null,
  endDate: Date | null,
): Promise<APIData> => {
  try {
    const response = await api.get<APIData>(
      `${apiKey}gongsi?companyId=${companyId ? companyId : ""}&sort=${sortCondition ? sortCondition : ""}&content=${contentVisible ? contentVisible : ""}&page=${page ? page : ""}&size=${size ? size : ""}&startDate=${startDate ? startDate : ""}&endDate=${endDate ? endDate : ""}`,
    );
    return response.data;
  } catch (error) {
    console.error("공시목록 불러오기 에러: ", error);
    throw error;
  }
};
