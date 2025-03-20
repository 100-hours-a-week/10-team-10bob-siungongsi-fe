import api from "../api/api";

export interface termsOfUse {
  termsId: number;
  termsTitle: string;
  termsContent: string;
}

const apiKey = process.env.REACT_APP_API_URL;

// 약관 불러오기
export const fetchTermsOfUse = async (): Promise<{
  code: number;
  message: string;
  data: termsOfUse[];
}> => {
  try {
    const response = await api.get<{
      code: number;
      message: string;
      data: termsOfUse[];
    }>(`${apiKey}auth/terms`);
    return response.data;
  } catch (error) {
    console.error("이용 약관 불러오기 에러: ", error);
    throw error;
  }
};
