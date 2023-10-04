const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const router = require('./routes');

const { NODE_ENV, PORT = 3000, DB_CONNECTION_STRING } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errror-handler');
const limiter = require('./utils/limiter');

mongoose
  .connect(NODE_ENV === 'production' ? DB_CONNECTION_STRING : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to db');
  });

const app = express();

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
