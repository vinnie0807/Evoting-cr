// server/models/Election.js (Example using Mongoose)
const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  startTime: { type: Date },
  endTime: { type: Date },
  isRunning: { type: Boolean, default: false },
});

module.exports = mongoose.model('Election', electionSchema);