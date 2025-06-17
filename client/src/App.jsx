import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CandidateList from './components/CandidateList';
import VoteForm from './components/VoteForm';
import ResultsDisplay from './components/ResultsDisplay';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/AdminPanel';
import ElectionControl from './components/ElectionControl';
import AddCandidateForm from './components/AddCandidateForm';
import { AuthContext } from './authContext';
import Nav from './components/nav';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
       <Nav/>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} /> {/* Ensure register is before / */}
        <Route path="/admin/add-candidate" element={<ProtectedRoute adminOnly={true}><AddCandidateForm /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />
        <Route path="/election-control" element={<ProtectedRoute adminOnly={true}><ElectionControl /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><ResultsDisplay /></ProtectedRoute>} />
        <Route path="/vote" element={<ProtectedRoute><VoteForm /></ProtectedRoute>} />
        <Route path="/candidates" element={<ProtectedRoute><CandidateList /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><CandidateList /></ProtectedRoute>} /> {/* / is last */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </Router>
  );
}

export default App;