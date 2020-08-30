const mongoose = require('mongoose');

const MoovieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  Title: {
    type: String,
  },
  Year: {
    type: String,
  },
  Rated: {
    type: String,
  },
  Released: {
    type: String,
  },
  Runtime: {
    type: String,
  },
  Genre: {
    type: String,
  },
  Director: {
    type: String,
  },
  Writer: {
    type: String,
  },
  Actors: {
    type: String,
  },
  Plot: {
    type: String,
  },
  Language: {
    type: String,
  },
  Country: {
    type: String,
  },
  Awards: {
    type: String,
  },
  Poster: {
    type: String,
  },
  Ratings: [
    {
      Source: {
        type: String,
      },
      Value: {
        type: String,
      },
    },
  ],
  Metascore: {
    type: String,
  },
  imdbRating: {
    type: String,
  },
  imdbVotes: {
    type: String,
  },
  imdbID: {
    type: String,
  },
  Type: {
    type: String,
  },
  DVD: {
    type: String,
  },
  BoxOffice: {
    type: String,
  },
  Production: {
    type: String,
  },
  Website: {
    type: String,
  },
});

module.exports = mongoose.model('movie', MoovieSchema);
