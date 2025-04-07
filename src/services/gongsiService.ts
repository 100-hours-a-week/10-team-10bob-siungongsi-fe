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

interface APIDataDetail {
  code: number;
  message: string;
  data: GongsiInfo;
}
export interface GongsiInfo {
  gongsi: GongsiContent;
  company: CompanyInfo;
}
interface GongsiContent {
  id: number;
  title: string;
  date: string;
  viewCount: number;
  content: string;
  originalUrl: string;
}
interface CompanyInfo {
  id: number;
  name: string;
  prdyCtr: number;
  isSubscribed: boolean;
}
const apiKey = process.env.REACT_APP_API_URL;

// 공시목록 불러오기
export const fetchGongsiList = async (
  companyId: number | undefined,
  sortCondition: string | null,
  contentVisible: boolean | null,
  page: number | null,
  size: number | null,
  startDate: string | undefined,
  endDate: string | undefined,
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

//공시 상세조회
export const fetchGongsiDetail = async (
  gongsiId: number,
  accessToken: string | null,
): Promise<APIDataDetail> => {
  try {
    const response = await api.get<APIDataDetail>(
      `${apiKey}gongsi/${gongsiId}`,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : undefined,
    );
    return response.data;
  } catch (error) {
    console.error("공시 상세보기 에러 : ", error);
    throw error;
  }
};
