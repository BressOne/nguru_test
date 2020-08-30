const Comment = require('./comment.schema');

module.exports = {
  create: (data) => Comment.create(data),
  countByFilter: (filter) => Comment.find(filter).countDocuments(),
  readManyByCursor: ({ filter, skip, limit }) => Comment.find(filter).skip(skip).limit(limit),
};
