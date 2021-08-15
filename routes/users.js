const express = require('express');

const router = express.Router();

const { userValidation } = require('../middlewares/user-validation');

const {
  getUsers, getUserById, changeUser, changeUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.patch('/users/me', userValidation, changeUser);

router.patch('/users/me/avatar', userValidation, changeUserAvatar);

module.exports = router;
