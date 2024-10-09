import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard';
import ResumeAnalyser from './pages/resume_analyser';
import AdminPage from './pages/adminpage';
// import AddJob from './pages/add_job';
// import ChangePassword from './pages/change_password';
// import Logout from './pages/logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/analyze-resume" element={<ResumeAnalyser />} />
        <Route path="/adminpage" element={<AdminPage />} />
        {/* <Route path="/add-job" element={<AddJob />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
