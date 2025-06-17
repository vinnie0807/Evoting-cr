// client/src/components/AddCandidateForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AdminPanel.css';

function AddCandidateForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/candidates', { name, description, photoUrl });
      navigate('/candidates');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-panel-container">
      <h2>Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Photo URL:</label>
          <input type="url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </div>
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default AddCandidateForm;