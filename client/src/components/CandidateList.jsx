import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../authContext';
import './CandidateList.css';

function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await api.get('/candidates');
        setCandidates(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchCandidates();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <p className="loading-message">Loading candidates...</p>;
  }

  if (error) {
    return <p className="error-message">Error fetching candidates: {error.message}</p>;
  }

  return (
    <div className="candidate-list-container">
      <h2>Candidates</h2>
      <ul>
        {Array.isArray(candidates) && candidates.map((candidate) => (
          <li key={candidate._id}>
            <div className="candidate-info">
              {candidate.name} - {candidate.description}
            </div>
            {candidate.photoUrl && <img src={candidate.photoUrl} alt={candidate.name} />}
          </li>
        ))}
      </ul>
      <div className="candidate-actions">
        {!user?.isAdmin && <Link to="/vote">Vote</Link>}
        {user?.isAdmin && <Link to="/election-control">Election Control</Link>}
        {user?.isAdmin && <Link to="/results">Results</Link>}
        {user?.isAdmin && <Link to="/admin">Admin Panel</Link>} {/* Added Admin Panel Link */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default CandidateList;