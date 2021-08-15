const express = require('express');

const router = express.Router();

const { cardValidation } = require('../middlewares/card-validation');

const {
  getCards, deleteCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', cardValidation, createCard);

router.delete('/cards/:cardId', cardValidation, deleteCardById);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
