/* eslint-disable no-unused-vars */
const { celebrate, Joi } = require('celebrate');

module.exports.deleteOrLikeCardValidation = (req, res) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(7),
    }).unknown(true),

    headers: Joi.object().keys({
      authorization: Joi.string().required().min(2).max(50),
    }).unknown(true),

    params: Joi.object().keys({
      cardId: Joi.string().alphanum().required().length(24).hex(),
    }).unknown(true),
  });
};
