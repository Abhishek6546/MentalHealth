import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import logo from './../assets/footer-logo.svg'; // adjust the path if needed

function Footer() {
  return (
    <footer className="bg-[hashtag#1e1232] text-white py-12 px-6">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Email Section */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img src={logo} alt="MentalCare Logo" className="h-12 w-auto" />
          </div>
          <p className="text-sm text-gray-300 mb-6">
            Start your path to psychological wellness with our thoroughly selected specialists.
          </p>
          <form className="flex items-center bg-white rounded-full overflow-hidden w-full max-w-sm">
            <input
              type="email"
              placeholder="Email*"
              className="flex-grow px-4 py-2 text-black focus:outline-none"
            />
            <button type="submit" className="bg-[hashtag#c9e3fa] w-10 h-10 flex items-center justify-center rounded-full">
              <span className="text-[hashtag#1e1232] text-xl mb-1">→</span>
            </button>

          </form>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-lg font-serif font-semibold mb-4">Pages</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Our Services</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Contacts</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">Image Credits</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-serif font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Anxiety</li>
            <li>Relationships</li>
            <li>Eating Disorders</li>
            <li>Depression</li>
            <li>ADHD</li>
            <li>Childhood Abuse</li>
            <li>OCD</li>
            <li>Trauma</li>
          </ul>
        </div>

        {/* Therapists */}
        <div>
          <h3 className="text-lg font-serif font-semibold mb-4">Therapists</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Mark Hoffman</li>
            <li>Anne Middleton</li>
            <li>Whitney Pratt</li>
            <li>Jane Goodman</li>
            <li>Martha Ruiz</li>
            <li>Kate Adams</li>
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="max-w-[1240px] mx-auto mt-10 px-2 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 text-center md:text-left">
          This is a sample website – cmsmasters © 2025 – All Rights Reserved
        </p>
        <div className="flex space-x-3">
          <a href="#" className="bg-[hashtag#c9e3fa] text-[hashtag#1e1232] p-2 rounded-full hover:scale-105 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="bg-[hashtag#c9e3fa] text-[hashtag#1e1232] p-2 rounded-full hover:scale-105 transition">
            <FaInstagram />
          </a>
          <a href="#" className="bg-[hashtag#c9e3fa] text-[hashtag#1e1232] p-2 rounded-full hover:scale-105 transition">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;