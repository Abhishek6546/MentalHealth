import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wind,
  MessageCircle,
  Music,
  BookOpen,
  Smile,
  Frown,
  Angry,
  Meh,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const { mode } = useTheme();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   subject: "",
  //   message: "",
  // });


  const isDarkMode = mode === "dark";

  const moods = [
    {
      name: "Happy",
      icon: Smile,
      color:
        "bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 hover:from-yellow-200 hover:to-yellow-300",
    },
    {
      name: "Sad",
      icon: Frown,
      color:
        "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300",
    },
    {
      name: "Angry",
      icon: Angry,
      color:
        "bg-gradient-to-br from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300",
    },
    {
      name: "Anxious",
      icon: AlertTriangle,
      color:
        "bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 hover:from-orange-200 hover:to-orange-300",
    },
    {
      name: "Neutral",
      icon: Meh,
      color:
        "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300",
    },
  ];

  const features = [
    {
      icon: Wind,
      title: "Breathing Exercises",
      description:
        "Guided breathing techniques to help you relax and reduce stress with personalized sessions.",
      buttonText: "Start Exercise",
      route: "/Exercise",
      color: isDarkMode
        ? "bg-gradient-to-br from-blue-800 to-cyan-900 hover:from-blue-700 hover:to-cyan-800"
        : "bg-gradient-to-br from-blue-50 to-cyan-100 hover:from-blue-100 hover:to-cyan-200",
      iconColor: "text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "AI Chat Support",
      description:
        "Get personalized support based on your current mood with our intelligent companion.",
      buttonText: "Chat Now",
      route: "/dashboard",
      color: isDarkMode
        ? "bg-gradient-to-br from-green-800 to-emerald-900 hover:from-green-700 hover:to-emerald-800"
        : "bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200",
      iconColor: "text-green-600",
    },
    {
      icon: Music,
      title: "Calming Music",
      description:
        "Listen to soothing music designed to promote relaxation and inner peace.",
      buttonText: "Listen Now",
      route: "/Exercise",
      color: isDarkMode
        ? "bg-gradient-to-br from-purple-800 to-violet-900 hover:from-purple-700 hover:to-violet-800"
        : "bg-gradient-to-br from-purple-50 to-violet-100 hover:from-purple-100 hover:to-violet-200",
      iconColor: "text-purple-600",
    },
    {
      icon: BookOpen,
      title: "Resources & Content",
      description:
        "Access curated videos, articles, and tools for comprehensive mental wellness.",
      buttonText: "Explore Resources",
      route: "/resources",
      color: isDarkMode
        ? "bg-gradient-to-br from-indigo-800 to-blue-900 hover:from-indigo-700 hover:to-blue-800"
        : "bg-gradient-to-br from-indigo-50 to-blue-100 hover:from-indigo-100 hover:to-blue-200",
      iconColor: "text-indigo-600",
    },
  ];

  const faqs = [
    {
      question: "How does the AI chat support work?",
      answer:
        "Our AI chat support uses advanced natural language processing to understand your mood and provide personalized guidance. Simply select your current emotional state, and the AI will offer tailored coping strategies, exercises, and resources.",
    },
    {
      question: "Are the breathing exercises suitable for beginners?",
      answer:
        "Absolutely! Our breathing exercises are designed for all levels, from complete beginners to experienced practitioners. Each session includes clear instructions and can be customized to your comfort level and available time.",
    },
    {
      question: "Is my personal information kept private?",
      answer:
        "Yes, we take your privacy very seriously. All conversations and personal data are encrypted and stored securely. We never share your information with third parties without your explicit consent.",
    },
    {
      question: "Can I use this platform during a mental health crisis?",
      answer:
        "While our platform provides valuable support tools, it's not intended for crisis situations. If you're experiencing a mental health emergency, please contact your local emergency services or the National Suicide Prevention Lifeline at 988.",
    },
    {
      question: "How often should I use the platform for best results?",
      answer:
        "Consistency is key to mental wellness. We recommend using the platform daily, even if just for a few minutes. Regular breathing exercises, mood check-ins, and engaging with resources can significantly improve your overall well-being.",
    },
  ];

  // const handleInputChange = (e:any) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e:any) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   setFormData({ name: "", email: "", subject: "", message: "" });
  //   alert("Thank you for your message! We'll get back to you soon.");
  // };

  return (
    <div
      className={`min-h-screen ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-blue-50 via-white to-green-50"
        } relative overflow-hidden mt-[-80px]`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-32 h-32 ${isDarkMode ? "bg-blue-900" : "bg-blue-200"
            } rounded-full opacity-10 animate-pulse`}
        ></div>
        <div
          className={`absolute top-40 right-20 w-24 h-24 ${isDarkMode ? "bg-green-900" : "bg-green-200"
            } rounded-full opacity-10 animate-pulse delay-1000`}
        ></div>
        <div
          className={`absolute bottom-20 left-1/4 w-40 h-40 ${isDarkMode ? "bg-purple-900" : "bg-purple-200"
            } rounded-full opacity-10 animate-pulse delay-2000`}
        ></div>
        <div
          className={`absolute bottom-40 right-1/3 w-28 h-28 ${isDarkMode ? "bg-yellow-900" : "bg-yellow-200"
            } rounded-full opacity-10 animate-pulse delay-3000`}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <div className="mb-6">
              <div
                className={`inline-flex items-center px-4 py-2 ${isDarkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-800"
                  } rounded-full text-sm font-medium mb-6`}
              >
                <Star className="h-4 w-4 mr-2" />
                Welcome to Your Mental Wellness Journey
                <Zap className="h-4 w-4 ml-2" />
              </div>
            </div>

            <h1
              className={`text-5xl md:text-7xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"
                } mb-8 leading-tight`}
            >
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 animate-pulse">
                Mental Wellness
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl ${isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-12 max-w-4xl mx-auto leading-relaxed`}
            >
              Discover personalized tools, AI-powered support, and
              evidence-based techniques to help you thrive mentally and
              emotionally every single day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/dashboard"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white px-10 py-5 rounded-full text-lg font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
              >
                Start Your Journey
                <ChevronRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/resources"
                className={`px-10 py-5 border-2 ${isDarkMode
                  ? "border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400"
                  : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
                  } rounded-full text-lg font-semibold transition-all duration-300`}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"
                } mb-6`}
            >
              Powerful Tools for Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Wellness Journey
              </span>
            </h2>
            <p
              className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"
                } max-w-3xl mx-auto`}
            >
              Comprehensive mental health support designed by experts, powered
              by AI, and personalized for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.color
                  } p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border ${isDarkMode ? "border-gray-700" : "border-white/50"
                  } group`}
              >
                <div className="mb-6">
                  <feature.icon
                    className={`h-14 w-14 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <h3
                  className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"
                    } mb-4`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-600"
                    } mb-8 leading-relaxed`}
                >
                  {feature.description}
                </p>
                <Link
                  to={feature.route}
                  className={`block w-full text-center ${isDarkMode
                    ? "bg-gray-700/80 text-white hover:bg-gray-600"
                    : "bg-white/80 text-gray-800 hover:bg-white"
                    } backdrop-blur-sm py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:transform group-hover:scale-105`}
                >
                  {feature.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mood Check Section */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 ${isDarkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
          : "bg-gradient-to-r from-blue-50 via-white to-green-50"
          } relative`}
      >
        <div
          className={`absolute inset-0 ${isDarkMode
            ? "bg-gradient-to-r from-blue-900/10 to-green-900/10"
            : "bg-gradient-to-r from-blue-100/20 to-green-100/20"
            }`}
        ></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2
            className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"
              } mb-6`}
          >
            How are you feeling
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              right now?
            </span>
          </h2>
          <p
            className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-16`}
          >
            Get personalized AI support tailored to your current emotional state
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {moods.map((mood, index) => (
              <button
                key={index}
                onClick={() => setSelectedMood(mood.name)}
                className={`${mood.color
                  } p-8 rounded-2xl text-center transition-all duration-300 transform hover:scale-110 hover:shadow-xl border-2 ${selectedMood === mood.name
                    ? "ring-4 ring-blue-400 border-blue-300 scale-105"
                    : "border-transparent"
                  }`}
              >
                <mood.icon className="h-10 w-10 mx-auto mb-3" />
                <span className="text-sm font-semibold">{mood.name}</span>
              </button>
            ))}
          </div>

          <button
            disabled={!selectedMood}
            onClick={() => {
              if (selectedMood) {
                navigate('/dashboard', { state: { mood: selectedMood } });
              }
            }}
            className={`bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-xl transform hover:scale-105 ${!selectedMood
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "hover:shadow-blue-500/25"
              }`}
          >
            Get Personalized Support
            <ChevronRight className="inline ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"
                } mb-6`}
            >
              Frequently Asked
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Questions
              </span>
            </h2>
            <p
              className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
            >
              Find answers to common questions about our mental wellness
              platform
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
                  } rounded-2xl shadow-lg border overflow-hidden`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full px-8 py-6 text-left flex justify-between items-center ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    } transition-colors duration-300`}
                >
                  <span
                    className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                  >
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-600" />
                  ) : (
                    <ChevronDown
                      className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"
                        }`}
                    />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p
                      className={`${isDarkMode ? "text-gray-300" : "text-gray-600"
                        } leading-relaxed`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 ${isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-green-50"
          }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"
                }`}
            >
              Get in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {" "}
                Touch
              </span>
            </h2>
            <p
              className={`text-xl ${isDarkMode ? "text-white" : "text-gray-600"
                }`}
            >
              Have questions or need support? We're here to help you on your
              wellness journey
            </p>
          </div>

          <div
            className={`rounded-3xl shadow-2xl p-8 md:p-12 border ${isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
              }`}
          >
            <form
              action="https://formsubmit.co/abhishekk11603@gmail.com"
              method="POST"
              className="space-y-8"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://mental-health-app-wine.vercel.app/"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-600"
                      }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    className={`w-full px-4 py-4 border border-gray-300 rounded-xl ${isDarkMode ? "bg-gray-900 text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-500"
                      }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-600"
                      }`}
                  >
                    Email Address
                  </label>

                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                    className={`w-full px-4 py-4 border border-gray-300 rounded-xl ${isDarkMode ? "bg-gray-900 text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-500"
                      }`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-600"
                    }`}
                >
                  Subject
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className={`w-full px-4 py-4 border border-gray-300 rounded-xl resize-none ${isDarkMode ? "bg-gray-900 text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-500"
                    }`}
                />
              </div>


              <div className="text-center">
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-4 rounded-full font-semibold cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>


      {/* Emergency Support Section */}
      {/* <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? "bg-red-900/20" : "bg-red-50"
          }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`${isDarkMode
                ? "bg-gray-800 border-red-800"
                : "bg-white border-red-100"
              } rounded-2xl p-8 shadow-lg border`}
          >
            <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3
              className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"
                } mb-4`}
            >
              Need Immediate Help?
            </h3>
            <p
              className={`${isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-6`}
            >
              If you're experiencing a mental health crisis, please reach out
              for immediate support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:988"
                className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg"
              >
                Call 988 - Suicide & Crisis Lifeline
              </a>
              <a
                href="sms:741741"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg"
              >
                Text HOME to 741741
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
