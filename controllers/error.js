const NotFoundError = require('../errors/not-found-err');

module.exports.sendError = (req, res) => {
  res.send(new NotFoundError('Запрашиваемый ресурс не найден'));
};
