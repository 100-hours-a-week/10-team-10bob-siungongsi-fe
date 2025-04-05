import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  logout: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  logout: () => {},
  setIsLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (token: string): boolean => {
  try {
    const exp = jwtDecode<any>(token);
    return exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("jwtToken");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    if (!isMobile) {
      navigate(0);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
