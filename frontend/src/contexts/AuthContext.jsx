import { createContext, useCallback, useEffect, useState } from "react";
import axiosService from "../services/api";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("stock-inventory-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const registerUser = useCallback(async (fullName, email, password) => {
    const response = await axiosService.register(fullName, email, password);
    return response;
  }, []);

  const loginUser = useCallback(async (email, password) => {
    const response = await axiosService.login(email, password);
    localStorage.setItem("stock-inventory-user", JSON.stringify(response));
    setUser(response);
    return response;
  }, []);

  const verifyEmail = useCallback(async (emailToken) => {
    const response = await axiosService.verifyEmailToken(emailToken);
    return response;
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("stock-inventory-user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        verifyEmail,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
