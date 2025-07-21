import {  useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import JournalForm from "../components/JournalForm";
import MoodChart from "../components/MoodChart";
import { useAuth } from "../context/useAuth";
import { jwtDecode } from "jwt-decode";
import JournalExport from "../components/JournalExport";
import HabitTracker from "../components/HabitTracker";
import { useTheme } from "../context/ThemeContext";

type TokenPayload = {
  id: string; // or _id, depending on how you signed your token
};
function Dashboard() {
 
  const navigate = useNavigate();
   const { token } = useAuth();
   const {mode}=useTheme();
    
    const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
     const getData = async () => {
          if (token) {
            const decoded = jwtDecode<TokenPayload>(token);
            console.log("Decoded token:", decoded);
            setUserId(decoded.id); // or decoded._id
          }
        };
        getData();
  }, [token, navigate]);

  return (
    <div
       className={`min-h-screen px-4 py-6 transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-[#1e1232]"
      }`}
    >
      <JournalForm />
      <button  className={`ml-[20px] mt-4 px-3 py-1.5 rounded-2xl font-medium transition ${
          mode === "dark"
            ? "bg-yellow-400 text-[#1e1232] hover:bg-yellow-300"
            : "bg-blue-400 text-white hover:bg-blue-500"
        }`}
        onClick={() => navigate("/journal-history")}
      >
        View History
      </button>
      <HabitTracker />

        {userId && <MoodChart userId={userId} />}
       <JournalExport userId={userId} />
    </div>
  );
}

export default Dashboard;
