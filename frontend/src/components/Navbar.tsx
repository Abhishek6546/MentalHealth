import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo / Brand */}
      <div className="text-2xl font-semibold tracking-wide">
        <Link to="/">MindCare</Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-sm md:text-base">
        <li>
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-200 transition">About</Link>
        </li>
        <li>
          <Link to="/therapy" className="hover:text-gray-200 transition">Therapy</Link>
        </li>
        <li>
          <Link to="/resources" className="hover:text-gray-200 transition">Resources</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
