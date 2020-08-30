const express = require('express');
const mongoose = require('mongoose');
const log = require('./loger');
const { port, host, mongoDB } = require('./config');

const Router = require('./router');

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${mongoDB.username}:${mongoDB.password}@${mongoDB.host}:${mongoDB.port}/${mongoDB.dbName}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', log.error.bind(console, 'connection error:'));
db.once('open', () => {
  log.info('DB connected');
});

const app = express();

app.use('/', Router);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  log.info(`App listening at ${host}:${port}`);
});
