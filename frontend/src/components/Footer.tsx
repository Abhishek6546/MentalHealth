
import { Heart, Sparkles } from 'lucide-react';

// Mock useTheme hook since ThemeContext is not available
const useTheme = () => {
  return { mode: 'light' }; // You can change this to 'dark' to test dark mode
};

function Footer() {
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';
  
  return (
    <footer 
      className={`py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-800 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {/* Use the heart icon logo design from second navbar */}
              <div className="relative">
                <Heart className={`h-10 w-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <Sparkles className={`h-4 w-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} absolute -top-1 -right-1 animate-pulse`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-blue-400 to-green-400' 
                    : 'from-blue-600 to-green-600'
                } bg-clip-text text-transparent`}>
                  MindFree
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your Wellness Journey
                </p>
              </div>
            </div>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`}>
              Supporting your mental health journey with compassionate care and innovative tools.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`}>
              <li><a href="/exercises" className="hover:text-white transition-colors">Exercises</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/resources" className="hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`}>
              <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Emergency</h4>
            <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`}>
              Crisis Text Line: Text HOME to 741741
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`}>
              National Suicide Prevention Lifeline: 988
            </p>
          </div>
        </div>
        
        <div className={`border-t mt-8 pt-8 text-center ${
          isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-700 text-gray-400'
        }`}>
          <p>&copy; 2025 MindFree. All rights reserved. Made with ❤️ for mental wellness.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;