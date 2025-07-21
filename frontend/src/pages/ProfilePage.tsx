import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export interface UserType {
  name?: string;
  email: string;
  // add more fields if your backend returns them
}
const ProfilePage = () => {
  const { user, token, logout } = useAuth();
  const { mode } = useTheme();
  const [entryCount, setEntryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCount = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";
      const res = await fetch(`${apiUrl}api/journal`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEntryCount(data.length);
    };
    fetchCount();
  }, [token, navigate]);

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded shadow text-center mt-8 transition-colors duration-300 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-[#1e1232]"
        }`}
    >
      <h2 className="text-xl font-bold mb-2">👤 Profile</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Total Journal Entries:</strong> {entryCount}</p>

      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
