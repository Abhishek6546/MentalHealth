import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Heart,
  Sparkles,
  Sun,
  Moon,
  Star
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/useAuth.ts';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const { mode, toggleMode } = useTheme();
  const { user } = useAuth();

  const isDarkMode = mode === 'dark';

  return (
    <nav className={`backdrop-blur-md bg-opacity-90 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white/90'
    } shadow-lg sticky top-0 z-50 border-b ${
      isDarkMode ? 'border-gray-700' : 'border-blue-100'
    } transition-all duration-300`}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* Use the heart icon logo design from second navbar */}
            <div className="relative">
              <Heart className={`h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <Sparkles className={`h-4 w-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} absolute -top-1 -right-1 animate-pulse`} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-blue-400 to-green-400' 
                  : 'from-blue-600 to-green-600'
              } bg-clip-text text-transparent`}>
                MindFree
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Your Wellness Journey
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-6 text-[18px] font-medium">
            <li>
              <Link to="/" className={`${
                isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-blue-600'
              } transition-all duration-300 font-medium relative group`}>
                Home
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                } group-hover:w-full transition-all duration-300`}></span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={`${
                isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-blue-600'
              } transition-all duration-300 font-medium relative group`}>
                Dashboard
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                } group-hover:w-full transition-all duration-300`}></span>
              </Link>
            </li>
            <li>
              <Link to="/Exercise" className={`${
                isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-blue-600'
              } transition-all duration-300 font-medium relative group`}>
                Exercise
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                } group-hover:w-full transition-all duration-300`}></span>
              </Link>
            </li>
            <li>
              <Link to="/resources" className={`${
                isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-blue-600'
              } transition-all duration-300 font-medium relative group`}>
                Resources
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                } group-hover:w-full transition-all duration-300`}></span>
              </Link>
            </li>
            {user ? (
              <li>
                <Link to="/profile" className={`${
                  isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-blue-600'
                } transition-all duration-300 font-medium relative group`}>
                  Profile
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                    isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                  } group-hover:w-full transition-all duration-300`}></span>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className={`${
                  isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-blue-600'
                } transition-all duration-300 font-medium relative group`}>
                  Login
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                    isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                  } group-hover:w-full transition-all duration-300`}></span>
                </Link>
              </li>
            )}
            <li>
              {/* Animated Theme Toggle */}
              <button
                onClick={toggleMode}
                className={`relative w-16 h-8 rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30' 
                    : 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/30'
                }`}
              >
                {/* Toggle Circle */}
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-500 ease-in-out flex items-center justify-center ${
                  isDarkMode ? 'translate-x-8' : 'translate-x-0'
                }`}>
                  {isDarkMode ? (
                    <Moon className="h-3 w-3 text-indigo-600" />
                  ) : (
                    <Sun className="h-3 w-3 text-yellow-500" />
                  )}
                </div>
                
                {/* Background Stars/Sun rays */}
                <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                  <Sun className={`h-4 w-4 text-white transition-opacity duration-300 ${
                    isDarkMode ? 'opacity-30' : 'opacity-100'
                  }`} />
                  <div className="flex space-x-0.5">
                    <Star className={`h-2 w-2 text-white transition-opacity duration-300 ${
                      isDarkMode ? 'opacity-100' : 'opacity-30'
                    }`} />
                    <Star className={`h-1.5 w-1.5 text-white transition-opacity duration-500 delay-100 ${
                      isDarkMode ? 'opacity-80' : 'opacity-20'
                    }`} />
                    <Star className={`h-1 w-1 text-white transition-opacity duration-700 delay-200 ${
                      isDarkMode ? 'opacity-60' : 'opacity-10'
                    }`} />
                  </div>
                </div>
              </button>
            </li>
          </ul>

          {/* Mobile/Tablet Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleMode}
              className={`relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30' 
                  : 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/30'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-500 ease-in-out flex items-center justify-center ${
                isDarkMode ? 'translate-x-7' : 'translate-x-0'
              }`}>
                {isDarkMode ? (
                  <Moon className="h-3 w-3 text-indigo-600" />
                ) : (
                  <Sun className="h-3 w-3 text-yellow-500" />
                )}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                <Sun className={`h-3 w-3 text-white transition-opacity duration-300 ${
                  isDarkMode ? 'opacity-30' : 'opacity-100'
                }`} />
                <div className="flex space-x-0.5">
                  <Star className={`h-1.5 w-1.5 text-white transition-opacity duration-300 ${
                    isDarkMode ? 'opacity-100' : 'opacity-30'
                  }`} />
                  <Star className={`h-1 w-1 text-white transition-opacity duration-500 delay-100 ${
                    isDarkMode ? 'opacity-80' : 'opacity-20'
                  }`} />
                </div>
              </div>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-all duration-300`}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className={`lg:hidden py-4 border-t ${
            isDarkMode ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'
          } backdrop-blur-sm transition-all duration-300`}>
            <nav className="flex flex-col space-y-2 font-medium">
              <Link 
                to="/" 
                onClick={closeMenu} 
                className={`px-4 py-3 ${
                  isDarkMode 
                    ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                } rounded-lg transition-all duration-300`}
              >
                Home
              </Link>
              <Link 
                to="/signup" 
                onClick={closeMenu} 
                className={`px-4 py-3 ${
                  isDarkMode 
                    ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-[#1e1232] hover:text-gray-600 hover:bg-blue-50'
                } rounded-lg transition-all duration-300`}
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                onClick={closeMenu} 
                className={`px-4 py-3 ${
                  isDarkMode 
                    ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-[#1e1232] hover:text-gray-600 hover:bg-blue-50'
                } rounded-lg transition-all duration-300`}
              >
                Login
              </Link>
              <Link 
                to="/dashboard" 
                onClick={closeMenu} 
                className={`px-4 py-3 ${
                  isDarkMode 
                    ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-[#1e1232] hover:text-gray-600 hover:bg-blue-50'
                } rounded-lg transition-all duration-300`}
              >
                Dashboard
              </Link>
              <Link 
                to="/Exercise" 
                onClick={closeMenu} 
                className={`px-4 py-3 ${
                  isDarkMode 
                    ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-[#1e1232] hover:text-gray-600 hover:bg-blue-50'
                } rounded-lg transition-all duration-300`}
              >
                Exercise
              </Link>
              <Link 
                to="/profile" 
                onClick={closeMenu} 
                className={`px-4 py-3 ${
                  isDarkMode 
                    ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-[#1e1232] hover:text-gray-600 hover:bg-blue-50'
                } rounded-lg transition-all duration-300`}
              >
                Profile
              </Link>
              <Link 
                to="/resources" 
                onClick={closeMenu} 
                className={`px-4 py-3 ${
                  isDarkMode 
                    ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-[#1e1232] hover:text-gray-600 hover:bg-blue-50'
                } rounded-lg transition-all duration-300`}
              >
                Resources
              </Link>
              <Link 
                to="/journal-history" 
                onClick={closeMenu} 
                className={`px-4 py-3 ${
                  isDarkMode 
                    ? 'text-white hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-[#1e1232] hover:text-gray-600 hover:bg-blue-50'
                } rounded-lg transition-all duration-300`}
              >
                Journal History
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;