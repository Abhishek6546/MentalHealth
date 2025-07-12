import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import JournalForm from "./components/JournalForm";
import JournalHistory from "./components/JournalHistory";
import { useAuth } from "./context/useAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";


function App() {
  const { token } = useAuth();
  return (
    <Router>
      <Navbar />
      <Routes>
         
      
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          token ? (
            <>
              <JournalForm />
              <JournalHistory />
            </>
          ) : (
            <Login />
          )
        } />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
