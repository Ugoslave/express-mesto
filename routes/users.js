const express = require('express');

const router = express.Router();

const { getUsers, getUserById, createUser, changeUser, changeUserAvatar } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

router.patch('/users/me', changeUser);

router.patch('/users/me/avatar', changeUserAvatar);

module.exports = router;
