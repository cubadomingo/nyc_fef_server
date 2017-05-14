import { Router } from 'express';
import {
  verifyToken,
  allowedParams,
  requiredParams,
  confirmPassword,
} from './helpers';
import {
  getAll,
  create,
  edit,
  destroy,
} from '../models/users';

const router = Router();
const whitelist = ['username', 'password', 'password_confirmation', 'email'];

router.use(verifyToken);

router.get('/', function(req, res, next) {
  getAll()
  .then((users) => {
    res.status(200).json({
      data: users
    });
  })
  .catch((error) => {
    next(error);
  });
});

router.put('/:id',
  allowedParams(whitelist),
  confirmPassword,
  function(req, res, next) {
    edit(req.params.id, req.body)
    .then((user) => {
      if (user.length > 0) {
        res.status(200).json({
          data: user
        });
      } else {
        const err = new Error('user was not found');
        err.status = 404;
        next(err);
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.delete('/:id', function(req, res, next) {
  destroy(req.params.id)
  .then((row) => {
    if (row > 0) {
      res.status(200).json({
        message: 'user has been deleted'
      });
    } else {
      const err = new Error('user was not found');
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
  requiredParams(['username','password','password_confirmation','email']),
  confirmPassword,
  function(req, res, next) {
    create(req.body)
    .then((user) => {
      res.status(200).json({
        data: user
      });
    })
    .catch((error) => {
      next(error);
    });
});

export default router;
