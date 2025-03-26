// pages/LoginPage.tsx

import { useNavigate } from "react-router-dom";
import { LoginSlider } from "../components/LoginSlider";

export const LoginPage = () => {
  const navigate = useNavigate();
  return <LoginSlider isOpen={true} onClose={() => navigate(-1)} />;
};

export default LoginPage;
