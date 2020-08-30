/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
const config = require('./config');
const {
  loglevel: {
    ERROR,
    WARN,
    INFO,
    DEBUG,
  },
} = require('./constants');

const dateStamp = () => { const date = new Date(); return date.toISOString(); };

const loger = {
  error: (msg) => { console.log('\x1b[31m%s\x1b[0m', `${dateStamp()} ${ERROR}:${msg}`); },
  warn: (msg) => {
    config.loglevel !== ERROR
      && console.log('\x1b[33m%s\x1b[0m', `${dateStamp()} ${WARN}:${msg}`);
  },
  info: (msg) => {
    (config.loglevel === INFO || config.loglevel === DEBUG)
      && console.log('\x1b[34m%s\x1b[0m', `${dateStamp()} ${INFO}:${msg}`);
  },
  debug: (msg) => {
    config.loglevel === DEBUG
      && console.log('\x1b[37m%s\x1b[0m', `${dateStamp()} ${DEBUG}:${msg}`);
  },
};

module.exports = loger;
