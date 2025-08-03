import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import logo from './../assets/header-new-logo.svg';
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import { FiSun } from 'react-icons/fi'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { useAuth } from '../context/useAuth.ts';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const { mode, toggleMode } = useTheme();
  const { user} = useAuth();

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md bg-opacity-90 ${mode === 'dark'
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-r from-[#f4ede4] to-[#e9f4f4] text-[#1e1232]'
        } py-4 shadow-sm transition-colors duration-300`}
    >
      <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="MentalCare Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Nav (only visible on lg and above) */}
        <ul className="hidden lg:flex space-x-6 text-[18px] font-medium">
          <li><Link to="/" className={mode === 'dark' ? 'text-white hover:text-gray-300' : 'text-[#1e1232] hover:text-gray-600'}>Home</Link></li>

          <li><Link to="/dashboard" className={mode === 'dark' ? 'text-white hover:text-gray-300' : 'text-[#1e1232] hover:text-gray-600'}>Dashboard</Link></li>
          <li><Link to="/Exercise" className={mode === 'dark' ? 'text-white hover:text-gray-300' : 'text-[#1e1232] hover:text-gray-600'}>Exercise</Link></li>
          <li><Link to="/resources" className={mode === 'dark' ? 'text-white hover:text-gray-300' : 'text-[#1e1232] hover:text-gray-600'}>Resources</Link></li>
          {user ? <li><Link to="/profile" className={mode === 'dark' ? 'text-white hover:text-gray-300' : 'text-[#1e1232] hover:text-gray-600'}>Profile</Link></li>
            :
            <li><Link to="/login" className={mode === 'dark' ? 'text-white hover:text-gray-300' : 'text-[#1e1232] hover:text-gray-600'}>Login</Link></li>
          }

          <li>
            {/* Theme Switcher */}
            <button onClick={toggleMode} className="hidden lg:flex items-center space-x-2">
              {mode === 'light' ? (
                <FiSun className="text-2xl " />
              ) : (
                <BsFillCloudSunFill className="text-2xl text-gray-400" />
              )}
            </button>
          </li>
        </ul>

        {/* Desktop Button (only visible on lg and above) */}
        {/* Remove Contact Us button since no contact page exists */}

        {/* Mobile / Tablet Menu Toggle (visible on md and below) */}
        <div className="lg:hidden">
          <div className="lg:hidden">
            <button onClick={toggleMode} className="mr-4">
              {mode === 'light' ? (
                <FiSun className="text-2xl" />
              ) : (
                <BsFillCloudSunFill className="text-2xl text-gray-400" />

              )}
            </button>
            <button onClick={toggleMenu}>
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <HiOutlineMenuAlt3 className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      {menuOpen && (
        <div
          className={`lg:hidden px-6 pt-4 pb-6 font-medium space-y-4 ${mode === 'dark'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-[#1e1232]'
            }`}
        >
          <Link to="/" onClick={closeMenu} className="block">Home</Link>
          <Link to="/signup" onClick={closeMenu} className="block">Sign Up</Link>
          <Link to="/login" onClick={closeMenu} className="block">Login</Link>
          <Link to="/dashboard" onClick={closeMenu} className="block">Dashboard</Link>
          <Link to="/Exercise" onClick={closeMenu} className="block">Exercise</Link>
          <Link to="/profile" onClick={closeMenu} className="block">Profile</Link>
          <Link to="/resources" onClick={closeMenu} className="block">Resources</Link>
          <Link to="/journal-history" onClick={closeMenu} className="block">Journal History</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;