const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const auth = require('./middlewares/auth');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
});

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(limiter);
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./routes/signin'));
app.use(require('./routes/signup'));

app.use(auth);
app.use(require('./routes/users'));
app.use(require('./routes/cards'));
app.use(require('./routes/error'));

app.listen(PORT);
