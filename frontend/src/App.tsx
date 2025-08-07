import {  Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import Exercise from "./pages/Exercise";
import ResourcesPage from "./pages/ResourcesPage";
import JournalHistory from "./components/JournalHistory";
import { ThemeProvider } from './context/ThemeContext';



function App() {
  return (
   <div>
    <ThemeProvider>
    <Navbar />
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Exercise" element={<Exercise/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/journal-history" element={<JournalHistory />} />
      </Routes>
      <Footer/>
       </ThemeProvider>
   </div>
   
  );
}

export default App;