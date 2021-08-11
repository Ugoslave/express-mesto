const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NotValidIdError = require('../errors/not-valid-id-err');
const NotValidEmailError = require('../errors/not-valid-email-err');

const validation = { runValidators: true };
const newData = { new: true };

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(new Error('NotFound'))
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.send(new NotFoundError('Ни один пользователь не найден'));
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.send(new NotFoundError('Пользователь с таким ID не найден'));
      } else if (err.name === 'CastError') {
        res.send(new NotValidIdError('Передан невалидный ID'));
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotValidIdError('Некорректно заполнены данные пользователя');
      }
    })
    .catch(next);
};

module.exports.changeUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, validation, { name, about }, newData)
    .orFail(new Error('NotValidID'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.send(new NotValidIdError('Некорректно заполнены данные пользователя'));
      } else if (err.message === 'NotValidID') {
        res.send(new NotFoundError('Пользователь с таким ID не найден'));
      }
    });
};

module.exports.changeUserAvatar = (req, res) => {
  const { link } = req.body;

  User.findByIdAndUpdate(req.user._id, validation, { link }, newData)
    .orFail(new Error('NotValidID'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.send(new NotValidIdError('Некорректно заполнены данные пользователя'));
      } else if (err.message === 'NotValidID') {
        res.send(new NotFoundError('Пользователь с таким ID не найден'));
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne(req.user._id, validation, ({ email }).select('+password'))
    .orFail(new Error('NotValidEmail'))
    .then((user) => {
      bcrypt.compare(password, user.password);
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: 3600 });
      res.send({ token });
    })
    .then((matched) => {
      if (matched) {
        res.send({ message: 'Всё прошло успешно' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.send(new NotValidIdError('Некорректно заполнены данные пользователя'));
      } else if (err.message === 'NotValidEmail') {
        res.send(new NotValidEmailError('Неправильные почта или пароль'));
      }
    });
};
