import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const faqs = [
  {
    question: "What features does the MentalCare app include?",
    answer:
      "The app includes mood & habit tracking, AI chat support, guided breathing/meditation, and personal growth plans to help you manage stress, anxiety, and emotional wellbeing.",
  },
  {
    question: "How does mood tracking help improve mental health?",
    answer:
      "It increases self-awareness by identifying emotional patterns and triggers over time, allowing you to make better lifestyle adjustments.",
  },
  {
    question: "Is the AI companion qualified to offer mental health advice?",
    answer:
      "No. The AI companion provides emotional support and guidance, but it’s not a licensed therapist. For professional help, consult a qualified expert.",
  },
  {
    question: "What kind of meditation or breathing exercises are included?",
    answer:
      "The app offers deep breathing, mindfulness meditations, and short calming sessions to help you manage anxiety and relax daily.",
  },
  {
    question: "How is my personal data protected?",
    answer:
      "Your data is encrypted and stored securely. We follow best practices in data privacy and never share your personal info without your consent.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { mode } = useTheme();

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className={`py-10 px-4 ${
        mode === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-[#f9f4f0] to-[#edf6f3] text-[#1e1232]"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b transition-all duration-300 ease-in-out pb-4`}
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full text-left text-lg font-medium focus:outline-none"
              >
                {faq.question}
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {activeIndex === index && (
                <div
                  className={`mt-3 text-base leading-relaxed transition-colors duration-300 ${
                    mode === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
