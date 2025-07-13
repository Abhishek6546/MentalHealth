import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, token, logout } = useAuth();
  const [entryCount, setEntryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCount = async () => {
      const res = await fetch("http://localhost:5000/api/journal", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEntryCount(data.length);
    };
    fetchCount();
  }, [token, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center mt-8">
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
