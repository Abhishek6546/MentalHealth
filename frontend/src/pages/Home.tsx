
function Home() {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Prioritize Your Mental Well-being
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-6">
          We're here to support your mental health journey with compassion and care.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Get Started
        </button>
      </header>

      {/* Why Mental Wellness Matters */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Mental Wellness Matters</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Improves emotional resilience and coping mechanisms</li>
          <li>Enhances relationships and communication</li>
          <li>Boosts productivity and focus</li>
          <li>Reduces stress, anxiety, and burnout</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Q: Is this platform confidential?</h3>
            <p className="text-gray-600">
              A: Yes, your privacy is our top priority. All your interactions are completely confidential.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Q: Can I talk to a professional?</h3>
            <p className="text-gray-600">
              A: Absolutely. We connect you with licensed therapists and counselors.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Q: How do I start my wellness journey?</h3>
            <p className="text-gray-600">
              A: Click "Get Started" above to sign up and explore personalized mental health resources.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
