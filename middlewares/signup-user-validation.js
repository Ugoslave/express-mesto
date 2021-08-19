/* eslint-disable no-unused-vars */
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.signupUserValidation = (req, res) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().isEmail(),
      password: Joi.string().required().min(8),
      avatar: validator.isURL({require_protocol: true}),
    }).unknown(true),
  });
};
