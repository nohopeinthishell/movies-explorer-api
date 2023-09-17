const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movie');
const { loginValidation, registerValidation } = require('../validation/validation');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.post('/signin', loginValidation, login);
router.post('/signup', registerValidation, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
