import express from 'express';
import eventController from './controllers/event';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const namespace = '/api/v1';

if (process.env.NODE_ENV !== 'test') { app.use(morgan('dev')); }
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json'}));

app.use(`${namespace}/events`, eventController);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

export default app;
