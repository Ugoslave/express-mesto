const express = require('express');

const router = express.Router();

const { signupUserValidation } = require('../middlewares/signup-user-validation');

const { createUser } = require('../controllers/users');

router.post('/signup', signupUserValidation, createUser);

module.exports = router;
