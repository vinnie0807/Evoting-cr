const express = require('express');
const router = express.Router();
const Election = require('../models/Election');
const { auth, isAdmin } = require('../middleware/authMiddleware'); 
router.post('/control', auth, isAdmin, async (req, res) => {
  const { startTime, endTime, isRunning } = req.body;

  try {
    let election = await Election.findOne({});

    if (!election) {
      election = new Election({ startTime, endTime, isRunning });
    } else {
      election.startTime = startTime;
      election.endTime = endTime;
      election.isRunning = isRunning;
    }

    await election.save();
    res.json({ message: 'Election control updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/status', async (req, res) => {
  try {
    const election = await Election.findOne({});
    res.json(election);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;