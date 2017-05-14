import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import eventController from './controllers/event';
import userController from './controllers/user';
import authController from './controllers/auth';

dotenv.config();
const app = express();
const namespace = '/api/v1';

if (process.env.NODE_ENV !== 'test') { app.use(morgan('dev')); }
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: 'application/json'}));

app.use(`${namespace}/events`, eventController);
app.use(`${namespace}/users`, userController);
app.use(`${namespace}/authenticate`, authController);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message.split(',').join(', '),
  });
});

export default app;
