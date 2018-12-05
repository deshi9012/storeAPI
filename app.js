import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRoutes from './api/routes/userRoutes';
import productRoutes from './api/routes/productRoutes';
import orderRoutes from './api/routes/orderRoutes';

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://' +
    process.env.MONGO_USER +
    ':' +
    process.env.MONGO_PASSWORD +
    '@ds119374.mlab.com:19374/store_api',
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);
const app = express();

app.use(morgan('dev'));
//Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS headers middleware
app.use((req, res, next) => {
  //from where we give access to our api
  res.header('Access-Control-Allow-Origin', '*');
  //which header methods are allowed
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,Authorization'
  );
  //First request that browser make to find out to which metdhods we fave access for
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
