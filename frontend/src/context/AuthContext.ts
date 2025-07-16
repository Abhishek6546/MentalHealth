import { createContext } from "react";

import type { UserType } from "../pages/ProfilePage";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  user: UserType | null;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout:()=>{},
  user: null,
});
export type { AuthContextType };

