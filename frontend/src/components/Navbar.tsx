import { Link } from 'react-router-dom';

import { useAuth } from "../context/useAuth";

function Navbar() {
  const { token } = useAuth();

  return (
    <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo / Brand */}
      <div className="text-2xl font-semibold tracking-wide">
        <Link to="/">MindCare</Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-sm md:text-base items-center">
        <li>
          <Link to="/dashboard" className="hover:text-gray-200 transition">Dashboard</Link>
        </li>
        <li>
          <Link to="/resources" className="hover:text-gray-200 transition">Resources</Link>
        </li>
        <li>
          <Link to="/therapy" className="hover:text-gray-200 transition">Therapy</Link>
        </li>
        <li>
          <Link to="/exercise" className="hover:text-gray-200 transition">Exercise</Link>
        </li>

        {token ? (
          <li>
            <Link to="/profile" className="hover:text-gray-200 transition">Profile</Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
