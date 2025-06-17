const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.auth, async (req, res) => {
  try {
    await voteController.castVote(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/results', voteController.getResults); 
module.exports = router;