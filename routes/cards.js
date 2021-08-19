const express = require('express');

const router = express.Router();

const { createCardValidation } = require('../middlewares/create-card-validation');

const { deleteOrLikeCardValidation } = require('../middlewares/delete-or-like-card-validation');

const {
  getCards, deleteCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCardValidation, createCard);

router.delete('/cards/:cardId', deleteOrLikeCardValidation, deleteCardById);

router.put('/cards/:cardId/likes', deleteOrLikeCardValidation, likeCard);

router.delete('/cards/:cardId/likes', deleteOrLikeCardValidation, dislikeCard);

module.exports = router;
