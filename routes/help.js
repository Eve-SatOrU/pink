const express = require('express');
const helpController = require('../controllers/helpController');
const router = express.Router();

router.post('/help', helpController.submitHelpRequest);
module.exports = router;
