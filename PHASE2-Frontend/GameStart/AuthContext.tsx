import React, { createContext, useContext, useState } from "react";

type OrderItem = {
  name: string;
  qty: number;
};

type Order = {
  id: string;
  date: string;
  items: OrderItem[];
};

export type User = {
  first?: string;
  last?: string;
  email: string;
  orders?: Order[];   // ⬅️ NEW
};


type AuthContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
