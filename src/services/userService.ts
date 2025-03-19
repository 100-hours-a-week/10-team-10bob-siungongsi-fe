// src/services/userService.ts
import api from "../api/api";

// 🔹 사용자 데이터 타입 정의
interface termsOfUse {
  id: number;
  title: string;
  content: string;
  required_flag: number;
  created_dt: Date;
}

const apiKey = process.env.REACT_APP_API_URL;

// 약관 불러오기
export const fetchTermsOfUse = async (): Promise<termsOfUse[]> => {
  try {
    const response = await api.get<termsOfUse[]>(`${apiKey}terms`);
    return response.data;
  } catch (error) {
    console.error("사용자 데이터를 불러오는 중 오류 발생:", error);
    throw error;
  }
};

// // 🔹 특정 사용자 가져오기 (GET 요청)
// export const fetchUserById = async (id: number): Promise<User> => {
//   try {
//     const response = await api.get<User>(`/users/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('사용자 정보를 불러오는 중 오류 발생:', error);
//     throw error;
//   }
// };

// // 🔹 새로운 사용자 생성 (POST 요청)
// export const createUser = async (userData: Partial<User>): Promise<User> => {
//   try {
//     const response = await api.post<User>('/users', userData);
//     return response.data;
//   } catch (error) {
//     console.error('사용자 생성 중 오류 발생:', error);
//     throw error;
//   }
// };
