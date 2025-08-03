# MindFree - Mental Health & Wellness Application

A comprehensive mental health and wellness platform designed to help users track their emotional well-being, practice mindfulness, and develop healthy habits. Built with modern web technologies and AI-powered features.

## 🌟 Features

### Core Features
- **Journaling System**: Daily mood tracking and emotional reflection
- **AI-Powered Insights**: Get personalized mental health recommendations using Google's Generative AI
- **Mood Analytics**: Visual charts and trends to track emotional patterns over time
- **Habit Tracker**: Build and maintain positive daily habits
- **Breathing Exercises**: Guided breathing techniques for stress relief
- **Meditation Audio**: Curated meditation sessions for relaxation
- **Dark/Light Theme**: Customizable interface with theme switching

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Beautiful gradient designs with smooth animations
- **User Authentication**: Secure login/signup with JWT tokens
- **Profile Management**: Personalize your wellness journey
- **Export Functionality**: Download your journal entries as PDF
- **Resource Library**: Access mental health resources and information

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization for mood tracking
- **Lucide React** - Beautiful icons
- **Zod** - Schema validation
- **jsPDF** - PDF generation for journal exports

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Google Generative AI** - AI-powered mental health insights
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
mentalhealth/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── services/       # API services and utilities
│   │   └── assets/         # Images and static files
│   └── public/
│       └── sounds/         # Meditation and breathing audio files
├── backend/                 # Node.js Express backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   └── server.js           # Main server file
└── README.md               # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Journal
- `POST /api/journal` - Create journal entry
- `GET /api/journal/:userId` - Get user's journal entries
- `PUT /api/journal/:id` - Update journal entry
- `DELETE /api/journal/:id` - Delete journal entry

### AI Features
- `POST /api/ai/analyze` - Get AI-powered mental health insights

## 🎯 Key Features in Detail

### Journaling System
- Daily mood tracking with emoji-based mood selection
- Rich text journal entries with formatting
- Mood analytics with visual charts
- Export journal entries as PDF

### AI Integration
- Sentiment analysis of journal entries
- Personalized mental health recommendations
- Mood pattern recognition
- Coping strategy suggestions

### Habit Tracking
- Create and track daily habits
- Visual progress indicators
- Streak counting
- Habit completion statistics

### Wellness Tools
- Guided breathing exercises with audio
- Meditation sessions with background music
- Stress relief techniques
- Mindfulness practices

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Dark/Light Themes**: Toggle between themes with smooth transitions
- **Gradient Backgrounds**: Beautiful animated gradient effects
- **Smooth Animations**: CSS transitions and micro-interactions
- **Accessibility**: WCAG compliant design elements

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation with Zod
- Secure API endpoints

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Google Generative AI for mental health insights
- React and Vite communities for excellent tooling
- Tailwind CSS for the beautiful design system
- All contributors and users of this application


**Built with ❤️ for mental health awareness and wellness** 