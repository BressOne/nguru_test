const { loglevel } = require('./constants');

module.exports = {
  loglevel: process.env.LOGLEVEL || loglevel.DEBUG,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  mongoDB: {
    host: process.env.MONGO_HOST || 'ds333768.mlab.com',
    port: process.env.MONGO_PORT || 33768,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    dbName: process.env.MONGO_DB_NAME || 'nguru',
  },
  contentProvider: {
    apiKey: process.env.CONTENT_PROVIDER_APIKEY,
    host: process.env.CONTENT_PROVIDER_HOST || 'http://www.omdbapi.com/',
  },
  pagination: {
    pageSize: process.env.PAGINATION_PAGESIZE || 10,
  },
};
