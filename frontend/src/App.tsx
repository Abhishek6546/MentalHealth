import {  Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import Exercise from "./pages/Exercise";


function App() {
  return (
   <div>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Exercise" element={<Exercise/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
      <Footer/>
   </div>
   
  );
}

export default App;