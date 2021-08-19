const jwt = require('jsonwebtoken');
const NotValidEmailError = require('../errors/not-valid-email-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.send(new NotValidEmailError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    res.send(new NotValidEmailError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
