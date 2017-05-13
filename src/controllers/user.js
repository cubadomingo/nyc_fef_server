import { Router } from 'express';
import {
  getAll,
  create,
  edit,
  destroy,
} from '../models/users';

const router = Router();

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

router.put('/:id', function(req, res, next) {
  const whitelist = ['username', 'password', 'password_confirmation', 'email'];

  Object.keys(req.body).map((key) => {
    if (!whitelist.includes(key)) {
      return res.status(404).json({
        message: 'Invalid params'
      });
    }
  });

  if (req.body.password !== req.body.password_confirmation) {
    return res.status(404).json({
      message: 'Password_confirmation does not match or is missing'
    });
  }

  if (req.body.password && !req.body.password_confirmation) {
    return res.status(404).json({
      message: 'Password_confirmation is needed'
    });
  }

  edit(req.params.id, req.body)
  .then((user) => {
    if (user.length > 0) {
      res.status(200).json({
        data: user
      });
    } else {
      res.status(404).json({
        message: 'User was not found'
      });
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
        message: 'User has been deleted'
      });
    } else {
      res.status(404).json({
        message: 'User could not be found'
      });
    }
  })
  .catch((error) => {
    next(error);
  });
});

router.post('/', function(req, res, next) {
  const whitelist = ['username', 'password', 'password_confirmation', 'email'];

  Object.keys(req.body).map((key) => {
    if (!whitelist.includes(key)) {
      return res.status(404).json({
        message: 'Invalid params'
      });
    }
  });

  if (!req.body.username) {
    return res.status(404).json({
      message: 'Username is required'
    });
  } else if (!req.body.password) {
    return res.status(404).json({
      message: 'Password is required'
    });
  } else if (!req.body.password_confirmation) {
    return res.status(404).json({
      message: 'Password_confirmation is required'
    });
  } else if (!req.body.email) {
    return res.status(404).json({
      message: 'Email is required'
    });
  }

  if (req.body.password !== req.body.password_confirmation) {
    return res.status(404).json({
      message: 'Password and password_confirmation do not match'
    });
  }

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
