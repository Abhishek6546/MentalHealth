import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  user:null;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout:()=>{},
  user:null
});
export type { AuthContextType };

