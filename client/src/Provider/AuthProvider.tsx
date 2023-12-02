import { useAccount } from "@/hooks/user/useAccount";
import { User } from "@/types";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navigate = useNavigate();

  const guestpath = ["/", "/register", "/login"];
  const isGuestPath = guestpath.includes(location.pathname);

  const userQuery = useAccount({
    enabled: !isGuestPath,
  });

  if (userQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (userQuery.isError) {
    navigate("/login");
  }

  const user = userQuery.data;

  const value = { user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
