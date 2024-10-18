const express = require('express');
const resourceController = require('../controllers/resourceController');
const router = express.Router();

router.get('/resources', resourceController.searchResources);

module.exports = router;