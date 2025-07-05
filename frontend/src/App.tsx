import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import JournalForm from "./components/JournalForm";
import JournalHistory from "./components/JournalHistory";
import { useAuth } from "./context/useAuth";

function App() {
  const { token } = useAuth();
  return (
    <Router>
      <Routes>
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
    </Router>
   
  );
}

export default App;
