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
  });
});

router.get('/:id', function(req, res, next) {
  getSingle(req.params.id)
  .then((event) => {
    res.status(200).json({
      data: event
    });
  })
  .catch((error) => {
    error.status = 404;
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
    error.status = 404;
    next(error);
  });
});

router.delete('/:id', function(req, res, next) {
  destroy(req.params.id)
  .then(() => {
    res.status(200).json({
      success: true,
      message: 'event has been deleted'
    });
  })
  .catch((error) => {
    error.status = 404;
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
      error.status = 404;
      next(error);
    });
  }
);
export default router;
