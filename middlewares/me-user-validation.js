/* eslint-disable no-unused-vars */
const { celebrate, Joi } = require('celebrate');

module.exports.meUserValidation = (req, res) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(50),
      about: Joi.string().required().min(2).max(100),
      email: Joi.string().required().min(7),
      password: Joi.string().required().min(8),
    }).unknown(true),

    headers: Joi.object().keys({
      authorization: Joi.string().required().min(2).max(50),
    }).unknown(true),

    params: Joi.object().keys({
      userId: Joi.string().alphanum().required().length(24).hex(),
    }).unknown(true),
  });
};
