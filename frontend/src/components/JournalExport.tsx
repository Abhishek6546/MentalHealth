import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { useTheme } from "../context/ThemeContext";

type Entry = {
  date: string;
  mood: string;
  thought: string;
  aiReply?: string;
};

const JournalExport = ({ userId }: { userId: string }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { mode } = useTheme();

  useEffect(() => {
    if (!userId) return;

    const fetchEntries = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";
        const res = await fetch(`${apiUrl}api/journal/moods/${userId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setEntries(data);
      } catch (error) {
        console.error("Failed to fetch journal entries:", error);
      }
    };

    fetchEntries();
  }, [userId]);

  const downloadPDF = async () => {
    setIsLoading(true);
    try {
      const doc = new jsPDF();
      let y = 10;
      const margin = 10;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxWidth = pageWidth - 2 * margin;

      entries.forEach((entry) => {
        const entryTitle = `Date: ${entry.date.slice(0, 10)}\nMood: ${entry.mood}`;
        const entryThought = `Thought: ${entry.thought}`;
        const entryFeedback = `AI Feedback: ${entry.aiReply || "N/A"}`;
        const separator = "------------------------------";

        const splitTitle = doc.splitTextToSize(entryTitle, maxWidth);
        const splitThought = doc.splitTextToSize(entryThought, maxWidth);
        const splitFeedback = doc.splitTextToSize(entryFeedback, maxWidth);

        const entryHeight =
          doc.getTextDimensions(splitTitle).h +
          doc.getTextDimensions(splitThought).h +
          doc.getTextDimensions(splitFeedback).h +
          15;

        if (y + entryHeight > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }

        doc.text(splitTitle, margin, y);
        y += doc.getTextDimensions(splitTitle).h + 2;

        doc.text(splitThought, margin, y);
        y += doc.getTextDimensions(splitThought).h + 2;

        doc.text(splitFeedback, margin, y);
        y += doc.getTextDimensions(splitFeedback).h + 5;

        doc.text(separator, margin, y);
        y += 10;
      });

      doc.save("My_Journal.pdf");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadText = () => {
    setIsLoading(true);
    try {
      const content = entries
        .map(
          (entry) => `
Date: ${entry.date.slice(0, 10)}
Mood: ${entry.mood}
Thought: ${entry.thought}
AI Feedback: ${entry.aiReply || "N/A"}
------------------------------`
        )
        .join("\n\n");

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = "My_Journal.txt";
      link.href = url;
      link.click();

      URL.revokeObjectURL(url);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <div className={`max-w-lg mx-auto mt-8 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
        mode === "dark"
          ? "bg-gray-800/90 border-gray-700/50"
          : "bg-white/95 border-gray-200/50"
      }`}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
          <span className="text-2xl">📤</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Export Your Journal
        </h2>
        <p className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Download your wellness journey in your preferred format
        </p>
      </div>

      {/* Stats Preview */}
      <div className={`p-4 rounded-xl mb-6 border ${
        mode === "dark"
          ? "bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-800/30"
          : "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200/50"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
              <span className="text-white text-sm">📊</span>
            </div>
            <div>
              <p className={`text-sm font-medium ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Ready to Export
              </p>
              <p className={`text-xs ${mode === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                {entries.length} journal entries
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            entries.length > 0
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}>
            {entries.length > 0 ? `${entries.length} entries` : "No entries"}
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="space-y-4">
        {/* PDF Export */}
        <button
          onClick={downloadPDF}
          disabled={isLoading || entries.length === 0}
          className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
            isLoading || entries.length === 0
              ? "bg-gray-400 cursor-not-allowed text-white"
              : mode === "dark"
              ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-400 hover:to-pink-500 hover:shadow-red-500/25"
              : "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 hover:shadow-red-500/25"
          }`}
        >
          <div className="flex items-center justify-center">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <span className="mr-3">📄</span>
                Download as PDF
                <span className="ml-2 text-sm opacity-75">({entries.length} entries)</span>
              </>
            )}
          </div>
        </button>

        {/* TXT Export */}
        <button
          onClick={downloadText}
          disabled={isLoading || entries.length === 0}
          className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
            isLoading || entries.length === 0
              ? "bg-gray-400 cursor-not-allowed text-white"
              : mode === "dark"
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 hover:shadow-green-500/25"
              : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/25"
          }`}
        >
          <div className="flex items-center justify-center">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing Text...
              </>
            ) : (
              <>
                <span className="mr-3">📝</span>
                Download as Text
                <span className="ml-2 text-sm opacity-75">({entries.length} entries)</span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Info Section */}
      {entries.length === 0 ? (
        <div className={`mt-6 p-4 rounded-xl text-center border-2 border-dashed ${
          mode === "dark"
            ? "border-gray-600/50 bg-gray-700/20"
            : "border-gray-300/50 bg-gray-50/50"
        }`}>
          <div className="text-4xl mb-2">📝</div>
          <p className={`text-sm font-medium ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            No journal entries to export yet
          </p>
          <p className={`text-xs mt-1 ${mode === "dark" ? "text-gray-500" : "text-gray-500"}`}>
            Start writing to create your first export
          </p>
        </div>
      ) : (
        <div className={`mt-6 p-4 rounded-xl text-center ${
          mode === "dark"
            ? "bg-blue-900/20 border border-blue-800/30"
            : "bg-blue-50 border border-blue-200/50"
        }`}>
          <div className="flex items-center justify-center mb-2">
            <span className="text-blue-500 mr-2">💡</span>
            <p className={`text-sm font-medium ${mode === "dark" ? "text-blue-300" : "text-blue-700"}`}>
              Export Tips
            </p>
          </div>
          <p className={`text-xs ${mode === "dark" ? "text-blue-400" : "text-blue-600"}`}>
            PDF format is great for sharing, while Text format is perfect for backup and editing
          </p>
        </div>
      )}
    </div>
  );
};

export default JournalExport;