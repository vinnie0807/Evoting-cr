import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../authContext';
import './VoteForm.css';

function VoteForm() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const candidatesResponse = await api.get('/candidates');
        setCandidates(candidatesResponse.data);

        const electionStatusResponse = await api.get('/election/status');
        if (electionStatusResponse.data && !electionStatusResponse.data.isRunning) {
          setError('Election is not currently running.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data.');
        console.error('Failed to fetch data', err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await api.post('/votes', { candidateId: selectedCandidate, studentId: user._id });
      setSuccessMessage('Vote cast successfully!');
      setSelectedCandidate('');
      navigate('/results');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Voting failed. Please try again.');
      }
      console.error('Voting failed', err);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!user?.isAdmin) {
    return (
      <div className="vote-form-container">
        <h2>Vote</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <select value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
            <option value="">Select a Candidate</option>
            {Array.isArray(candidates) && candidates.map((candidate) => (
              <option key={candidate._id} value={candidate._id}>
                {candidate.name}
              </option>
            ))}
          </select>
          <button type="submit">Submit Vote</button>
        </form>
      </div>
    );
  } else {
    navigate('/');
    return null;
  }
}

export default VoteForm;