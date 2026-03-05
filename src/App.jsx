import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Internships from "./pages/Internships";
import Hackathons from "./pages/Hackathons";
import Courses from "./pages/Courses";
import OpportunityDetail from "./pages/OpportunityDetail";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-outfit antialiased selection:bg-indigo-100 selection:text-indigo-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/hackathons" element={<Hackathons />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/opportunity/:id" element={<OpportunityDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


