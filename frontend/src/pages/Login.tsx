import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full border p-2 rounded" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
