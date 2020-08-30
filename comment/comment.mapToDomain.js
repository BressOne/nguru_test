const { v4: uuidv4 } = require('uuid');

module.exports = {
  mapCommentToDomain: (data) => ({
    id: data.id || uuidv4(),
    ...data,
  }),
};
