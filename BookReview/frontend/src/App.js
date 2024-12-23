import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AddReview from './components/AddReview';
import AllReviews from './components/AllReviews';
import { useEffect } from 'react';

function RedirectToAllReviews() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to /allReview when the app loads
    navigate('/allReview');
  }, [navigate]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    <Router>
      <RedirectToAllReviews />  {/* This will handle the redirection */}
      <Routes>
        <Route
          path="/addReview"
          element={<AddReview />}
        />
        <Route
          path="/allReview"
          element={<AllReviews />}
        />
      </Routes>
    </Router>
  );
}

export default App;
