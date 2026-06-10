import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../Types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const isEmployee = user?.role === "employee";

  return (
    <AuthContext.Provider value={{ user, token, isEmployee, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}