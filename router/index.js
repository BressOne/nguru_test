const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const moviesController = require('../moovie/movie.controller');
const commentsController = require('../comment/comment.controller');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => { res.json({ message: 'NetGuru test task!' }); });

router.post('/movie', moviesController.create);

router.get('/movies', moviesController.read);

router.post('/comment', commentsController.create);

router.get('/comments', commentsController.readAllPaginated);

module.exports = router;
