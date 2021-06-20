const express = require('express');

const router = express.Router();

const { sendError } = require('../controllers/error');

router.get('*', sendError);

module.exports = router;

