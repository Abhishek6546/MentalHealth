import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JournalForm from "../components/JournalForm";
import JournalHistory from "../components/JournalHistory";
import { AuthContext } from "../context/AuthContext"; // update path if needed
import HabitTracker from "../components/HabitTracker";

function Dashboard() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <JournalForm />
      <JournalHistory />
      <HabitTracker/>
    </div>
  );
}

export default Dashboard;
