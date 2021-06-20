const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('NotFound', 'Объект не найден'))
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(404).send({ message: 'Ничего не найдено' });
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Карточки с таким ID не найдено' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректно заполнены данные карточки' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidID'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Карточки с таким ID не найдено' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(404).send({ message: 'Карточки с таким ID не найдено' });
    }

    res.status(500).send({ message: 'Произошла ошибка' });
  });
};
