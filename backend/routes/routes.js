const routes = require('express').Router();
const cors = require('cors');
const { login, createUser } = require('../controllers/users');
const { NotFoundErr } = require('../error/NotFoundError');
const auth = require('../middlewares/auth');
const { signinValifator, signupValidator } = require('../middlewares/userValidator');
const cardsRouter = require('./cards');
const userRouter = require('./users');
const { requestLogger, errorLogger } = require('../middlewares/logger');

routes.use(requestLogger);
routes.use(cors({ origin: ['https://oxsid.nomoredomains.rocks'] }));
routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
routes.post('/signin', signinValifator, login);
routes.post('/signup', signupValidator, createUser);
routes.use(auth);
routes.use(userRouter);
routes.use(cardsRouter);
routes.use('*', () => {
  throw new NotFoundErr('Page not found');
});
routes.use(errorLogger);

module.exports = routes;
