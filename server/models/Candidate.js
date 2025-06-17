const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);