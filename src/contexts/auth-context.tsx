"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AuthContextType {
  errors: Array<string>;
  normalMessages: Array<string>;
  setErrors: Dispatch<SetStateAction<string[]>>;
  setNormalMessages: Dispatch<SetStateAction<string[]>>;
}

const AuthContext = createContext<AuthContextType>({
  errors: [],
  normalMessages: [],
  setErrors() {},
  setNormalMessages() {},
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const [normalMessages, setNormalMessages] = useState<string[]>([]);

  return (
    <AuthContext.Provider
      value={{ errors, setErrors, normalMessages, setNormalMessages }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Anda menggunakan context di luar jangkauan");

  return context;
}
