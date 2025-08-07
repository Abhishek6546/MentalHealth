
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../pages/ProfilePage";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  
const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("token")
     navigate("/login")
     window.location.reload();
  }
  const fetchUserProfile= async()=>{
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";
    const res =await fetch(`${apiUrl}api/auth/user`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
   if(!res.ok){
    throw "user proile not fetched"
   }
    const data= await res.json();
    setUser(data.user)
  }

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
    if (token) fetchUserProfile(); // fetch only if token exists
  }, [token]);
  

  return (
    <AuthContext.Provider value={{ token, setToken,logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};