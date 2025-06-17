const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate', // Reference to the Candidate model
    required: true,
  },
});

module.exports = mongoose.model('Vote', voteSchema);