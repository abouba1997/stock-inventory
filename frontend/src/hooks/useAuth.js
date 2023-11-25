import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Authentication not defined within this scope.");
  }

  return context;
};
