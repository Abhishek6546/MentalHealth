import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  // Use a functional update for initial state to ensure it runs only once
  // and safely accesses localStorage.
  const [isDark, setIsDark] = useState(() => {
    // Check if localStorage is available (prevents issues in SSR environments)
    if (typeof window !== 'undefined' && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    // Default to false (light mode) if no theme is set or localStorage is unavailable
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark"); // <-- This is the critical line for light mode!
      localStorage.setItem("theme", "light");
    }
    // Log for debugging: Check the html class list after effect runs
    console.log("HTML classes after effect:", html.classList.value);
    console.log("Current isDark state:", isDark);
  }, [isDark]); 

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`p-2 rounded transition-colors duration-300 ease-in-out ${
        isDark
          ? "bg-white text-black hover:bg-gray-200" // Styles for when it's currently dark mode (button says "Light Mode")
          : "bg-gray-800 text-white hover:bg-gray-700" // Styles for when it's currently light mode (button says "Dark Mode")
      }`}
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;