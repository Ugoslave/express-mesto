const express = require('express');

const router = express.Router();

const { createUser } = require('../controllers/users');

router.post('/signup', createUser);

module.exports = router;
