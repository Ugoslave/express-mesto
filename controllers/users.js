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
      if (err.name === 'NotFound') {
        res.status(404).send({ message: 'Ни один пользователь не найден' });
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь с таким ID не найден' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректно заполнены данные пользователя' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.changeUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, validation, { name, about }, newData)
    .orFail(() => new Error('NotValidID'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректно заполнены данные пользователя' });
      }
      if (err.name === 'NotValidID') {
        res.status(404).send({ message: 'Пользователь с таким ID не найден' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
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
      if (err.name === 'NotValidID') {
        res.status(404).send({ message: 'Пользователь с таким ID не найден' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};
