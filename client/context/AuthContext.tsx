// AuthContext.tsx
import React, { createContext, useState, ReactNode } from "react";
// import checkAuth from "@/services/checkAuth";

interface User {
  fullName: string;
  email: string;
  _id: string;

}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData: User) => {
    try {
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error setting token in local storage", err);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export type { AuthContextType };
