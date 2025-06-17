const Candidate = require('../models/Candidate');

exports.addCandidate = async (req, res) => {
  try {
    const { name, description, photoUrl } = req.body;
    const candidate = new Candidate({ name, description, photoUrl });
    await candidate.save();
    res.status(201).json({ message: 'Candidate added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};