const Vote = require('../models/Vote');
const Student = require('../models/Student');
const Candidate = require('../models/Candidate');

exports.castVote = async (req, res) => {
  try {
    const { candidateId, studentId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.voted) {
      return res.status(400).json({ message: 'Student already voted.' });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const vote = new Vote({ candidateId, studentId });
    await vote.save();

    student.voted = true;
    await student.save();

    res.status(201).json({ message: 'Vote cast successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $group: {
          _id: '$candidateId',
          voteCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'candidates',
          localField: '_id',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $unwind: '$candidate',
      },
      {
        $project: {
          _id: 0,
          candidateId: '$_id',
          candidateName: '$candidate.name',
          voteCount: 1,
        },
      },
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};