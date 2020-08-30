const Moovie = require('./movie.schema');

module.exports = {
  create: (data) => Moovie.create(data),
  find: (filter) => Moovie.findOne(filter),
  exists: (filter) => Moovie.findOne(filter).countDocuments() > 0,
  countByFilter: (filter) => Moovie.find(filter).countDocuments(),
  readManyByCursor: ({ filter, skip, limit }) => Moovie.find(filter).skip(skip).limit(limit),
};
