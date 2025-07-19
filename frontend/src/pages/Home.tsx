import { Link } from 'react-router-dom';
import heroImage from './../assets/home-banner.jpg';
import exerciseImage from './../assets/exercise-image.jpg';
import aiChatIcon from '../assets/ai-chat-icon.png';
import breathingIcon from '../assets/breathing-icon.png';
import moodTrackIcon from '../assets/mood-track-icon.png';
import growthPlanIcon from '../assets/growth-plan-icon.png';

function Home() {
  const tools = [
    {
      icon: aiChatIcon,
      title: "Real-Time AI Chat Support",
      desc: "Talk to our AI companion anytime — get comfort, answers, and guidance when you need it most.",
    },
    {
      icon: breathingIcon,
      title: "Guided Breathing & Meditation",
      desc: "Practice calmness through deep breathing and mindfulness — perfect for anxiety relief.",
    },
    {
      icon: moodTrackIcon,
      title: "Mood & Habit Tracking",
      desc: "Track emotional patterns and daily habits to boost self-awareness and personal growth.",
    },
    {
      icon: growthPlanIcon,
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
          <div className="bg-white bg-opacity-90 rounded-3xl p-10 max-w-xl shadow-md">
            <h1 className="text-4xl md:text-5xl font-serif text-[hashtag#1e1232] leading-snug mb-6">
              Support for Your Mind, Whenever You Need It
            </h1>
            <p className="text-[hashtag#6b7280] text-lg mb-8">
              Our AI companion is always here to listen, comfort, and guide you through your emotional journey — day or night.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-[hashtag#f9d477] text-[hashtag#1e1232] font-semibold px-6 py-3 rounded-full shadow hover:bg-[hashtag#f7ca52] transition"
            >
              Talk to Our AI →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-white to-blue-50 py-28">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="uppercase text-sm tracking-widest text-gray-500 mb-3">
            Your Mental Wellness Companion
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[hashtag#1e1232] font-medium leading-snug mb-6">
            Helping you heal, grow, and <em className="italic font-semibold">thrive</em> — one conversation at a time.
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Our intelligent companion is designed to support your mental wellness journey, offering comfort, clarity,
            and confidence through every high and low.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border border-[hashtag#1e1232] text-[hashtag#1e1232] font-medium px-6 py-3 rounded-full hover:bg-[hashtag#1e1232] hover:text-white transition duration-300"
          >
            Explore Services →
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[hashtag#f9fafb] to-[hashtag#e7f3ff] py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src={exerciseImage}
              alt="AI support illustration"
              className="rounded-3xl shadow-md"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <p className="uppercase tracking-wide text-sm text-gray-500 mb-2">
              Your MindCare Assistant
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[hashtag#1e1232] font-semibold leading-snug mb-6">
              Guided Mental Wellness & Relaxation
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Explore breathing exercises and calming music tailored to reduce anxiety, stress,
              and emotional overload. MindCare helps you relax anytime, anywhere.
            </p>
            <Link
              to="/exercise"
              className="inline-flex items-center gap-2 border border-[hashtag#1e1232] text-[hashtag#1e1232] font-medium px-6 py-3 rounded-full hover:bg-[hashtag#1e1232] hover:text-white transition"
            >
              Try Exercises →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[hashtag#fafbfa] to-[hashtag#e6f4ff] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-12">
            I GIVE PEOPLE THE TOOLS THEY NEED TO:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] shadow transition hover:shadow-lg p-6 flex flex-col items-center text-center"
              >
                <img
                  src={tool.icon}
                  alt={tool.title}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h3 className="text-[hashtag#1e1232] font-semibold text-base mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

export default Home;