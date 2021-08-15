const express = require('express');

const router = express.Router();

const { userValidation } = require('../middlewares/user-validation');

const { createUser } = require('../controllers/users');

router.post('/signup', userValidation, createUser);

module.exports = router;
