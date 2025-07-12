
function Footer() {
  return (
    <footer className="bg-blue-600 text-white px-6 py-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* About */}
        <div>
          <h4 className="text-lg font-semibold mb-2">About Us</h4>
          <p className="text-sm text-gray-200">
            We're dedicated to supporting your mental health through accessible, compassionate, and professional care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-200">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-sm text-gray-200">Email: support@mindcare.com</p>
          <p className="text-sm text-gray-200">Phone: +91 12345 67890</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-300 mt-8">
        © {new Date().getFullYear()} MindCare. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
