const User = require('../models/user');

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
        res.status(404).send({ message: 'Ни один пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('CastError'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'CastError') {
        res.status(404).send({ message: 'Пользователь с таким ID не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(400).send({ message: 'Некорректно заполнены данные пользователя' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
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
        res.status(400).send({ message: 'Некорректно заполнены данные пользователя' });
      }
      if (err.message === 'NotValidID') {
        res.status(404).send({ message: 'Пользователь с таким ID не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
        res.status(400).send({ message: 'Некорректно заполнены данные пользователя' });
      }
      if (err.message === 'NotValidID') {
        res.status(404).send({ message: 'Пользователь с таким ID не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
