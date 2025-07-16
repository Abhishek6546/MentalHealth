import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

type Entry = {
  date: string;
  mood: string;
  thought: string;
  aiReply?: string;
};

const JournalExport = ({ userId }: { userId: string }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (!userId) return; // ⛔ skip fetch if userId is undefined

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


  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - 2 * margin; // Max width for text content

    entries.forEach((entry) => {

      const entryTitle = `Date: ${entry.date.slice(0, 10)}\nMood: ${entry.mood}`;
      const entryThought = `Thought: ${entry.thought}`;
      const entryFeedback = `AI Feedback: ${entry.aiReply || "N/A"}`;
      const separator = "------------------------------";

      // Split each part of the entry to fit within the page width
      const splitTitle = doc.splitTextToSize(entryTitle, maxWidth);
      const splitThought = doc.splitTextToSize(entryThought, maxWidth);
      const splitFeedback = doc.splitTextToSize(entryFeedback, maxWidth);

      // Calculate the height required for the current entry
      const entryHeight =
        doc.getTextDimensions(splitTitle).h +
        doc.getTextDimensions(splitThought).h +
        doc.getTextDimensions(splitFeedback).h +
        15; // Additional spacing for separator and general padding

      // Check if current entry will fit on the page
      if (y + entryHeight > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin; // Reset y to top margin for new page
      }

      // Add text to PDF
      doc.text(splitTitle, margin, y);
      y += doc.getTextDimensions(splitTitle).h + 2; // Add a small line spacing

      doc.text(splitThought, margin, y);
      y += doc.getTextDimensions(splitThought).h + 2;

      doc.text(splitFeedback, margin, y);
      y += doc.getTextDimensions(splitFeedback).h + 5; // More space before separator

      doc.text(separator, margin, y);
      y += 10; // Space after separator
    });

    doc.save("My_Journal.pdf");
  };

  const downloadText = () => {
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
  };

  return (
    <div className="text-center mt-6">
      <h2 className="text-lg font-semibold mb-2">Export Your Journal</h2>
      <button
        onClick={downloadPDF}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
      >
        Download PDF
      </button>
      <button
        onClick={downloadText}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Download TXT
      </button>
    </div>
  );
};

export default JournalExport;