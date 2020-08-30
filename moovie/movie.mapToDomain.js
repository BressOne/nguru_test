const { v4: uuidv4 } = require('uuid');

module.exports = {
  mapMovieToDomain: (data) => ({
    id: data.id || uuidv4(),
    ...data,
  }),
};
