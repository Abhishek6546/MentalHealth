import { useTheme } from '../context/ThemeContext';
import contactImg from "../assets/contact-img.svg";

const ContactSection = () => {
  const { mode } = useTheme();

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 py-16 transition ${
        mode === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-[#f9f4f0] to-[#edf6f3] text-[#1e1232]'
      }`}
    >
      <div
        className={`max-w-6xl w-full rounded-3xl shadow-md p-10 md:p-16 flex flex-col md:flex-row gap-10 transition ${
          mode === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Left Image */}
        <div className="w-full max-w-md object-contain">
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2">
          <p
            className={`text-sm uppercase tracking-widest mb-3 ${
              mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Let’s Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-medium leading-snug mb-8">
            Are you ready to <em className="italic font-semibold">embark</em> on a journey?
          </h2>

          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Name"
                className={`flex-1 px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#f9d477] transition ${
                  mode === 'dark'
                    ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-[#1e1232]'
                }`}
              />
              <input
                type="email"
                placeholder="E-mail"
                className={`flex-1 px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#f9d477] transition ${
                  mode === 'dark'
                    ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-[#1e1232]'
                }`}
              />
            </div>

            <textarea
              placeholder="Your Message"
              rows="5"
              className={`w-full px-5 py-3 rounded-3xl border focus:outline-none focus:ring-2 focus:ring-[#f9d477] transition ${
                mode === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-[#1e1232]'
              }`}
            ></textarea>

            <button
              type="submit"
              className="bg-[#f9d477] hover:bg-[#f7ca52] text-[#1e1232] font-semibold px-8 py-3 rounded-full transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
