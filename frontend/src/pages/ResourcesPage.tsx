const ResourcesPage = () => {
  const quotes = [
    "You don’t have to control your thoughts. You just have to stop letting them control you. – Dan Millman",
    "The greatest weapon against stress is our ability to choose one thought over another. – William James",
    "This too shall pass.",
    "You are not alone. You are enough.",
  ];

  const tips = [
    "🌿 Practice deep breathing for 1 minute every morning.",
    "🧠 Write down 3 things you’re grateful for each day.",
    "📵 Take 10 minutes away from your phone before bed.",
    "☀️ Get sunlight for at least 15 minutes a day.",
  ];

  const videos = [
    {
      title: "5-Minute Guided Meditation",
      url: "https://www.youtube.com/embed/inpok4MKVLM",
    },
    {
      title: "Box Breathing Technique",
      url: "https://www.youtube.com/embed/FJJazKtH_9I",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold text-center mb-6">📚 Self-Help Resources</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🌟 Motivational Quotes</h2>
        <ul className="list-disc list-inside text-gray-700">
          {quotes.map((quote, index) => (
            <li key={index} className="mb-2">“{quote}”</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">💡 Quick Self-Help Tips</h2>
        <ul className="list-disc list-inside text-gray-700">
          {tips.map((tip, index) => (
            <li key={index} className="mb-2">{tip}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🎥 Guided Videos</h2>
        <div className="space-y-4">
          {videos.map((vid, index) => (
            <div key={index}>
              <p className="font-medium mb-1">{vid.title}</p>
              <iframe
                className="w-full h-64 rounded"
                src={vid.url}
                title={vid.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
