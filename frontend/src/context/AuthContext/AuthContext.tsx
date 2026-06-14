import { createContext } from "react";
import type { AuthContextType } from "../../Types";

export const AuthContext = createContext<AuthContextType | null>(null);
