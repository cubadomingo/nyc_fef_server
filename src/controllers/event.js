import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
  getAll,
  getSingle,
  create,
  destroy,
  edit,
} from '../models/events';

const router = Router();

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: 'No token provided.' });
  }
});

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
    if (event.length > 0) {
      res.status(200).json({
        data: event
      });
    } else {
      res.status(404).json({
        message: 'The event was not found'
      });
    }
  })
  .catch((error) => {
    next(error);
  });
});

router.put('/:id', function(req, res, next) {
  const whitelist = ['title', 'description', 'datetime', 'location'];

  Object.keys(req.body).map((key) => {
    if (!whitelist.includes(key)) {
      return res.status(404).json({
        message: 'Invalid params'
      });
    }
  });

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
        message: 'The event has been deleted'
      });
    } else {
      res.status(404).json({
        message: 'The event was not found'
      });
    }
  })
  .catch((error) => {
    next(error);
  });
});

router.post('/', function(req, res, next) {
  const whitelist = ['title', 'description', 'datetime', 'location'];

  Object.keys(req.body).map((key) => {
    if (!whitelist.includes(key)) {
      return res.status(404).json({
        message: 'Invalid params'
      });
    }
  });

  if (!req.body.title) {
    return res.status(404).json({
      message: 'Title is required'
    });
  } else if (!req.body.description) {
    return res.status(404).json({
      message: 'Description is required'
    });
  } else if (!req.body.datetime) {
    return res.status(404).json({
      message: 'Datetime is required'
    });
  } else if (!req.body.location) {
    return res.status(404).json({
      message: 'Location is required'
    });
  }

  create(req.body)
  .then((event) => {
    res.status(200).json({
      data: event
    });
  });
});

export default router;
