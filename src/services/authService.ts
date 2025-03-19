import api from "../api/api";

interface termsOfUse {
  id: number;
  title: string;
  content: string;
}

const apiKey = process.env.REACT_APP_API_URL;

// 약관 불러오기
export const fetchTermsOfUse = async (): Promise<termsOfUse[]> => {
  try {
    const response = await api.get<termsOfUse[]>(`${apiKey}auth/terms`);
    return response.data;
  } catch (error) {
    console.error("이용 약관 불러오기 에러: ", error);
    throw error;
  }
};
