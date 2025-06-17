const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const voteRoutes = require('./routes/voteRoutes');
require('dotenv').config();
const db = require('./config/db');
const electionRoutes = require('./routes/election');

const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());

db(); 

app.use('/auth', authRoutes);
app.use('/candidates', candidateRoutes);
app.use('/votes', voteRoutes);
app.use('/election', electionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));