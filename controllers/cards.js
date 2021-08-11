const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const NotValidIdError = require('../errors/not-valid-id-err');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('NotFound'))
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.send(new NotFoundError('Ничего не найдено'));
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  if (req.user._id === Card.owner) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail(new Error('NotFound'))
      .then((card) => {
        res.send(card);
      })
      .catch((err) => {
        if (err.message === 'NotFound') {
          res.send(new NotFoundError('Карточки с таким ID не найдено'));
        } else if (err.name === 'CastError') {
          res.send(new NotValidIdError('Передан невалидный ID'));
        }
      });
  }
};

module.exports.createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotValidIdError('Некорректно заполнены данные карточки');
      }
    })
    .catch(next);
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
        res.send(new NotFoundError('Карточки с таким ID не найдено'));
      } else if (err.name === 'CastError') {
        res.send(new NotValidIdError('Передан невалидный ID'));
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
        res.send(new NotFoundError('Карточки с таким ID не найдено'));
      } else if (err.name === 'CastError') {
        res.send(new NotValidIdError('Передан невалидный ID'));
      }
    });
};
