require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mogoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorCelebrate = require('celebrate').errors;
const routes = require('./routes/routes');
const { errorMiddlewares } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mogoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors({
  origin: ['https://oxsid.nomoredomains.rocks', 'https://api.oxsid.nomoredomains.rocks', 'https://localhost:3000'],
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errorLogger);
app.use(errorCelebrate());
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
