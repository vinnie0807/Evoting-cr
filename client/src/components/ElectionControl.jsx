// client/src/components/ElectionControl.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ElectionControl.css';

const ElectionControl = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Fetch election status on component mount
    fetchElectionStatus();
  }, []);

  const fetchElectionStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/election/status');
      if (response.data) {
        setStartTime(response.data.startTime);
        setEndTime(response.data.endTime);
        setIsRunning(response.data.isRunning);
      }
    } catch (error) {
      console.error('Error fetching election status:', error);
    }
  };

  const handleControlElection = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/election/control',
        { startTime, endTime, isRunning },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token
          },
        }
      );
      alert('Election control updated');
      fetchElectionStatus(); // Refresh status after update
    } catch (error) {
      console.error('Error controlling election:', error);
      alert('Error updating election control');
    }
  };

  return (
    <div>
      <h2>Election Control</h2>
      <form onSubmit={handleControlElection}>
        <label>
          Start Time:
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>
        <br />
        <label>
          End Time:
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>
        <br />
        <label>
          Is Running:
          <input type="checkbox" checked={isRunning} onChange={(e) => setIsRunning(e.target.checked)} />
        </label>
        <br />
        <button type="submit">Update Election Control</button>
      </form>
    </div>
  );
};

export default ElectionControl;