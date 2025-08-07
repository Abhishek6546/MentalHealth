import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/ThemeContext";
import { ZodError } from "zod";
import { signupSchema } from "../services/validationSchemas";
import { 
  Mail, 
  Lock, 
  User,
  Eye, 
  EyeOff,  
  Sparkles, 
  Star,
  ArrowRight,
  Loader2
} from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setToken } = useAuth();
  const { mode } = useTheme();
  const navigate = useNavigate();

  const isDarkMode = mode === "dark";

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      signupSchema.parse(formData);
      const { name, email, password } = formData;
      const data = await signupUser(name, email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      if (err instanceof ZodError) {
        alert(err.issues[0].message);
      } else {
        console.error("Signup error occur:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className={`absolute top-20 left-20 w-32 h-32 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-300'} rounded-full opacity-20 animate-pulse`}></div>
        <div className={`absolute top-40 right-32 w-24 h-24 ${isDarkMode ? 'bg-purple-600' : 'bg-purple-300'} rounded-full opacity-30 animate-bounce`} style={{animationDelay: '1s'}}></div>
        <div className={`absolute bottom-32 left-1/4 w-40 h-40 ${isDarkMode ? 'bg-pink-600' : 'bg-pink-300'} rounded-full opacity-10 animate-pulse`} style={{animationDelay: '2s'}}></div>
        <div className={`absolute bottom-20 right-20 w-28 h-28 ${isDarkMode ? 'bg-green-600' : 'bg-green-300'} rounded-full opacity-25 animate-bounce`} style={{animationDelay: '0.5s'}}></div>
        
        {/* Floating Stars */}
        <Star className={`absolute top-16 right-16 h-6 w-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} animate-pulse`} style={{animationDelay: '0.2s'}} />
        <Star className={`absolute bottom-16 left-16 h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} animate-pulse`} style={{animationDelay: '1.5s'}} />
        <Sparkles className={`absolute top-1/3 left-12 h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'} animate-pulse`} style={{animationDelay: '3s'}} />
        <Sparkles className={`absolute bottom-1/3 right-12 h-6 w-6 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'} animate-pulse`} style={{animationDelay: '2.5s'}} />
      </div>

      {/* Signup Form Container */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        {/* Main Card */}
        <div className={`
          ${isDarkMode 
            ? 'bg-gray-800/90 border-gray-700' 
            : 'bg-white/90 border-white/50'
          } 
          backdrop-blur-xl rounded-3xl shadow-2xl border p-8 transform hover:scale-[1.02] transition-all duration-500
          ${isDarkMode ? 'shadow-2xl shadow-purple-900/50' : 'shadow-2xl shadow-blue-500/20'}
        `}>
          {/* Logo and Header */}
          <div className="text-center mb-8">
        
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
              Create Your Account
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Start your mental wellness journey today
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name and Email Inputs - Side by side on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative group">
                  <User className={`absolute left-4 top-4 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-blue-500 transition-colors`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className={`
                      w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                        : 'bg-white/50 border-gray-200 text-gray-800 placeholder-gray-500 focus:bg-white'
                      }
                      hover:border-blue-300 transform hover:scale-[1.02]
                    `}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-4 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-blue-500 transition-colors`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className={`
                      w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                        : 'bg-white/50 border-gray-200 text-gray-800 placeholder-gray-500 focus:bg-white'
                      }
                      hover:border-blue-300 transform hover:scale-[1.02]
                    `}
                  />
                </div>
              </div>
            </div>

            {/* Password and Confirm Password Inputs - Side by side on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Password Input */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-4 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-blue-500 transition-colors`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className={`
                      w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                        : 'bg-white/50 border-gray-200 text-gray-800 placeholder-gray-500 focus:bg-white'
                      }
                      hover:border-blue-300 transform hover:scale-[1.02]
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-4 h-5 w-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-4 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-blue-500 transition-colors`} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className={`
                      w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                        : 'bg-white/50 border-gray-200 text-gray-800 placeholder-gray-500 focus:bg-white'
                      }
                      hover:border-blue-300 transform hover:scale-[1.02]
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-4 top-4 h-5 w-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
                bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
                transform hover:scale-105 transition-all duration-300 
                shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                disabled:transform-none flex items-center justify-center space-x-2
                ${isLoading ? 'animate-pulse' : ''}
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing up...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>


          </form>

      
          {/* Login Link */}
          <div className="text-center mt-2">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account?{" "}
              <Link 
                to="/login" 
                className={`font-semibold ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Floating Elements */}
        <div className="absolute -top-4 -right-4 opacity-50">
          <div className={`w-8 h-8 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'} rounded-full animate-bounce`} style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute -bottom-4 -left-4 opacity-50">
          <div className={`w-6 h-6 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'} rounded-full animate-bounce`} style={{animationDelay: '2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;