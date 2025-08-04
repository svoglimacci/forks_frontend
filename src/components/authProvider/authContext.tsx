import type Keycloak from "keycloak-js";
import { createContext, useContext } from "react";

export interface User {
  id: string;
  email: string;
}

export interface AuthContextProps {
  keycloak: Keycloak | null;
  authenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateToken: (minValidity?: number) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
