require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mogoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorCelebrate = require('celebrate').errors;
const routes = require('./routes/routes');
const { errorMiddlewares } = require('./middlewares/errors');

const app = express();
const { PORT = 3109 } = process.env;
const corsOptions = {
  origin: ['https://oxsid.nomoredomains.rocks',
    'http://oxsid.nomoredomains.rocks',
    'https://api.oxsid.nomoredomains.rocks',
    'http://api.oxsid.nomoredomains.rocks',
    'https://oxsid.nomoredomains.rocks/signup',
    'https://localhost:3109',
    'http://localhost:3109',
  ],
  credentials: true,
};

mogoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(routes);
app.use(errorCelebrate());
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
