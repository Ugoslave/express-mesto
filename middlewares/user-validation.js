/* eslint-disable no-unused-vars */
const { celebrate, Joi } = require('celebrate');

module.exports.userValidation = (req, res) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(300),
      avatar: Joi.string().min(7),
      email: Joi.string().required().min(7),
      password: Joi.string().required().min(8),
    }).unknown(true),

    headers: Joi.object().keys({
      authorization: Joi.string().required().min(2).max(50),
    }).unknown(true),

    params: Joi.object().keys({
      userId: Joi.string().alphanum().min(2).max(50),
    }).unknown(true),
  });
};
