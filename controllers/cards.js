const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('NotFound'))
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Ничего не найдено' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Карточки с таким ID не найдено' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный ID' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(400).send({ message: 'Некорректно заполнены данные карточки' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Карточки с таким ID не найдено' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный ID' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Карточки с таким ID не найдено' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный ID' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
