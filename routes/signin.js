const express = require('express');

const router = express.Router();

const { userValidation } = require('../middlewares/user-validation');

const { login } = require('../controllers/users');

router.post('/signin', userValidation, login);

module.exports = router;
