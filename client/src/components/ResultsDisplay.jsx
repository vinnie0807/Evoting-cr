// client/src/components/ResultsDisplay.jsx
import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import './ResultsDisplay.css'; // Import the CSS

function ResultsDisplay() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await api.get('/votes/results');
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading results...</p>;
  }

  if (error) {
    return <p className="error-message">Error fetching results: {error.message || error}</p>;
  }

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="results-display-container"> {/* Add class */}
      <h2>Election Results</h2>
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Vote Count</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.candidateId}>
                <td>{result.candidateName}</td>
                <td>{result.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">No results available yet.</p>
      )}
    </div>
  );
}

export default ResultsDisplay;