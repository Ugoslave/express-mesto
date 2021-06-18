const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      if (users) {
        res.send(users);
      } else {
        res.status(404).send('Ни один пользователь не найден');
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send('Пользователь с таким ID не найден');
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(400).send('Некорректно заполнены данные пользователя');
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.changeUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(400).send('Некорректно заполнены данные пользователя');
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.changeUserAvatar = (req, res) => {
  const { link } = req.body;

  User.findByIdAndUpdate(req.user._id, { link })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(400).send('Некорректно заполнены данные пользователя');
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
