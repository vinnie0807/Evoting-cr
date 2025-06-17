const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/', authMiddleware.auth, authMiddleware.isAdmin, candidateController.addCandidate); 
router.get('/', candidateController.getCandidates);

module.exports = router;