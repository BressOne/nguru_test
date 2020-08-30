/* eslint-disable no-underscore-dangle */
const axios = require('axios');
const { mapMovieToDomain } = require('./movie.mapToDomain');
const { mergeOldAndNew } = require('./movie.merger');
const model = require('./movie.model');
const config = require('../config');

const create = async (req, res) => {
  if (!req.body || !req.body.Title) {
    res.status(400).json({ error: { message: 'Requered field \'Title\' was not represented' } });
    res.end();
    return;
  }
  const { data } = await axios.get(config.contentProvider.host, {
    params: {
      t: req.body.Title,
      apikey: config.contentProvider.apiKey,
    },
  });
  if (!data || data.Error === 'Movie not found!') {
    res.status(404).json({ error: { message: 'Requered movie not found' } });
    res.end();
    return;
  }
  if (!data || data.Response === 'False') {
    res.status(500).json({ error: { message: data.Error } });
    res.end();
    return;
  }

  const possibleExisting = await model.exists({ Title: req.body.Title });

  let preMap;
  if (possibleExisting) {
    const existing = await model.find({ Title: req.body.Title });
    preMap = mergeOldAndNew(existing._doc, req.body);
  }

  const mapedMoovieEntity = mapMovieToDomain(preMap);
  const movie = await model.create(mapedMoovieEntity);
  res.json(mergeOldAndNew(data, movie._doc));
};

const read = async (req, res) => {
  const { id, title } = req.query;
  const movie = await model.find({ $or: [{ id }, { Title: title }] });
  if (!movie || !movie._doc) {
    res.status(404).json({ error: { message: 'Requered movie not found' } });
    res.end();
    return;
  }
  const { data } = await axios.get(config.contentProvider.host, {
    params: {
      t: title,
      apikey: config.contentProvider.apiKey,
    },
  });
  // TODO: act if !data as it represents that movie is stale.
  res.json(mergeOldAndNew(data, movie._doc));
};

const readAllPaginated = async (req, res) => {
  const { page = 1 } = req.query;

  const span = (page - 1) * config.pagination.pageSize;
  const movies = await model.readManyByCursor({
    filter: {},
    skip: span,
    limit: config.pagination.pageSize,
  });
  const dataFromContentProvider = await Promise.all(
    movies
      .map((movie) => axios.get(config.contentProvider.host, {
        params: {
          t: movie._doc.Title,
          apikey: config.contentProvider.apiKey,
        },
      })),
  );
  const mergedMovies = movies
    .map((movie, i) => mergeOldAndNew(dataFromContentProvider[i].data, movie._doc));

  const totalUnits = await model.countByFilter();
  const pagination = {
    totalUnits,
    currentPage: page,
    totalPages: Math.ceil(totalUnits / page),
  };

  // TODO: act if !data as it represents that movie is stale.
  res.json({ data: mergedMovies, pagination });
};

module.exports = {
  create,
  read,
  readAllPaginated,
};
