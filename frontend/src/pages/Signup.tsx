import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import bgImage from "../assets/signup-bg.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // ✅ now used

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // ✅ use loading state

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const data = await signupUser(name, email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/dashboard");
      } else {
        alert("Signup failed");
      }
    } catch (err) {
      console.log("Error during signup",err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-top flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#0000005d] bg-opacity-50 z-0"></div>

      <div className="relative z-10 bg-white shadow-2xl w-full max-w-[660px]  mx-4 p-[30px] md:p-[80px]">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-[28px] text-start font-bold text-gray-800 mb-4 sm:mb-6">
            Create Your Account
          </h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 sm:space-y-6 mb-[40px]">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-md text-sm sm:text-base"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-md text-sm sm:text-base"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-md text-sm sm:text-base"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-md text-sm sm:text-base"
          />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 sm:px-8 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 text-center sm:text-right"
            >
              Forgot Password
            </a>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 pt-4 sm:pt-6">
          <div className="flex justify-center sm:justify-start space-x-3">
            {/* Social icons here if needed */}
          </div>

          <div className="text-sm text-gray-500 text-center sm:text-right">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
