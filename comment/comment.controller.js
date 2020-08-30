/* eslint-disable no-underscore-dangle */
const { mapCommentToDomain } = require('./comment.mapToDomain');
const model = require('./comment.model');
const movieModel = require('../moovie/movie.model');
const config = require('../config');

const create = async (req, res) => {
  const { text, reference } = req.query;
  if (!text || !reference) {
    res.status(400).json({ error: { message: 'Comment text and reference should be provided' } });
    res.end();
    return;
  }
  // allow reference to be id or title
  const movie = await movieModel.find({ $or: [{ id: reference }, { Title: reference }] });
  if (!movie || !movie._doc) {
    res.status(404).json({ error: { message: 'Referenced movie not found' } });
    res.end();
    return;
  }
  const comment = await model.create(mapCommentToDomain({ text, reference: movie._doc.id }));
  res.json(comment._doc);
};

const readAllPaginated = async (req, res) => {
  const { page = 1 } = req.query;

  const span = (page - 1) * config.pagination.pageSize;
  const comments = await model.readManyByCursor({
    filter: {},
    skip: span,
    limit: config.pagination.pageSize,
  });

  const totalUnits = await model.countByFilter();
  const pagination = {
    totalUnits,
    currentPage: page,
    totalPages: Math.ceil(totalUnits / page),
  };

  // TODO: act if !data as it represents that movie is stale.
  res.json({ data: comments.map((c) => c._doc), pagination });
};

module.exports = {
  create,
  readAllPaginated,
};
