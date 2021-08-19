const express = require('express');

const router = express.Router();

const { getUserValidation } = require('../middlewares/get-user-validation');

const { meUserValidation } = require('../middlewares/me-user-validation');

const { avatarUserValidation } = require('../middlewares/avatar-user-validation');

const {
  getUsers, getUserById, changeUser, changeUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserValidation, getUserById);

router.patch('/users/me', meUserValidation, changeUser);

router.patch('/users/me/avatar', avatarUserValidation, changeUserAvatar);

module.exports = router;
