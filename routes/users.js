const express = require('express');

const router = express.Router();

const { getUsers, getUserById, createUser } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

module.exports = router;
