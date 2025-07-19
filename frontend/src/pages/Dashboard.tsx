import {  useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import JournalForm from "../components/JournalForm";
import MoodChart from "../components/MoodChart";
import { useAuth } from "../context/useAuth";
import { jwtDecode } from "jwt-decode";
import JournalExport from "../components/JournalExport";
import HabitTracker from "../components/HabitTracker";

type TokenPayload = {
  id: string; // or _id, depending on how you signed your token
};
function Dashboard() {
 
  const navigate = useNavigate();
   const { token } = useAuth();
    
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
    <div>
      <JournalForm />
      <button className="ml-[20px] bg-blue-400  px-2.5 py-1 rounded-2xl" onClick={() => navigate("/journal-history")}>
        View History
      </button>
      <HabitTracker />

        {userId && <MoodChart userId={userId} />}
       <JournalExport userId={userId} />
    </div>
  );
}

export default Dashboard;
