import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
