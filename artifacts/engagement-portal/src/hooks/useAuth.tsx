import React, { createContext, useContext, useState, useCallback } from "react";

const AUTH_PASSWORD = "HealthTrixss@06242026";
const AUTH_EMAILS = [
  "samirrawat@healthtrixss.com",
  "jaybaker@healthtrixss.com",
  "sandra.weiler@mercy.net",
  "kate.mcclure@corrohealth.com",
  "lou.steinberg@corrohealth.com",
  "kenny.misir@corrohealth.com",
].map((e) => e.toLowerCase());
const STORAGE_KEY = "ht-portal-auth";

type AuthContextValue = {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && AUTH_EMAILS.includes(stored.toLowerCase())) {
        return stored.toLowerCase();
      }
      if (stored) {
        localStorage.removeItem(STORAGE_KEY);
      }
      return null;
    } catch {
      return null;
    }
  });

  const login = useCallback((inputEmail: string, password: string) => {
    const normalized = inputEmail.trim().toLowerCase();
    if (AUTH_EMAILS.includes(normalized) && password === AUTH_PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, normalized);
      } catch {
        /* ignore persistence errors */
      }
      setEmail(normalized);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: email !== null, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
