import { Router } from 'express';
import {
  verifyToken,
  allowedParams,
  requiredParams,
} from './helpers';
import {
  getAll,
  getSingle,
  edit,
  create,
  destroy,
} from '../models/scholarships';

const router = Router();
const whitelist = ['title', 'description', 'deadline', 'eligibility'];

router.get('/', function(req, res, next) {
  getAll()
  .then((scholarships) => {
    res.status(200).json({ scholarships });
  });
});

router.get('/:id', function(req, res, next) {
  getSingle(req.params.id)
  .then((scholarship) => {
    res.status(200).json({ scholarship });
  })
  .catch((error) => {
    error.status = 404;
    next(error);
  });
});

router.use(verifyToken);

router.put('/:id', allowedParams(whitelist), function(req, res, next) {
  edit(req.params.id, req.body)
  .then((scholarship) => {
    res.status(200).json({ scholarship });
  })
  .catch((error) => {
    error.status = 404;
    next(error);
  });
});

router.post('/',
  allowedParams(whitelist),
  requiredParams(whitelist),
  function(req, res, next) {
    create(req.body)
    .then((scholarship) => {
      res.status(200).json({ scholarship });
    })
    .catch((error) => {
      error.status = 404;
      next(error);
    });
  }
);

router.delete('/:id', function(req, res, next) {
  destroy(req.params.id)
  .then(() => {
    res.status(200).json({
      success: true,
      message: 'scholarship has been deleted'
    });
  })
  .catch((error) => {
    error.status = 404;
    next(error);
  });
});

export default router;
