import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import logo from './../assets/header-logo.svg';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-[hashtag#f4ede4] to-[hashtag#e9f4f4] text-[hashtag#1e1232] py-4 shadow-sm">
      <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="MentalCare Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Nav (only visible on lg and above) */}
        <ul className="hidden lg:flex space-x-6 text-[18px] font-medium">
          <li><Link to="/" className="hover:text-gray-600 transition">Home</Link></li>
 
          <li><Link to="/dashboard" className="hover:text-gray-600 transition">Dashboard</Link></li>
          <li><Link to="/Exercise" className="hover:text-gray-600 transition">Exercise</Link></li>
          <li><Link to="/resources" className="hover:text-gray-600 transition">Resources</Link></li>
          <li><Link to="/profile" className="hover:text-gray-600 transition">Profile</Link></li>
 
          <li><Link to="/login" className="hover:text-gray-600 transition">Login</Link></li>
        </ul>

        {/* Desktop Button (only visible on lg and above) */}
        {/* Remove Contact Us button since no contact page exists */}

        {/* Mobile / Tablet Menu Toggle (visible on md and below) */}
        <div className="lg:hidden">
          <div className="lg:hidden">
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
        <div className="lg:hidden px-6 pt-4 pb-6 bg-[hashtag#f4ede4] text-[hashtag#1e1232] font-medium space-y-4">
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