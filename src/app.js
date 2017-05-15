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
app.use('*',function(req,res) {
  res.status(404).json({
    message: 'route does not exist'
  });
});

if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message.split(',').join(', '),
        error: err.status
    });
  });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message.split(',').join(', '),
        error: err
    });
});

export default app;
