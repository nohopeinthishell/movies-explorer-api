const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movie');
const { movieIdValidation, createMovieValidation } = require('../validation/validation');

router.get('/', getMovies);
router.post('/', createMovieValidation, postMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
