import { Router } from 'express';
import {
  verifyToken,
  allowedParams,
  requiredParams,
} from './helpers';
import {
  getAll,
  getSingle,
  create,
  destroy,
  edit,
} from '../models/events';

const router = Router();
const whitelist = ['title', 'description', 'datetime', 'location'];

router.use(verifyToken);

router.get('/', function(req, res, next) {
  getAll()
  .then((events) => {
    res.status(200).json({
      data: events
    });
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/:id', function(req, res, next) {
  getSingle(req.params.id)
  .then((event) => {
    if (event == 0) {
      const err = new Error('event was not found');
      err.status = 404;
      next(err);
    } else {
      res.status(200).json({
        data: event
      });
    }
  })
  .catch((error) => {
    next(error);
  });
});

router.put('/:id', allowedParams(whitelist), function(req, res, next) {
  edit(req.params.id, req.body)
  .then((event) => {
    res.status(200).json({
      data: event
    });
  })
  .catch((error) => {
    next(error);
  });
});

router.delete('/:id', function(req, res, next) {
  destroy(req.params.id)
  .then((event) => {
    if (event === 1) {
      res.status(200).json({
        success: true,
        message: 'event has been deleted'
      });
    } else {
      const err = new Error('event was not found');
      err.status = 404;
      next(err);
    }
  })
  .catch((error) => {
    next(error);
  });
});

router.post('/',
  allowedParams(whitelist),
  requiredParams(['title', 'description', 'datetime', 'location']),
  function(req, res, next) {
    create(req.body)
    .then((event) => {
      res.status(200).json({
        data: event
      });
    })
    .catch((error) => {
      next(error);
  });
});

export default router;
