/* eslint-disable no-unused-vars */
const { celebrate, Joi } = require('celebrate');

const validator = require('validator');

module.exports.avatarUserValidation = (req, res) => {
  celebrate({
    body: Joi.object().keys({
      avatar: validator.isURL({require_protocol: true}),
    }).unknown(true),

    headers: Joi.object().keys({
      authorization: Joi.string().required().min(2).max(50),
    }).unknown(true),

    params: Joi.object().keys({
      userId: Joi.string().alphanum().required().length(24).hex(),
    }).unknown(true),
  });
};
