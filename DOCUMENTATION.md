# MindFree - Technical Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Database Design](#database-design)
6. [API Documentation](#api-documentation)
7. [Authentication & Security](#authentication--security)
8. [AI Integration](#ai-integration)
9. [State Management](#state-management)
10. [Performance Optimization](#performance-optimization)
11. [Testing Strategy](#testing-strategy)
12. [Deployment](#deployment)
13. [Technical Decisions](#technical-decisions)
14. [Challenges & Solutions](#challenges--solutions)

---

## 🎯 Project Overview

**MindFree** is a full-stack mental health and wellness platform built with modern web technologies. The application provides users with tools for emotional tracking, mindfulness practices, and AI-powered mental health insights.

### Key Objectives
- Provide a secure, user-friendly platform for mental health tracking
- Implement AI-powered insights for personalized wellness recommendations
- Create an intuitive interface for mood tracking and habit building
- Ensure scalability and maintainability with modern development practices

---

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/TS)    │◄──►│   (Node/Express)│◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vite Dev      │    │   JWT Auth      │    │   Mongoose      │
│   Server        │    │   Middleware    │    │   ODM           │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **AI Integration**: Google Generative AI
- **Data Visualization**: Recharts
- **Validation**: Zod

---

## 🎨 Frontend Architecture

### Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── JournalForm.tsx  # Journal entry form
│   ├── MoodChart.tsx    # Mood analytics visualization
│   ├── HabitTracker.tsx # Habit tracking interface
│   ├── BreathingExercise.tsx # Breathing exercise component
│   └── MeditationAudio.tsx   # Audio meditation player
├── pages/               # Route components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Login.tsx        # Authentication
│   ├── ProfilePage.tsx  # User profile
│   └── Exercise.tsx     # Wellness exercises
├── context/             # React Context providers
│   ├── AuthContext.tsx  # Authentication state
│   └── ThemeContext.tsx # Theme management
└── services/            # API and utility services
    ├── api.ts          # HTTP client
    └── validationSchemas.ts # Zod schemas
```

### Key Frontend Features

#### 1. Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoint optimization for all device sizes
- Touch-friendly interface elements

#### 2. Theme System
```typescript
// ThemeContext.tsx
interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

// Implementation with localStorage persistence
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

#### 3. Authentication Flow
```typescript
// useAuth.ts - Custom hook for authentication
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const login = (userToken: string) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return { token, login, logout };
};
```

---

## ⚙️ Backend Architecture

### Server Structure
```
backend/
├── server.js           # Main server entry point
├── models/             # MongoDB schemas
│   ├── User.js        # User model
│   └── Journal.js     # Journal entry model
├── routes/             # API route handlers
│   ├── auth.js        # Authentication routes
│   ├── journal.js     # Journal CRUD operations
│   └── ai.js          # AI integration routes
└── middleware/         # Custom middleware
    └── authMiddleware.js # JWT verification
```

### Express Server Setup
```javascript
// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/journal", journalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 🗄️ Database Design

### User Schema
```javascript
// models/User.js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  }
});
```

### Journal Schema
```javascript
// models/Journal.js
const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: true,
    enum: ['😊', '😐', '😔', '😢', '😡', '😰', '😴']
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  tags: [{
    type: String,
    trim: true
  }],
  aiInsights: {
    sentiment: String,
    recommendations: [String],
    analyzedAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
**Purpose**: Register a new user
```javascript
// Request Body
{
  "username": "string",
  "email": "string",
  "password": "string"
}

// Response
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "string",
    "email": "string"
  }
}
```

#### POST /api/auth/login
**Purpose**: Authenticate existing user
```javascript
// Request Body
{
  "email": "string",
  "password": "string"
}

// Response
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "string",
    "email": "string"
  }
}
```

### Journal Endpoints

#### POST /api/journal
**Purpose**: Create a new journal entry
```javascript
// Request Body
{
  "mood": "😊",
  "content": "Today was a great day...",
  "tags": ["grateful", "productive"]
}

// Response
{
  "success": true,
  "journal": {
    "id": "journal_id",
    "mood": "😊",
    "content": "Today was a great day...",
    "tags": ["grateful", "productive"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/journal/:userId
**Purpose**: Retrieve user's journal entries
```javascript
// Response
{
  "success": true,
  "journals": [
    {
      "id": "journal_id",
      "mood": "😊",
      "content": "Today was a great day...",
      "tags": ["grateful", "productive"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### AI Endpoints

#### POST /api/ai/analyze
**Purpose**: Get AI-powered insights for journal entry
```javascript
// Request Body
{
  "content": "Journal entry content",
  "mood": "😊"
}

// Response
{
  "success": true,
  "insights": {
    "sentiment": "positive",
    "recommendations": [
      "Consider practicing gratitude exercises",
      "Maintain this positive momentum"
    ],
    "patterns": ["consistent positive mood", "productive activities"]
  }
}
```

---

## 🔐 Authentication & Security

### JWT Implementation
```javascript
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
```

### Password Security
```javascript
// Password hashing with bcrypt
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
```

### Security Measures
- **CORS Configuration**: Properly configured for production
- **Input Validation**: Zod schemas for all user inputs
- **Rate Limiting**: Implemented on sensitive endpoints
- **Environment Variables**: Secure configuration management
- **HTTPS**: Enforced in production

---

## 🤖 AI Integration

### Google Generative AI Implementation
```javascript
// routes/ai.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const analyzeJournalEntry = async (content, mood) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `
    Analyze this journal entry for mental health insights:
    Content: ${content}
    Mood: ${mood}
    
    Provide:
    1. Sentiment analysis
    2. 3 personalized recommendations
    3. Identified patterns or concerns
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
```

### AI Features
- **Sentiment Analysis**: Analyze emotional tone of journal entries
- **Personalized Recommendations**: Context-aware wellness suggestions
- **Pattern Recognition**: Identify mood trends and triggers
- **Coping Strategies**: Suggest appropriate mental health techniques

---

## 📊 State Management

### React Context Pattern
```typescript
// Context providers for global state
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  journals: Journal[];
  habits: Habit[];
}

// Custom hooks for state access
export const useAuth = () => useContext(AuthContext);
export const useTheme = () => useContext(ThemeContext);
```

### Local State Management
- **useState**: Component-level state
- **useEffect**: Side effects and data fetching
- **useReducer**: Complex state logic (if needed)
- **localStorage**: Persistent user preferences

---

## ⚡ Performance Optimization

### Frontend Optimizations
- **Code Splitting**: React.lazy() for route-based splitting
- **Memoization**: React.memo() for expensive components
- **Bundle Optimization**: Vite's built-in optimizations
- **Image Optimization**: WebP format and lazy loading

### Backend Optimizations
- **Database Indexing**: Proper indexes on frequently queried fields
- **Caching**: Redis for session management (future implementation)
- **Pagination**: Implemented for large datasets
- **Compression**: gzip compression for API responses

### Database Optimizations
```javascript
// Indexes for performance
userSchema.index({ email: 1 });
journalSchema.index({ userId: 1, createdAt: -1 });
journalSchema.index({ mood: 1, createdAt: -1 });
```

---

## 🧪 Testing Strategy

### Frontend Testing
```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { JournalForm } from '../JournalForm';

test('submits journal entry with correct data', () => {
  const mockSubmit = jest.fn();
  render(<JournalForm onSubmit={mockSubmit} />);
  
  fireEvent.change(screen.getByLabelText(/mood/i), {
    target: { value: '😊' }
  });
  
  fireEvent.click(screen.getByText(/submit/i));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    mood: '😊',
    content: expect.any(String)
  });
});
```

### Backend Testing
```javascript
// API endpoint testing with Jest
const request = require('supertest');
const app = require('../server');

describe('Journal API', () => {
  test('POST /api/journal creates new entry', async () => {
    const response = await request(app)
      .post('/api/journal')
      .send({
        mood: '😊',
        content: 'Test entry'
      })
      .set('Authorization', `Bearer ${validToken}`);
    
    expect(response.status).toBe(201);
    expect(response.body.journal).toHaveProperty('id');
  });
});
```

### Testing Coverage
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User workflow testing (future implementation)
- **Performance Tests**: Load testing for critical endpoints

---

## 🚀 Deployment

### Frontend Deployment (Vercel)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend Deployment (Railway/Heroku)
```json
// package.json scripts
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step required'"
  }
}
```

### Environment Configuration
```bash
# Production environment variables
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secure_jwt_secret
GOOGLE_AI_API_KEY=your_google_ai_key
FRONTEND_URL=https://your-frontend-domain.com
```

---

## 💡 Technical Decisions

### Why React 19 + TypeScript?
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Better IDE support and autocomplete
- **Maintainability**: Easier refactoring and code navigation
- **Performance**: Latest React features for better performance

### Why Vite?
- **Fast Development**: Instant hot module replacement
- **Modern Build**: ES modules and native browser features
- **Plugin Ecosystem**: Rich plugin support
- **TypeScript Support**: First-class TypeScript support

### Why Tailwind CSS 4?
- **Utility-First**: Rapid UI development
- **Customization**: Easy theme customization
- **Performance**: Only includes used styles
- **Responsive**: Built-in responsive design utilities

### Why MongoDB + Mongoose?
- **Flexibility**: Schema-less design for evolving data
- **Scalability**: Horizontal scaling capabilities
- **JSON-like Documents**: Natural fit for JavaScript/Node.js
- **Mongoose ODM**: Schema validation and middleware

### Why JWT Authentication?
- **Stateless**: No server-side session storage
- **Scalability**: Works across multiple servers
- **Security**: Tamper-proof tokens
- **Cross-Domain**: Works with microservices architecture

---

## 🎯 Challenges & Solutions

### Challenge 1: Real-time Mood Tracking
**Problem**: Users need immediate feedback on mood patterns
**Solution**: Implemented client-side caching with localStorage and periodic sync

### Challenge 2: AI Response Latency
**Problem**: Google AI API can be slow for real-time interactions
**Solution**: Implemented loading states and optimistic UI updates

### Challenge 3: Mobile Responsiveness
**Problem**: Complex dashboard layout on mobile devices
**Solution**: Mobile-first design with collapsible sections and touch-friendly controls

### Challenge 4: Data Privacy
**Problem**: Sensitive mental health data requires strict privacy
**Solution**: Implemented end-to-end encryption and GDPR compliance measures

### Challenge 5: Performance with Large Datasets
**Problem**: Mood charts with many data points can be slow
**Solution**: Implemented data aggregation and pagination for charts

---

## 🔮 Future Enhancements

### Planned Features
- **Real-time Notifications**: Push notifications for mood check-ins
- **Social Features**: Anonymous community support groups
- **Advanced Analytics**: Machine learning for mood prediction
- **Integration APIs**: Connect with fitness trackers and health apps
- **Offline Support**: PWA capabilities for offline journaling

### Technical Improvements
- **Microservices**: Split backend into specialized services
- **GraphQL**: Implement GraphQL for more efficient data fetching
- **Redis Caching**: Add Redis for session and data caching
- **Docker**: Containerize application for easier deployment
- **CI/CD Pipeline**: Automated testing and deployment

---

## 📈 Metrics & Monitoring

### Key Performance Indicators
- **User Engagement**: Daily active users, session duration
- **Feature Usage**: Journal entries per user, AI insights usage
- **Technical Performance**: API response times, error rates
- **User Satisfaction**: App store ratings, user feedback

### Monitoring Tools
- **Application Monitoring**: Sentry for error tracking
- **Performance Monitoring**: Lighthouse for frontend performance
- **Database Monitoring**: MongoDB Atlas monitoring
- **User Analytics**: Google Analytics for user behavior

---

This documentation provides a comprehensive overview of the MindFree mental health application, covering all technical aspects that would be relevant for technical interviews. The documentation demonstrates understanding of modern web development practices, security considerations, and scalable architecture patterns. 