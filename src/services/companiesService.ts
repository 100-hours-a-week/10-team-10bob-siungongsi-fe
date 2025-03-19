import api from "../api/api";

type Company = {
  companyId: number;
  companyName: string;
};
interface Companies {
  companyNameListSize: number;
  companyNameList: Company[];
}

const apiKey = process.env.REACT_APP_API_URL;
