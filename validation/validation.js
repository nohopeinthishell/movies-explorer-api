const { celebrate, Joi } = require('celebrate');

const REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~H?&/=]*)$/;

const userIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required().hex(),
  }),
});

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(2)
      .max(30),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),

  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(2)
      .max(30),
    password: Joi.string().required().min(2).max(30),
  }),
});

const profileUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2)
      .max(30),
    email: Joi.string().required().email().min(2)
      .max(30),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).required().hex(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(REGEX).required(),
    trailerLink: Joi.string().pattern(REGEX).required(),
    thumbnail: Joi.string().pattern(REGEX).required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  userIdValidation,
  registerValidation,
  loginValidation,
  profileUpdateValidation,
  movieIdValidation,
  createMovieValidation,
};
