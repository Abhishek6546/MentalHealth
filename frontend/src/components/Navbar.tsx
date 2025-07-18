import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
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
          <li><Link to="/about" className="hover:text-gray-600 transition">About Us</Link></li>
          <li><Link to="/services" className="hover:text-gray-600 transition">Services</Link></li>
          <li><Link to="/therapists" className="hover:text-gray-600 transition">Therapists</Link></li>
          <li><Link to="/pages" className="hover:text-gray-600 transition">Pages</Link></li>
          <li><Link to="/blog" className="hover:text-gray-600 transition">Blog</Link></li>
        </ul>

        {/* Desktop Button (only visible on lg and above) */}
        <div className="hidden lg:flex">
          <Link
            to="/login"
            className="bg-[hashtag#1e1232] text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-[hashtag#3a2a56] transition"
          >
            Contact Us <FaArrowRight className="text-sm" />
          </Link>
        </div>

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
          <Link to="/about" onClick={closeMenu} className="block">About Us</Link>
          <Link to="/services" onClick={closeMenu} className="block">Services</Link>
          <Link to="/therapists" onClick={closeMenu} className="block">Therapists</Link>
          <Link to="/pages" onClick={closeMenu} className="block">Pages</Link>
          <Link to="/blog" onClick={closeMenu} className="block">Blog</Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="inline-flex items-center gap-2 bg-[hashtag#1e1232] text-white px-5 py-2 rounded-full mt-4"
          >
            Contact Us <FaArrowRight className="text-sm" />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;