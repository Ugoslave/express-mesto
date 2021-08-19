/* eslint-disable no-unused-vars */
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.createCardValidation = (req, res) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: validator.isURL({require_protocol: true}),
    }).unknown(true),

    headers: Joi.object().keys({
      authorization: Joi.string().required().min(2).max(50),
    }).unknown(true),

    params: Joi.object().keys({
      cardId: Joi.string().alphanum().min(2).max(50),
    }).unknown(true),
  });
};
