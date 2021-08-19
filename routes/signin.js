const express = require('express');

const router = express.Router();

const { signinUserValidation } = require('../middlewares/signin-user-validation');

const { login } = require('../controllers/users');

router.post('/signin', signinUserValidation, login);

module.exports = router;
