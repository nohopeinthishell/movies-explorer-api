const httpConstants = require('http2').constants;
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const movieSchema = require('../models/movie');

const getMovies = (req, res, next) => {
  movieSchema
    .find({ owner: req.user._id })
    .then((cards) => res.status(httpConstants.HTTP_STATUS_OK).send(cards))
    .catch((err) => next(err));
};

const postMovie = (req, res, next) => {
  const id = req.user._id;
  const {
    country,
    director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  movieSchema
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: id,
    })
    .then((card) => res.status(httpConstants.HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  movieSchema
    .findById(req.params.movieId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(' Фильм с указанным _id не найдена.'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы не можете удалить чужой сохраненный фильм'));
      }
      return movieSchema.findByIdAndDelete(req.params.movieId)
        .then(() => res.status(httpConstants.HTTP_STATUS_OK).send({ message: 'Фильм удален' }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(err.message));
      }
      return next(err);
    });
};

module.exports = { getMovies, postMovie, deleteMovie };
