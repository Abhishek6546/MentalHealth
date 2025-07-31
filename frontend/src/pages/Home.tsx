  import { Link } from 'react-router-dom';
  import heroImage from './../assets/home-banner.jpg';
  import exerciseImage from './../assets/exercise-image.jpg';
  import { useTheme } from '../context/ThemeContext';
  import { Bot, Flower, Smartphone, BarChart4 } from "lucide-react";
  import FAQSection from "../components/Faq";
  import ContactSection from '../components/ContactUs';

  function Home() {
    const { mode } = useTheme();
    const tools = [
    {
      icon: Bot,
      title: "Real-Time AI Chat Support",
      desc: "Talk to our AI companion anytime — get comfort, answers, and guidance when you need it most.",
    },
    {
      icon: Flower,
      title: "Guided Breathing & Meditation",
      desc: "Practice calmness through deep breathing and mindfulness — perfect for anxiety relief.",
    },
    {
      icon: Smartphone,
      title: "Mood & Habit Tracking",
      desc: "Track emotional patterns and daily habits to boost self-awareness and personal growth.",
    },
    {
      icon: BarChart4,
      title: "Personal Growth Plans",
      desc: "Follow personalized plans that evolve with your mental health journey and daily progress.",
    },
  ];

    return (
      <>
        <section
          className="bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="max-w-[1240px] mx-auto px-6 py-28 flex items-center">
            {/* Overlay card */}
            <div className={`${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-[#1e1232]'} bg-opacity-90 rounded-3xl p-10 max-w-xl shadow-md`}>
              <h1 className="text-4xl md:text-5xl font-serif text-[hashtag#1e1232] leading-snug mb-6">
                Support for Your Mind, Whenever You Need It
              </h1>
              <p className={`text-lg mb-8 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Our AI companion is always here to listen, comfort, and guide you through your emotional journey — day or night.
              </p>
              <Link
                to="/dashboard"
                className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full shadow transition ${
                  mode === 'dark'
                    ? 'bg-[#f9c977] text-[#1e1232] hover:bg-[#f7ca52]'
                    : 'bg-[#f9d477] text-[#1e1232] hover:bg-[#f7ca52]'
                }`}
              >
                Talk to Our AI →
              </Link>
            </div>
          </div>
        </section>

          <section className={`flex items-center justify-center px-4 py-16 transition ${
        mode === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-[#f9f4f0] to-[#edf6f3] text-[#1e1232]'
      }`}>
          <div className="max-w-4xl mx-auto text-center px-6">
            <p className="uppercase text-sm tracking-widest text-gray-500 mb-3">
              Your Mental Wellness Companion
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-medium leading-snug mb-6">
              Helping you heal, grow, and <em className="italic font-semibold">thrive</em> — one conversation at a time.
            </h2>
            <p className={`text-lg mb-10 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Our intelligent companion is designed to support your mental wellness journey, offering comfort, clarity,
              and confidence through every high and low.
            </p>
            <Link
              to="/services"
                className={`inline-flex items-center gap-2 font-medium px-6 py-3 rounded-full border transition duration-300 ${
                mode === 'dark'
                  ? 'border-white text-white hover:bg-white hover:text-black'
                  : 'border-[#1e1232] text-[#1e1232] hover:bg-[#1e1232] hover:text-white'
              }`}
            >
              Explore Services →
            </Link>
          </div>
        </section>

            <section className={` flex items-center justify-center px-4 py-20 transition ${
        mode === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-[#f9f4f0] to-[#edf6f3] text-[#1e1232]'
      }`}>
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            {/* Image */}
            <div className="w-full md:w-1/1">
              <img
                src={exerciseImage}
                alt="AI support illustration"
                className="rounded-3xl shadow-md"
              />
            </div>

            {/* Content */}
            <div >
              <p className="uppercase tracking-wide text-sm text-gray-500 mb-2">
                Your MindCare Assistant
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-[hashtag#1e1232] font-semibold leading-snug mb-6">
                Guided Mental Wellness & Relaxation
              </h2>
              <p className={`text-lg mb-8 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Explore breathing exercises and calming music tailored to reduce anxiety, stress,
                and emotional overload. MindCare helps you relax anytime, anywhere.
              </p>
              <Link
                to="/exercise"
              className={`inline-flex items-center gap-2 font-medium px-6 py-3 rounded-full border transition ${
                  mode === 'dark'
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-[#1e1232] text-[#1e1232] hover:bg-[#1e1232] hover:text-white'
                }`}
              >
                Try Exercises →
              </Link>
            </div>
          </div>
        </section>

        <section className={` flex items-center justify-center px-4 py-20 transition ${
        mode === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-r from-[#f9f4f0] to-[#edf6f3] text-[#1e1232]'
      }`}>
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-12">
              I GIVE PEOPLE THE TOOLS THEY NEED TO:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
    const IconComponent = tool.icon;

    return (
      <div
        key={index}
        className={`rounded-[30px] shadow transition hover:shadow-lg p-6 flex flex-col items-center text-center ${
          mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-[#1e1232]'
        }`}
      >
        <IconComponent size={60} strokeWidth={1.5} className="mb-4 text-current" />
        <h3 className={`font-semibold text-base mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#1e1232]'}`}>
          {tool.title}
        </h3>
        <p className={`text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {tool.desc}
        </p>
      </div>
    );
  })}

            </div>
          </div>
        </section>

<FAQSection />
<ContactSection />
      </>
    );
  }

  export default Home;